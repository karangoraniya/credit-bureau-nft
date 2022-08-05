import { useEffect, useState } from "react";
import { Text, Row, Col, Grid, Card, Input, Loading } from "@nextui-org/react";
import { ethers } from "ethers";
import CreditCertificate from "../artifacts/contracts/CreditCerificate.sol/CreditCertificate.json";

export const VerifyCertificate = () => {
  return (
    <>
      <Row justify="center" align="center" css={{ m: "40px 0 0 0"}}>
        <Col span={6}>
          <Card css={{ p: "$6", mw: "400px" }}>
            <Card.Header>
              <Grid.Container css={{  }}>
                <Grid xs={12}>
                  <Text h4 css={{ lineHeight: "$xs" }}>
                    Credit Bureau Certificate
                  </Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: "$2" }}>
              <Text>
                Make beautiful websites regardless of your design experience.
              </Text>
            </Card.Body>
            <Card.Footer>Visit source code on GitHub.</Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};
