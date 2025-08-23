import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavigationItemProps {
  to: string;
  children: React.ReactNode;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ to, children }) => {
  const location = useLocation();

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 rounded text-sm font-medium ${
        location.pathname === to
          ? "text-gray-900 bg-gray-100 font-medium"
          : "text-gray-400 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavigationItem;
