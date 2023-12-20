import React from "react";
import { ConnectButton } from "@openformat/react";

export default function LoginButton() {
  return (
    <ConnectButton
      switchToActiveChain={true}
      modalSize="compact"
      welcomeScreen={{
        title: "Connect your wallet",
        subtitle: "Connect with Metamask or Continue as Guest.",
      }}
      modalTitleIconUrl={"https://app.openformat.tech/favicon.ico"}
    />
  );
}
