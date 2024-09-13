import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";

import { Chains, OpenFormatProvider } from "@openformat/react";
import { privyConfig } from "./lib/privy";
import { wagmiConfig } from "./lib/wagmi";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={privyConfig}
    >
      <OpenFormatProvider
        config={{
          networks: [Chains.arbitrumSepolia],
          appId: process.env.NEXT_PUBLIC_APPLICATION_ID as string,
          activeChain: "arbitrum-sepolia",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
        </QueryClientProvider>
      </OpenFormatProvider>
    </PrivyProvider>
  );
}
