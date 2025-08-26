import React from "react";
import ConnectButton from "../../button/ConnectButton";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-2 py-3">
      <div className="text-xl pl-2 font-bold">HOHO Wallet</div>
      <div className="flex gap-4 overflow-hidden items-center">
        {/* <p className="text-green-gray-700 font-sm">Connect to use wallet</p> */}
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
