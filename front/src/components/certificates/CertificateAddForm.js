import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateAddForm({ portfolioOwnerId, setIsAdding, getCertificates }) {
  //useState로 name 상태를 생성함.
  const [ title, setTitle] = useState("");
//useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");
  const [AcquiredAt, setAcquiredAt] = useState(new Date());
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const userId = portfolioOwnerId;
    const acquiredAt = AcquiredAt.toISOString().split("T")[0];
    // "users/유저id" 엔드포인트로 PUT 요청함.

    await Api.post("certificate/create", {
      
      title,
      description,
      acquiredAt
     
    });
    const res = await Api.get("certificates", userId);
    // 유저 정보는 response의 data임.
    getCertificates(res.data);
    setIsAdding(false);
  };
  
  
  return (
  
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle" className="mb-3">
            <Form.Control
              type="text"
              placeholder="자격증 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDescription" className="mb-3">
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
              <Button variant="secondary" onClick={() => setIsAdding(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      
  );
}

export default CertificateAddForm;
