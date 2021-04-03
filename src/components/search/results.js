import React from "react";
import { Link } from "gatsby";
import { Highlight } from 'react-instantsearch-dom';
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Result = ({ hit }) => {
  return (
    <article className="border-top pt-2 pb-4">
      <Link
        to={hit.path.alias}
      >
        <Highlight hit={hit} attribute="title" tagName="mark" />
      </Link>
      <div className="picture">
        {
          hit.relationships.field_member_picture !== null && 
          hit.relationships.field_member_picture.localFile !== null &&
          <GatsbyImage image={getImage(hit.relationships.field_member_picture.localFile)} alt={hit.title} />
        }
      </div>
      {hit.relationships.field_descendent_parent !== null && hit.relationships.field_descendent_parent.title !== null &&
        <div className="mb-1 text-muted small">
          Parent: <Highlight hit={hit} attribute="relationships.field_descendent_parent.title" tagName="mark" />
        </div>}
      {hit.relationships.field_original_descendent !== null &&
        <div className="font-italic font-weight-light small text-muted">
          Original Descendent: <Highlight hit={hit} attribute="relationships.field_original_descendent.title" tagName="mark" />
        </div>}        
    </article>
  );
}

export default Result;