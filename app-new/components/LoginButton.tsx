import React from "react";
import {
  ConnectButton,
  useSetIsWalletModalOpen,
  useWallet,
} from "@openformat/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const validSession = session?.user?.address;
  console.log("Wallet address", validSession);
  const { address } = useWallet();
  const prevAddress = session?.user?.address;
  const setIsWalletModalOpen = useSetIsWalletModalOpen();

  useEffect(() => {
    const lastConnectedWallet = JSON.parse(
      localStorage.getItem(
        "__TW__/coordinatorStorage/lastConnectedWallet"
      ) as any
    );
    const localWallet = JSON.parse(
      localStorage.getItem("__TW__/localWallet/localWalletData") as any
    );

    if (
      validSession &&
      router.pathname !== "/login" &&
      lastConnectedWallet?.walletId !== "metamask" &&
      localWallet
    ) {
      setIsWalletModalOpen(true);
    }
  }, [validSession]);

  useEffect(() => {
    if (prevAddress && address !== prevAddress) {
      router.replace("/logout");
    }
  }, [address]);

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
