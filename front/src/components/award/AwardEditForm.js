import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setAward, setIsEditing }) {
  // 수상 & 내용
  const [title, setTitle] = useState(currentAward.title);
  const [description, setDescription] = useState(currentAward.description);

  async function handleSubmit(e) {
    e.preventDefault();

    // 현재 수상내역에서 userid로 찾기 - 백엔드에 award 보고 확인하기......? 맞나?????
    const Id = currentAward["userId"];

    // 수정해서 보내기
    await Api.put(`awards/${currentAward.awardId}`, {
      title,
      description,
    });

    // 수정한거 다시 받아오기
    const res = await Api.get("awards", Id);
    setAward(res.data);
    setIsEditing(false);
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

      <Form.Group controlId="formAward" className="mt-3">
        <Form.Control
          type="text"
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default AwardEditForm;
