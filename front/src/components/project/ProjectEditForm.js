import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

const ProjectEditForm = ({ currentProject, setProjects, setIsEditing }) => {
  // title, description => form state로 묶기
  const [form, setForm] = useState({
    title: currentProject.title,
    description: currentProject.description,
  });

  const [startDate, setStartDate] = useState(
    new Date(currentProject.startDate)
  );

  const [endDate, setEndDate] = useState(new Date(currentProject.endDate));

  const handleChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = currentProject.userId;
    // try ~ catch문
    try {
      await Api.put(`projects/${currentProject.projectId}`, {
        ...form,
        startDate,
        endDate,
      });

      const res = await Api.get("projects", userId);
      setProjects(res.data);

      setIsEditing(false);
    } catch (err) {
      console.log("편집이 정상적으로 이루어지지 않았습니다.", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formProjectTitle">
        <Form.Control
          type="text"
          name="title"
          placeholder="프로젝트 제목"
          value={form.title}
          onChange={handleChangeInput}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProjectDescription">
        <Form.Control
          type="text"
          name="description"
          placeholder="상세내역"
          value={form.description}
          onChange={handleChangeInput}
        />
      </Form.Group>

      <Row className="mt-3 mb-3">
        <Form.Group sm="auto" as={Col} className="me-3">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            value={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </Form.Group>
        <Form.Group sm="auto" as={Col}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            value={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            // mindate로 시작날짜보다 이전으로 설정 안 되게
            minDate={startDate}
          />
        </Form.Group>
      </Row>

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
};

export default ProjectEditForm;
