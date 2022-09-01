import React, { useState, useRef } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import styled from "styled-components";
import Tags from "@yaireo/tagify/dist/react.tagify";

// import "../../css/style.css";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  const [hash, setHashtag] = useState("");
  const [hashtag, sethashArr] = useState(user.hashtag ? user.hashtag : []);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      e.preventDefault();
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...hashtag];
    updatedTagList.push(hash);
    sethashArr(updatedTagList);
    setHashtag("");
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = hashtag.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    sethashArr(filteredTagList);
  };

  const removeTag = (i) => {
    const newTags = [...hash];
    newTags.splice(i, 1);
    setHashtag(newTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
      hashtag,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditTag" className="input-tag__tags">
            {hashtag?.map((tagItem, index) => {
              return (
                <TagItem key={index}>
                  <Text>{tagItem}</Text>
                  <Button onClick={deleteTagItem}>X</Button>
                </TagItem>
              );
            })}
            <Form.Control
              type="text"
              placeholder="해시태그를 넣어주세요"
              tabIndex={2}
              onChange={(e) => setHashtag(e.target.value)}
              value={hash}
              onKeyPress={onKeyPress}
            />
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

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: tomato;
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const Text = styled.span``;
export default UserEditForm;
