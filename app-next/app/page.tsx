import React from "react";

type GlobalLayoutProps = {
  children: React.ReactNode;
};

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Global elements like header/footer */}
      {children}
    </div>
  );
};

export default GlobalLayout;
