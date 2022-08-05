import { useEffect, useState } from "react";
import {
  Text,
  Row,
  Col,
  Grid,
  Card,
  Input,
  Loading,
  Image,
  Button,
} from "@nextui-org/react";
import { ethers } from "ethers";
import CreditCertificate from "../artifacts/contracts/CreditCertificate.sol/CreditCertificate.json";

export const VerifyCertificate = () => {
  const [loading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [nftData, setNFTData] = useState([]);

  const verifyNft = async () => {
    setIsLoading(true);
    if (!address) {
      setIsLoading(false);
      alert("Please fill all the input values");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT, CreditCertificate.abi, provider);
    
    try {
      let data = await contract.getLockData(address);
      setNFTData(data)
     
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
    console.log(nftData)
  };

  return (
    <>
      <Row css={{ mt: "40px" }}>
        <Grid.Container justify="center" align="center">
          <Grid justify="center" align="center">
            <Row>
              <Input
                clearable
                label="Search for Holder Address"
                placeholder="0x00000...."
                onChange={(e) => setAddress(e.target.value)}
              />
            </Row>
            <Row css={{ mt: "10px" }} justify="center" align="center">
              <Button size="sm" onClick={verifyNft}>
                Verify
              </Button>
            </Row>
          </Grid>
        </Grid.Container>
      </Row>
      <Row justify="center" align="center" css={{ m: "40px 0 0 0" }}>
        <Grid.Container justify="center" align="center">
          <Grid xs={12} lg={4} md={6} justify="center" align="center">
            <Card>
              <Card.Header>
                <Row justify="flex-end">
                  <Col span={12}>
                    <Text h4 justify="center" align="center">
                      Credit Bureau Certificate #{"0"}
                    </Text>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body css={{ py: "$2" }}>
                <Row justify="flex-end">
                  <Col span={12}>
                    <Text justify="center" align="center">
                      This is certificate issued for {"Name"} for stacking{" "}
                      {"amount"} MATIC in credit bureau
                    </Text>
                  </Col>
                </Row>
                <Image
                  css={{ m: "10px 0 0 0" }}
                  showSkeleton
                  width={320}
                  height={180}
                  maxDelay={10000}
                  src="http://www.deelay.me/10000/https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                  alt="Default Image"
                />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Grid>
        </Grid.Container>
      </Row>
    </>
  );
};
