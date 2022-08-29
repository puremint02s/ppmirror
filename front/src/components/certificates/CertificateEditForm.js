import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function CertificateEditForm({ currentCertificate, getCertificates,setIsEditing }) {
  //useState로 name 상태를 생성함.
  const [ title, setTitle] = useState(currentCertificate.title);
//useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentCertificate.description);
  const [AcquiredAt, setAcquiredAt] = useState(new Date(currentCertificate.acquiredAt));
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const userId = currentCertificate.userId;
    const acquiredAt = AcquiredAt.toISOString().split("T")[0];
    const certificateId=currentCertificate.certificateId
    // "users/유저id" 엔드포인트로 PUT 요청함.
    // await Api.put(`certificates/${currentCertificate.certificateId}`, {
    //   certificateId,
    //   title,
    //   description,
    //   acquiredAt,
    // });
    // // 유저 정보는 response의 data임.d
    // const res = await Api.get("certificates", userId);
    // setCertificates(res.data);
    // setIsEditing(false);

    try {
     await Api.put(`certificates/${currentCertificate.certificateId}`, {
      certificateId,
      title,
      description,
      acquiredAt,
    })
      const res = await Api.get("certificates", userId);
    getCertificates(res.data);
    setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="certificateEditTitle" className="mb-3">
            <Form.Control
              type="text"
              placeholder="자격증 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="certificateEditDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="상세내용"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={AcquiredAt}
            onChange={(date) => setAcquiredAt(date)}
          
          />
        </Col>
      </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
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
      </Card.Body>
    </Card>
  );
}

export default CertificateEditForm
