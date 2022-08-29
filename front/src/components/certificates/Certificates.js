import React, { useState, useEffect } from "react";

import CertificateAddForm from "./CertificateAddForm";
import Certificate from "./Certificate";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

function Certificates({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [Certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("certificates", portfolioOwnerId).then((res) =>
      setCertificates(res.data)
    );
  }, [portfolioOwnerId]);

  const getCertificates = (data) => {
    setCertificates(data);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        {Certificates.map((certificate) => (
          <Certificate
            key={certificate.certificateId}
            certificate={certificate}
            getCertificates={getCertificates}
            isEditable={isEditable}
          />
        ))}

        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}

        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            getCertificates={getCertificates}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
