import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function openInNewTab(documentId) {
  const url = `https://docs.google.com/document/d/${documentId}/edit`;
  const win = window.open(url, '_blank');
  win.focus();
}

const PersonBiography = ({ biography }) => {
  const { documentId, documentMeta } = biography;

  return (
    <Card className="mb-4">
      <Card.Header>
        Biography
      </Card.Header>

      <Row noGutters>
        <Col md="7" className="border-right">
          <Card.Body style={{height: '276px'}}>
            <ul>
              <li>Last modified by: {documentMeta.lastModifyingUser}</li>
              <li>Last modified time: {documentMeta.modifiedTime}</li>
              <li>Permissions:
                <ul>
                  {documentMeta.permissions.map(item => (
                    <>
                      <li>name: {item.displayName}</li>
                      <li>role: {item.role}</li>
                    </>
                  ))}
                </ul>
              </li>
            </ul>
          </Card.Body>
        </Col>

        <Col className="d-flex justify-content-center align-items-center">
          <Button 
            variant="primary"
            onClick={() => openInNewTab(documentId)}
          >Edit Biography</Button>
        </Col>
      </Row>
    </Card>
  )
}

export default PersonBiography;
