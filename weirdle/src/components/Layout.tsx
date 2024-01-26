import React from "react";
import Header from "components/Header";
import { Chains, OpenFormatProvider } from "@openformat/react";
import { AnimatePresence } from "framer-motion";

const Layout: React.FC<{ onIconClick?: () => void }> = ({
  children,
  onIconClick,
}) => {
  return (
    <AnimatePresence>
      <OpenFormatProvider
        config={{
          networks: [Chains.polygonMumbai],
          appId: process.env.NEXT_PUBLIC_APPLICATION_ID as string,
        }}
      >
        <div className="m-auto flex h-screen w-full flex-col dark:bg-gray-700">
          <Header onIconClick={onIconClick} />
          <main className="m-auto flex max-w-lg flex-1 flex-col justify-between p-4">
            {children}
          </main>
        </div>
      </OpenFormatProvider>
    </AnimatePresence>
  );
};

export default Layout;
