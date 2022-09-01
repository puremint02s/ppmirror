import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import { useState } from "react";

function UserCard({ user, setIsEditing, isEditable, isNetwork,setUser }) {
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // const res = await Api.get(`userlist/${user.hashtag}`);
   

    // Api.get("users/maxlike").then((res) => setLikeuser(res.data));
    // const updatedUser = res.data;
    // setUser(updatedUser);
    navigate(`/userlist/${e.target.value}`)

 
  };

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src="http://placekitten.com/200/200"
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        
        {user?.hashtag?.map((tagItem, index) => {
          return (
           <Button onClick={(e) => handleSubmit} value={tagItem}>
              {tagItem}
              </Button>
          )
        })}

    	
    
        
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
      </Card.Body>
    </Card>
  );
}

export default UserCard;
