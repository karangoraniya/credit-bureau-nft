import { useEffect, useState } from "react";
import { Text, Row, Button, Modal, Input, Loading } from "@nextui-org/react";
import { ethers } from "ethers";
import { NFTStorage, File } from "nft.storage";
import CreditCertificate from "../artifacts/contracts/CreditCertificate.sol/CreditCertificate.json";

export const GetCertificate = () => {
  const [name, setName] = useState("");
  const [maticAmount, setMaticAmount] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setIsLoading] = useState();

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  async function checkForWallet() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      console.log(walletAddress);
    } catch (err) {
      console.log(err);
    }
  }

  // async function storeNFT() {

  //   // load the file from disk
  //   const image = createImage;
  //   const description = "";
  //   // create a new NFTStorage client using our API key
  //   const nftstorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY});

  //   // call client.store, passing in the image & metadata
  //   const result =  nftstorage.store({
  //     image,
  //     name,
  //     description,
  //   });

  //   console.log(result)
  // }

  useEffect(() => {
    checkForWallet();
  }, []);

  const createCertificate = async () => {
    setIsLoading(true);
    const fullName = name;
    const amount = ethers.utils.parseUnits(maticAmount, "ether");
    const description = `This is certificate issued for ${fullName} for stacking ${amount} MATIC in credit bureau`;
    const tokenUri = "we";
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
    let contract = new ethers.Contract(
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
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row justify="center" align="center" css={{ m: "40px 0 0 0" }}>
        <div>
          <Text>Lock MATIC to get certificate</Text>
        </div>
      </Row>
      <Row justify="center" align="center" css={{ m: "10px 0 0 0" }}>
        <div>
          <Button onClick={handler}>Get Certificate</Button>
        </div>
      </Row>

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
              <Button auto onClick={createCertificate}>
                Lock
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
