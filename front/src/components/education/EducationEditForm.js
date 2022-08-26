import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({ key, currentEducation, setEducations, setIsEditing }) {

  const [ school, setSchool] = useState(currentEducation.school);
  const [ major, setMajor ] = useState(currentEducation.major);
  const [ position, setPosition ] = useState(currentEducation.position);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userId = currentEducation['userId'];

    await Api.put(`educations/${currentEducation.eduId}`, {
      school,
      major,
      position,
    });

    const res = await Api.get("educations", userId);
    setEducations(res.data);
    setIsEditing(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSchool">
        <Form.Control
          type="text"
          placeholder="학교"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicSchool"  className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e)=>setMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicStatus" key={key}  className="mb-3 mt-3 text-center">
        <Form.Check
          inline
          label="재학중"
          name="status"
          type="radio"
          id={`radio-${key}-1`}
          value="재학중"
          checked={position === "재학중"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="학사졸업"
          name="status"
          type="radio"
          id={`radio-${key}-2`}
          value="학사졸업"
          checked={position === "학사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="석사졸업"
          name="status"
          type="radio"
          id={`radio-${key}-3`}
          value="석사졸업"
          checked={position === "석사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="박사졸업"
          name="status"
          type="radio"
          id={`radio-${key}-4`}
          value="박사졸업"
          checked={position === "박사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 mb-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;