import React from 'react';
import { Card, Row, Button, Col } from "react-bootstrap";
import * as dateFns from "date-fns";

const ProjectCard = ({setIsEditing, isEditable, project}) => {

  return (
    <Card.Text>
      <Row className="alert-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">{dateFns.format(new Date(project.startDate), "yyyy-MM-dd")} ~ {dateFns.format(new Date(project.endDate), "yyyy-MM-dd")}</span>
        </Col>
        {isEditable && (
          <>
            <Col xs lg="2">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
              >편집</Button>
            </Col>
          </>
        )}
      </Row>
    </Card.Text>
  )
}

export default ProjectCard;