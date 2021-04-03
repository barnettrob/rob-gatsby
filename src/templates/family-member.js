import React from 'react';
import { graphql, Link } from 'gatsby';
import { isAuthenticated, login } from "../utils/auth";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { CountryCodes } from "../utilities";

const FamilyMemberTemplate = ({ data }) => {
  if (!isAuthenticated()) {
    login()
    return <div className="container mt-5">Redirecting to login...</div>
  }

  let currentCountry = '';
  if (data.family.field_current_address !== null && 
      data.family.field_current_address.country_code !== null && 
        data.family.field_current_address.country_code !== '') {
          const countryCode = data.family.field_current_address.country_code;
          currentCountry = CountryCodes[countryCode];
  }

  let currentBornCountry = '';
  if (data.family.field_born !== null && 
      data.family.field_born.country_code !== null && 
        data.family.field_born.country_code !== '') {
          const countryBornCode = data.family.field_born.country_code;
          currentBornCountry = CountryCodes[countryBornCode];
  }

  return (
    <Layout>
      <h1 className="container mt-5">
        {data.family.title}
      </h1>
      <div className="container">
        {data.family.relationships.field_member_picture !== null &&
          data.family.relationships.field_member_picture.localFile !== null &&
        <GatsbyImage image={getImage(data.family.relationships.field_member_picture.localFile)} alt={data.family.title} />}
                {data.family.body !== null &&
        <div className="mt-2 mb-2">
          <div className="font-weight-bold">About:</div>
          <div dangerouslySetInnerHTML={{ __html: data.family.body.processed}} />
        </div>}
        {data.family.relationships.field_descendent_parent !== null && data.family.relationships.field_descendent_parent.title !== null &&
          <div className="mt-2 mb-2">
            <div className="font-weight-bold">Parent:</div>
            <Link
              to={data.family.relationships.field_descendent_parent.path.alias}
            >
              {data.family.relationships.field_descendent_parent.title} 
            </Link> 
          </div>}
          {data.family.field_partner !== null
            &&
            <div className="mt-2 mb-2">
              <div className="font-weight-bold mr-2">Partner:</div>
              {data.family.field_partner}
            </div>}
          <div className="place">
            {data.family !== "" && data.family.field_born !== null
              &&
              <div className="mt-3 flex-grow-2">
                <div className="font-weight-bold mr-2">Born:</div>
                {data.family.field_born.locality !== null && 
                  <span className="mr-2">{data.family.field_born.locality},</span>}
                {data.family.field_born.administrative_area !== null && 
                  <span className="mr-2">{data.family.field_born.administrative_area},</span>}
                {currentBornCountry !== '' && 
                  <span className="mr-2">{currentBornCountry}</span>}
              </div>}  
              {data.family !== "" && data.family.field_current_address !== null
              &&
              <div className="mt-3">
                <div className="font-weight-bold mr-2">Current Address:</div>
                {data.family.field_current_address.locality !== null && 
                  data.family.field_current_address.locality !== '' &&
                  <span className="mr-2">{data.family.field_current_address.locality},</span>}
                {data.family.field_current_address.administrative_area !== null && 
                  data.family.field_current_address.administrative_area !== '' &&
                  <span className="mr-2">{data.family.field_current_address.administrative_area},</span>}
                {currentCountry !== '' &&
                  <span className="mr-2">{currentCountry}</span>}
              </div>}                    
          </div>
      </div>
      
    </Layout>
  )
};

export const query = graphql`
  query ($alias: String!) {
    family: nodeFamilyMember(path: {alias: {eq: $alias}}, status: {eq: true}) {
      title
      body {
        processed
      }
      path {
        alias
      }
      id
      relationships {
        field_member_picture {
          localFile {
            childImageSharp {
              gatsbyImageData(
                height: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        field_descendent_parent {
          title
          path {
            alias
          }
        }
      }
      field_partner
      field_phone_number
      body {
        processed
      }
      field_born {
        administrative_area
        country_code
        locality
      }
      field_current_address {
        address_line1
        address_line2
        administrative_area
        country_code
        postal_code
        locality
      }
    }
  }
`;

export default FamilyMemberTemplate;