import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function AwardCard({ award, setAward, setIsEditing, isEditable }) {
  // 삭제 기능은 추후 추가하기! - delete에 뭐가 들어가야하지?

  async function handleDelete() {
    await Api.delete("awards", award.awardId);

    const res = await Api.get("awards", award["userId"]);
    setAward(res.data);
  }
  return (
    <Card.Text>
      <Row className="alert-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
          <br />
        </Col>
        {isEditable && (
          <Col xs lg="2">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              Edit
            </Button>{" "}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
