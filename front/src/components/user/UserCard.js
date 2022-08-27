import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api"

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [ like, setLike ] = useState(false);
  const [ likeCount, setLikeCount ] = useState(user?.likeCount);

  useEffect(async () => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    // useState 훅을 통해 users 상태를 생성함.
    if (!userState.user) {
      navigate("/login");
      return;
    }

    if (user?.like.length > 0) {
      setLike(true);
    }
  },[])

  const handleLike = async (e) => {
    e.preventDefault();

    let res;
    if (!like) {
      res = await Api.post('like', {
        userId : user.id
      });
      await setLike(true);
    } else {
      res = await Api.delete('unlike', user.id);
      await setLike(false);
    }
    const updatedUser = await res.data;
    await setLikeCount(updatedUser.likeCount);
    // console.log('updatedUser : ', updatedUser)
  };

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          { user?.imageUploaded ?
            <Card.Img
              style={{ width: "10rem", height: "8rem" }}
              className="mb-3"
              src={`${Api.serverUrl}image/${user.id}`}
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
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
        {isNetwork && (user?.id !== userState.user.id) &&
          <Card.Link
            className="mt-3"
            href="#"
            onClick={(e) => {handleLike(e)}}
          >
          {like ? "❤" : "🤍"} {likeCount}
          </Card.Link>}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
