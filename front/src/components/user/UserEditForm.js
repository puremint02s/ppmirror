import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  //useState로 imageUploaded 상태를 생성함.
  const [imageUploaded, setImageUploaded] = useState(user.imageUploaded);
  //false로 defaultImage 상태를 생성함.
  const [defaultImage, setDefaultImage] = useState(false);

  const upload = async (e) => {
      const formData = new FormData();
      // alert(e.target.files[0]);
      formData.append('file', e.target.files[0]);
      const res = await Api.upload('user/upload', `${user.id}`, formData);

    const imageUpload = await res;
      setImageUploaded(imageUpload);
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
        <Row className="justify-content-md-center">
          { imageUploaded ?
            <Card.Img
              style={{ width: "10rem", height: "8rem" }}
              className="mb-3"
              src={`http://localhost:5001/image/${user.id}`}
              alt="나만의 프로필"
            />
            :
            <Card.Img
              style={{ width: "10rem", height: "8rem" }}
              className="mb-3"
              src="http://placekitten.com/200/200"
              alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
            />
          }
        </Row>
        <Form.Group controlId="formFile" className="mb-1" encType='multipart/form-data' >
          <Form.Label>프로필 이미지</Form.Label>
          <Form.Control type="file" onChange={(e) => upload(e)}/>
        </Form.Group>
        <Form.Group controlId="formCheckbox"  className="mb-3" >
          <Form.Check onChange={(e)=> {setDefaultImage(!!e.target.value); setImageUploaded(false);}}
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

export default UserEditForm;
