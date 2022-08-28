import React, { useEffect, useState } from "react";
import {Card, Col, Row, Button} from "react-bootstrap";
import * as Api from "../../api"
import Education from './Education'
import EducationAddForm from "./EducationAddForm";

function Educations({ portfolioOwnerId, isEditable }) {
  const [ educations, setEducations ] = useState([]);
  const [ isAdding, setIsAdding ] = useState(false);

  useEffect(() => {
    Api.get('educations', portfolioOwnerId ).then((res) => {
        if (Array.isArray(res.data)) {setEducations(res.data)}});
  }, [portfolioOwnerId])

  const getEducations = data => {
    setEducations(data);
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {educations.map((education) => (
           <Education
             key={education.eduId}
             education={education}
             getEducations={getEducations}
             isEditable={isEditable}
           />
        ))}
        {isEditable && (
         <Row className="mt-3 text-center mb-4">
           <Col sm={{ span: 20 }}>
             <Button onClick={() => setIsAdding(true)}>+</Button>
           </Col>
         </Row>
        )}
        {isAdding && (
         <EducationAddForm
           portfolioOwnerId={portfolioOwnerId}
           getEducations={getEducations}
           setIsAdding={setIsAdding}
         />
        )}
      </Card.Body>
    </Card>
  );
}

export default Educations;