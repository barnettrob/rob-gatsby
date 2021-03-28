import React from "react";
import { Modal } from 'react-bootstrap';
import { GatsbyImage, getImage } from "gatsby-plugin-image";

class FamilyMemberModal extends React.Component {
  render() {
    const member = this.props;
    //console.log('member', member)
    return (
        <Modal
          {...member}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            {member.details.title}
          </Modal.Header>
          <Modal.Body>
            <div className="picture">
              {member.details !== ""
                ?
                <GatsbyImage image={getImage(member.details.relationships.field_member_picture.localFile)} alt={member.details.title} />
                :
                ''}
            </div>
            <div className="about">
              {member.details.drupal_id}
            </div>
          </Modal.Body>
        </Modal>
    )
  }
}

export default FamilyMemberModal