import React from "react";
import { Row, Grid, Image, Link } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from '../public/logo.png'


export const HeaderNav = () => {
  const connectWallet = () => {
    console.log("");
  };

  return (
    <>
      <Row
        css={{
          backgroundColor: "#000",
          padding: "10px 0",
          marginBottom: "30px",
        }}
        justify="center"
        align="center"
      >
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={6} lg={6} justify="center">
            <Link css={{ color: "#fff" }}>
              <Image
                src={logo}
                alt="Default Image"
                width={50}
                height={50}
              />
            </Link>
          </Grid>
          <Grid xs={12} md={6} lg={6} justify="center">
            <ConnectButton />
          </Grid>
        </Grid.Container>
      </Row>
    </>
  );
};
