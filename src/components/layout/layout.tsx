import React from "react";
import Sidebar from "./sidebar/Sidebar.tsx";
import Header from "./header/Header.tsx";
import Background from "./Background.tsx";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* 커스텀 컬러 균일한 그라디언트 배경 */}
      <Background />

      {/* 콘텐츠 레이어 */}
      <div className="relative z-10 flex flex-col w-full bg-glass-intermediate backdrop-blur-lg">
        <Header />
        <div className="flex-1 flex p-2 pt-0 gap-3">
          <Sidebar />
          <div className="flex-1 bg-glass-intermediate overflow-auto shadow-glass rounded-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
