import ConnectButton from "../button/ConnectButton";
import Background from "./Background";

const ConnectOnlyLayout = () => {
  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* 커스텀 컬러 균일한 그라디언트 배경 */}
      <Background />

      {/* 중앙 연결 화면 */}
      <div className="relative z-10 flex items-center justify-center w-full bg-glass-intermediate backdrop-blur-lg">
        <div className="text-center space-y-8">
          {/* 로고 */}
          <h2
            className="text-sm font-semibold text-green-gray-600"
            style={{
              fontFamily: "Boldonse, sans-serif",
              letterSpacing: "-0.04em",
              lineHeight: "1.4",
            }}
          >
            Welcome to
          </h2>
          <div
            className="text-4xl font-bold mb-8 text-primary"
            style={{
              fontFamily: "Boldonse, sans-serif",
              letterSpacing: "-0.04em",
              lineHeight: "50px",
            }}
          >
            HOHO Wallet
          </div>

          {/* 연결 메시지 */}
          <div className="space-y-4">
            <p className="text-green-gray-400 max-w-md mx-auto">
              Connect your wallet to access Safe Wallet management and
              transaction features
            </p>
          </div>

          {/* 연결 버튼 */}
          <div className="pt-4">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectOnlyLayout;
