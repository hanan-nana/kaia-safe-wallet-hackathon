import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-2 py-3">
      <div className="text-xl pl-2 font-bold">HOHO Wallet</div>
      <div className="flex gap-4 overflow-hidden items-center">
        {/* <p className="text-green-gray-700 font-sm">Connect to use wallet</p> */}
        <button className="px-5 py-1.5 text-white font-medium text-md rounded-full transition-colors bg-[#132F2BEE] hover:bg-[#132F2B]">
          Connect
        </button>
      </div>
    </div>
  );
};

export default Header;
