import { Card, Button, Row, Col } from "react-bootstrap";

function AwardCard({award, setIsEditing, isEditable}) {
    // 삭제 기능은 추후 추가하기!
    // whenDate를 다른 형태로 바꿔야 하나...?
    return (
        <Card.Text>
          <Row className="alert-items-center">
            <Col>
              <span>{award.title}</span>
              <br />
              <span className="text-muted">{award.description} ( {award.whenDate} )</span>
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
                </Button>{' '}
            
              </Col>
            )}
          </Row>
        </Card.Text>
      );
    
};

export default AwardCard;