import React from "react";
import {} from "antd";

interface NavbarProps {}

const Navbar: React.SFC<NavbarProps> = () => {
  return (
    <div className={"w-full p-6 text-2xl border-b-2 border-gray-100 bg-white"}>
      Deployment App
    </div>
  );
};
export default Navbar;
