import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function CertificateEditForm({ currentCertificate, getCertificates,setIsEditing }) {
  const [form, setForm] = useState({
    title: currentCertificate.title,
    description: currentCertificate.description,
    certificateId:currentCertificate.certificateId
  });
  const [AcquiredAt, setAcquiredAt] = useState(new Date(currentCertificate.acquiredAt));

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
   
    const acquiredAt = AcquiredAt.toISOString().split("T")[0];
    


    try {
      const id = currentCertificate.certificateId;

     await Api.put(`certificates/${id}`, {
      ...form,
      acquiredAt

    })

    
    const cert = {
      certificateId: id,
      ...form,
      acquiredAt
    };

    await getCertificates((prev) =>
    prev.map((el) => (el.certificateId === cert.certificateId ? cert : el))
  );

    setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit} key={currentCertificate.certificateId}>
          <Form.Group controlId="certificateEditTitle" className="mb-3">
            <Form.Control
              type="text"
              placeholder="자격증 제목"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="certificateEditDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="상세내용"
              name="description"
              value={form.description}
              onChange={handleChange}
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
