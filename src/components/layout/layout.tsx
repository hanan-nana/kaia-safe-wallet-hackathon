import Sidebar from "./sidebar/Sidebar.tsx";
import Background from "./Background.tsx";
import ConnectOnlyLayout from "./ConnectOnlyLayout";
import { useWalletAccount } from "../../hooks/useWalletAccount";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isConnected } = useWalletAccount();
  // 지갑이 연결되지 않았을 때는 Connect 화면만 보여줌
  if (!isConnected) {
    return <ConnectOnlyLayout />;
  }

  // 지갑이 연결되었을 때는 사이드바와 메인 콘텐츠 보여줌
  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* 커스텀 컬러 균일한 그라디언트 배경 */}
      <Background />

      {/* 콘텐츠 레이어 */}
      <div className="relative z-10 flex w-full backdrop-blur-lg p-2 gap-3">
        <Sidebar />
        <div className="flex-1 bg-glass-intermediate overflow-auto shadow-glass rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
