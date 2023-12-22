import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { Chains, OpenFormatProvider } from "@openformat/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OpenFormatProvider
      config={{
        networks: [Chains.polygonMumbai],
        appId: "",
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
        activeChain: "mumbai",
      }}
    >
      <Nav />
      <Component {...pageProps} />
    </OpenFormatProvider>
  );
}
