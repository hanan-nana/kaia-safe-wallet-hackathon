import React from "react";
import Sidebar from "./sidebar/Sidebar.tsx";
import Header from "./header/Header.tsx";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* 애니메이션 그라디언트 배경 */}
      <div className="absolute inset-0 gradient-bg-kaia" />

      {/* 콘텐츠 레이어 */}
      <div className="relative z-10 flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
