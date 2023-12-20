import React from "react";
import {
  ConnectButton,
  useSetIsWalletModalOpen,
  useWallet,
} from "@openformat/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginButton() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("session", session);
  const validSession = session?.user?.address;
  console.log("Session wallet address", validSession);
  const { address } = useWallet();
  console.log("Wallet address", address);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    const baseURL = process.env.NEXT_PUBLIC_API_HOSTNAME + "/api/v1";
    const res = await axios.post(`${baseURL}/auth/refresh_token`, {
      refreshToken: session.user.refresh_token,
    });

    const me = await axios.get(`${baseURL}/profile/me`, {
      headers: { Authorization: `Bearer ${res.data.accessToken}` },
    });

    return {
      props: {
        profileData: me.data,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
