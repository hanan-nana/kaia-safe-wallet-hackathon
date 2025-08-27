import ConnectStatus from "./ConnectStatus.tsx";
import WalletInfo from "./WalletInfo.tsx";

const Sidebar = () => {
  return (
    <div className="w-64 flex flex-col">
      {/* Header Section - Logo only */}
      <div className="mb-6">
        {/* Logo */}
        <div className="text-lg font-bold text-center py-3">HOHO Wallet</div>
      </div>

      {/* Wallet Info Summary */}
      <div className="mb-6">
        <WalletInfo />
      </div>

      {/* Safe Wallet Management */}
      <div className="mb-8">
        <ConnectStatus />

        {/* New Transaction Button */}
        {/* <Button variant="primary" size="lg" fullWidth>
          New transaction
        </Button> */}
      </div>

      {/* Navigation */}
      {/* <nav className="flex flex-col gap-1 mb-6">
        <NavigationItem to="/">Home</NavigationItem>
        <NavigationItem to="/">Transactions</NavigationItem>
      </nav> */}

      {/* Server Info at bottom */}
      {/* <div className="mt-auto">
        <ServerInfo />
      </div> */}
    </div>
  );
};

export default Sidebar;
