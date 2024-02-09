import { XIcon } from "@heroicons/react/solid";
import { Chains, OpenFormatProvider } from "@openformat/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import Layout from "components/Layout";
import { AnimatePresence } from "framer-motion";
import tw from "lib/tw";
import { capitalize } from "lib/utils";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { TypeOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { APP_NAME } from "stores/game/constants";
import "../styles/globals.css";

const queryClient = new QueryClient();

const contextClass: Record<TypeOptions, string> = {
  success: tw`ring-2 ring-blue-600 text-blue-600 bg-blue-50`,
  error: tw`ring-2 ring-red-600 text-red-600 bg-red-50`,
  info: tw`ring-2 ring-gray-600 text-gray-600 bg-gray-50`,
  warning: tw`ring-2 ring-orange-600 text-orange-600 bg-orange-50`,
  default: tw`ring-2 ring-indigo-600 text-indigo-600 bg-indigo-50`,
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    toast.configure({
      style: { padding: "1rem", display: "grid", gap: ".75rem" },
      hideProgressBar: true,
      closeButton: <XIcon className="h-6 w-6 p-1" />,
      toastClassName: (ctx) =>
        clsx(
          contextClass[ctx?.type || "default"],
          "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        ),
    });
  }, []);

  return (
    <>
      <Head>
        <title>{capitalize(APP_NAME)}</title>
      </Head>
      <AnimatePresence>
        <OpenFormatProvider
          config={{
            networks: [Chains.polygonMumbai],
            appId: process.env.NEXT_PUBLIC_APPLICATION_ID as string,
            activeChain: "mumbai",
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </OpenFormatProvider>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
