import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationCard({ education, isEditable, getEducations, setIsEditing}) {

  const handleDelete = async () => {
    try {
      await Api.delete('educations', education.eduId);
      const res = await Api.get("educations", education['userId']);
      getEducations(res.data);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Card.Text key={education.eduId}>
      <Row className="alert-items-center">
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{education.major} ( {education.position} )</span>
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
  )
}

export default EducationCard;