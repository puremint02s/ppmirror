import React, {useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({user, setIsEditing, setUser}) {
  //useState로 각 필드의 상태를 생성함.
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [imageUploaded, setImageUploaded] = useState(user.imageUploaded);
  const [defaultImage, setDefaultImage] = useState(false);

  const upload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const res = await Api.upload('user/upload', `${user.id}`, formData);
    const imageUpload = await res;

    await setImageUploaded(imageUpload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
      imageUploaded,
      defaultImage,
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
        <Form.Group controlId="formFile" className="mb-1" encType='multipart/form-data'>
          <Form.Label>프로필 이미지</Form.Label>
          <Form.Control type="file" onChange={(e) => upload(e)}/>
        </Form.Group>
        <Form.Group controlId="formCheckbox" className="mb-3">
          <Form.Check onChange={(e) => {
            setDefaultImage(!!e.target.value);
            setImageUploaded(false);
          }}
                      type='checkbox'
                      id={'default-checkbox'}
                      label={'기본 프로필 이미지로 전환'}
          />
        </Form.Group>
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

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{span: 20}}>
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

export default UserEditForm;
