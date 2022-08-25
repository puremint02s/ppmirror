import React from 'react';
import { Card, Row, Button, Col } from "react-bootstrap";
import * as dateFns from "date-fns";

const ProjectCard = ({setIsEditing, isEditable, project}) => {

  const date = `${dateFns.format(project.startDate, "yyyy-MM-dd")} ~ ${dateFns.format(project.endDate, "yyyy-MM-dd")}`

  return (
    <Card.Text>
      <Row className="alert-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          {/* <span className="text-muted">{project.date}</span> */}
          <span className="text-muted">{date}</span>
        </Col>
        {isEditable && (
          <Col xs lg="2">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
            >편집</Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  )
}

export default ProjectCard;