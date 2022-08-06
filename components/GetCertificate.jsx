import { useEffect, useState } from "react";
import {
  Text,
  Row,
  Button,
  Modal,
  Input,
  Loading,
  Grid,
  Card,
  Col,
  Image,
} from "@nextui-org/react";
import { ethers } from "ethers";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import CreditCertificate from "../artifacts/contracts/CreditCertificate.sol/CreditCertificate.json";
import Swal from "sweetalert2";

export const GetCertificate = () => {
  const [name, setName] = useState("");
  const [maticAmount, setMaticAmount] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setIsLoading] = useState();
  const [nftData, setNFTData] = useState({});
  const { address, isConnected } = useAccount();

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  async function checkForCertificate() {
    if (isConnected && address) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT,
          CreditCertificate.abi,
          provider
        );
        let data = await contract.getLockData(address);
        console.log(data);
        setNFTData({
          name: data.name,
          tokenUrI: data.tokenUrI,
          tokenId: data.tokenId.toString(),
          description: data.description,
          amountLocked: data.amount.toString(),
        });
        console.log(nftData);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    checkForCertificate();
  }, [isConnected, address]);

  const unLockFunds = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT,
      CreditCertificate.abi,
      signer
    );
    try {
      const tx = await contract.unLock(address);
      await tx.wait();
      console.log(tx);
      setIsLoading(false);
      closeHandler();
      Swal.fire({
        icon: "success",
        title: "MATIC's unlock successfully",
        html: `<a href="https://rinkeby.etherscan.io/tx/${tx.hash}">View on explorer</a>`,
      });
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
      closeHandler();
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
      });
    }
  };

  const createCertificate = async () => {
    setIsLoading(true);
    const fullName = name;
    const amount = ethers.utils.parseUnits(maticAmount, "ether");
    const description = `This is certificate issued for ${fullName} for stacking ${maticAmount} MATIC in credit bureau`;
    const tokenUri = "uri";
    if (!(amount > 0)) {
      setIsLoading(false);
      alert("Amount should be greater than 1");
      return;
    }
    if (!fullName || !maticAmount) {
      setIsLoading(false);
      alert("Please fill all the input values");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT,
      CreditCertificate.abi,
      signer
    );

    try {
      const tx = await contract.lockFunds(
        amount,
        tokenUri,
        fullName,
        description,
        {
          value: amount,
        }
      );
      await tx.wait();
      console.log(tx);
      setIsLoading(false);
      closeHandler();
      Swal.fire({
        icon: "success",
        title: "Certificate generate successfully",
        html: `<a href="https://rinkeby.etherscan.io/tx/${tx.hash}">View on explorer</a>`,
      });
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
      closeHandler();
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
      });
    }
  };

  return (
    <>
      {nftData.name !== "" ? (
        <Row justify="center" align="center" css={{ m: "40px 0 0 0" }}>
          <Grid.Container justify="center" align="center">
            <Grid xs={12} lg={4} md={6} justify="center" align="center">
              <Card>
                <Card.Header>
                  <Row justify="flex-end">
                    <Col span={12}>
                      <Text h4 justify="center" align="center">
                        Certificate Number #{nftData.tokenId}
                      </Text>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body css={{ py: "$2" }}>
                  <Row justify="flex-end">
                    <Col span={12}>
                      <Text color={"secondary"} justify="center" align="center">
                        Certificate of {nftData.name}
                      </Text>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col span={12}>
                      <Text justify="center" align="center">
                        {nftData.description}
                      </Text>
                    </Col>
                  </Row>
                  <Image
                    css={{ m: "10px 0 0 0" }}
                    showSkeleton
                    width={320}
                    height={180}
                    maxDelay={10000}
                    src={nftData.tokenUrI}
                    alt="Certificate"
                  />
                </Card.Body>
                <Card.Footer>
                  <Row
                    justify="center"
                    align="center"
                    css={{ m: "40px 0 0 0" }}
                  >
                    <Button onClick={unLockFunds}>UnLock Funds</Button>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          </Grid.Container>
        </Row>
      ) : (
        <>
          <Row justify="center" align="center" css={{ m: "40px 0 0 0" }}>
            <div>
              <Text>
                Lock MATIC to get certificate {"(Only one certificate allowed)"}
              </Text>
            </div>
          </Row>

          <Row justify="center" align="center" css={{ m: "10px 0 0 0" }}>
            <div>
              {isConnected ? (
                <Button onClick={handler}>Get Certificate</Button>
              ) : (
                <Button disabled>Connect Wallet First</Button>
              )}
            </div>
          </Row>
        </>
      )}

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Lock&nbsp;
            <Text b size={18}>
              MATIC
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loading
              loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
            />
          ) : (
            <>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Your Full Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Amount In Matic"
                onChange={(e) => setMaticAmount(e.target.value)}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            " "
          ) : (
            <>
              <Button auto flat color="error" onClick={closeHandler}>
                Close
              </Button>
              <Button auto color="success" onClick={createCertificate}>
                Lock
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
