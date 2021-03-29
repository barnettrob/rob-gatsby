import React from "react";
import { Modal } from 'react-bootstrap';
import { GatsbyImage, getImage } from "gatsby-plugin-image";

class FamilyMemberModal extends React.Component {
  render() {
    const member = this.props;

    return (
        <Modal
          {...member}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <h4>{member.details.title}</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="picture">
              {member.details !== ""
                ?
                member.details.relationships.field_member_picture !== null &&
                member.details.relationships.field_member_picture.localFile !== null &&
                <GatsbyImage image={getImage(member.details.relationships.field_member_picture.localFile)} alt={member.details.title} />
                :
                ''}
            </div>
            {member.details !== "" && 
              member.details.body !== null &&
              <div className="mt-3">
                <div className="font-weight-bold">About:</div>
                  
                  <div dangerouslySetInnerHTML={{ __html: member.details.body.processed}} />
              </div>}
            {member.details.field_partner !== null
              &&
              <div className="mt-4">
                <div className="font-weight-bold mr-2">Partner:</div>
                {member.details.field_partner}
              </div>}
              <div className="d-flex justify-content-between">
                {member.details !== "" && member.details.field_born !== null
                  &&
                  <div className="mt-3">
                    <div className="font-weight-bold mr-2">Born:</div>
                    {member.details.field_born.locality !== null && 
                      <span className="mr-2">{member.details.field_born.locality},</span>}
                    {member.details.field_born.administrative_area !== null && 
                      <span className="mr-2">{member.details.field_born.administrative_area},</span>}
                    {member.details.field_born.country_code !== null && 
                      <span className="mr-2">{member.details.field_born.country_code}</span>}
                  </div>}  
                  {member.details !== "" && member.details.field_current_address !== null
                  &&
                  <div className="mt-3">
                    <div className="font-weight-bold mr-2">Current Address:</div>
                    {member.details.field_current_address.locality !== null && 
                      <span className="mr-2">{member.details.field_current_address.locality},</span>}
                    {member.details.field_current_address.administrative_area !== null && 
                      <span className="mr-2">{member.details.field_current_address.administrative_area}</span>}
                    {member.details.field_current_address.country_code !== null && 
                      <span className="mr-2">{member.details.field_current_address.country_code}</span>}
                  </div>}                    
              </div>
          </Modal.Body>
        </Modal>
    )
  }
}

export default FamilyMemberModal