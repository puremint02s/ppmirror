import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setAward, setIsEditing }) {
  // 수상 & 내용
  const [form, setForm] = useState({
    title: currentAward.title,
    description: currentAward.description,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // 현재 수상내역에서 userId로 찾기
    const Id = currentAward["userId"];

    //try~catch
    try {
      // 수정해서 보내기
      await Api.put(`awards/${currentAward.awardId}`, {
        ...form,
      });

      // 수정한거 다시 받아오기 ---- get 어떻게 안써?????
      const res = await Api.get(`awards`, Id);

      setAward(res.data);
      setIsEditing(false);
    } catch (e) {
      console.log("수정 실패", e);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formAward">
        <Form.Control
          type="text"
          placeholder="제목"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formAward" className="mt-3">
        <Form.Control
          type="text"
          placeholder="설명"
          name="description"
          value={form.description}
          onChange={handleChange}
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
