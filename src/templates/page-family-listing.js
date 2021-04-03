import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, RefinementList, Pagination } from 'react-instantsearch-dom';
import Results from "../components/search/results";
import React from 'react';
import Layout from "../components/layout";

const FamilyListingTemplate = () => {
  const appId = process.env.GATSBY_ALGOLIA_APP_ID;
  const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;
  const searchClient = algoliasearch(appId, searchKey);
  return (
    <Layout>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
      >
        <div className="container d-flex mt-5">
          <div className="col-md-3 text-sm-left">
            <SearchBox 
              translations={{
                placeholder: 'Search family',
              }}
            />
            <h6 className="mt-5">Filter By</h6>
            <div className="mt-2 mb-2 text-muted">
              Descended from
            </div>
            <RefinementList
              attribute="relationships.field_original_descendent.title"
            />
            <div className="mt-2 mb-2 text-muted">
              Country living in
            </div>
            <RefinementList 
              attribute="field_current_address.country_code"
              transformItems={items =>
                items.map(function(item) {
                  const label = item.label;
                  switch(item.label) {
                    case 'IL':
                      item.label = 'Israel';
                    break;
                    case 'MX':
                      item.label = 'Mexico';
                    break;
                    case 'PA':
                      item.label = 'Panama';
                    break;
                    case 'US':
                      item.label = 'United States';
                    break;
                    default:
                      item.label = label;
                  }
                  return item
                })
                // items.map(item => ({
                //   ...item,
                //   label: item.label.toUpperCase(),
                // }))
              }
            />
          </div>
          <div className="col-md-9 pr-lg-5">
            <h6 className="ml-4">Family Members</h6>
            <Hits hitComponent={Results} />
            <Pagination />
          </div>
        </div>
      </InstantSearch>
    </Layout>
  )
};


export default FamilyListingTemplate;