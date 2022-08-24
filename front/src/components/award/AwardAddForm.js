import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ portfolioOwnerId, setAward, setIsAdding }) {

    // 수상 내역
    const [ title, setTitle] = useState("");
    const [ description, setDescription ] = useState("");
    const [ whenDate, setWhenDate ] = useState("");

    async function handleSubmit (e) {
        e.preventDefault();

    const Id = portfolioOwnerId;

    // 수상내역 추가해서 보내기 --- 확인버튼을 누르면 여기서 오류!!! POST 오류  createError???? 백엔드가 없어서 그런가?????
    await Api.post("award/create", {
      Id,
      title,
      description,
      whenDate,
    });

    // 추가한 후 수상내역 새로 받아오기
    const res = await Api.get("educationlist", Id);
    setAward(res.data);
    setIsAdding(false);
  }

  return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAward">
          <Form.Control
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAward"  className="mt-3">
          <Form.Control
            type="text"
            placeholder="설명"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAward"  className="mt-3">
          <Form.Control
            type="text"
            placeholder="날짜"
            value={whenDate}
            onChange={(e)=>setWhenDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Row} className="mt-3 mb-3 text-center">
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
  )

}

export default AwardAddForm;
