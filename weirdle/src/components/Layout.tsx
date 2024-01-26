import React from "react";
import Header from "components/Header";

const Layout: React.FC<{ onIconClick?: () => void }> = ({
  children,
  onIconClick,
}) => {
  return (
    <div className="m-auto flex h-screen w-full flex-col dark:bg-gray-700">
      <Header onIconClick={onIconClick} />
      <main className="m-auto flex max-w-lg flex-1 flex-col justify-between p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
