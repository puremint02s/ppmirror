import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
function CertificateCard({ certificate, setIsEditing,isEditable }) {
const t=new Date(certificate.acquiredAt)
const time_text=t.toISOString().split("T")[0]


  return (
   
        <Card.Text>
    <Row className="alert-items-center">
          <Col>
          <span>{certificate.title}</span>
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{time_text}</span>
        </Col>

{isEditable && (
       
           
              <Col xs lg="2">
                
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
             
            
          
        )}
  </Row>
      </Card.Text>
    
  );
}

export default CertificateCard;
