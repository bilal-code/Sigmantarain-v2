"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiChevronsRight,
  FiHome,
  FiPackage,
} from "react-icons/fi";
import { 
  FiUser, 
} from "react-icons/fi";
import { 
  MdUpgrade 
} from "react-icons/md";
import { 
  RiWallet3Line 
} from "react-icons/ri";
import { 
  TbStack2 
} from "react-icons/tb";

const sidebarhead = [{ mainhead: "Sigmentarian", subhead: "User Dashboard" }];

const Sidebar = ({ open, setOpen }) => {
  const pathname = usePathname();
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    const matchingItem = sidebarItems.find((item) => pathname === item.route);
    if (matchingItem) setSelected(matchingItem.title);
  }, [pathname]);

  const sidebarItems = [
    { Icon: FiHome, title: "Dashboard", route: "/userdashboard" },
  { Icon: FiUser, title: "Profile", route: "/userdashboard/profile" },
  {
    Icon: MdUpgrade,
    title: "Buy / Upgrade Package",
    route: "/userdashboard/buypackage",
  },
  {
    Icon: FiPackage,
    title: "My Packages",
    route: "/userdashboard/mypackage",
  },
  {
    Icon: RiWallet3Line,
    title: "Request Withdraw",
    route: "/userdashboard/requestwithdraw",
  },
  {
    Icon: TbStack2,
    title: "Staking Platform",
    route: "/userdashboard/stackingPlatform",
  },
  ];

  return (
    <motion.nav
      layout
      className="fixed top-0 left-0 h-screen z-50 flex flex-col justify-between bg-[#0B98AC]
      backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.3)] p-2 border-r border-white"
      style={{ width: open ? "230px" : "70px" }}
    >
      <div>
        <TitleSection open={open} />
        <div className="flex flex-col gap-1 mt-4">
          {sidebarItems.map((item) => (
            <SidebarOption
              key={item.title}
              {...item}
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
          ))}
        </div>
      </div>

      <ToggleSidebar open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const SidebarOption = ({ Icon, title, selected, setSelected, open, route }) => {
  const router = useRouter();

  const handleClick = () => {
    setSelected(title);
    if (route) router.push(route);
  };

  return (
    <motion.button
      layout
      onClick={handleClick}
      className={`relative flex h-10 w-full items-center rounded-xl px-2 gap-2
      transition-all duration-300
        ${
          selected === title
            ? "bg-white text-[#0B98AC] shadow-[0_0_12px_rgba(255,255,255,0.6)]"
            : "text-white hover:bg-white hover:text-[#0B98AC] hover:shadow-[0_0_8px_rgba(168,85,247,0.4)]"
        } h-10`}
    >
      <motion.div
        layout
        className="grid h-full w-8 place-content-center text-lg"
      >
        <Icon className="hover:scale-110" />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-medium tracking-wide"
        >
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => (
  <div className="flex items-center gap-2 cursor-pointer">
    <Logo />
    {open && (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {sidebarhead.map((data, index) => (
          <div key={index}>
            <span className="block text-lg text-white font-bold">
              {data.mainhead}
            </span>
            <span className="block text-xs text-gray-200">{data.subhead}</span>
          </div>
        ))}
      </motion.div>
    )}
  </div>
);

const Logo = () => (
  <motion.div layout className="grid size-10 place-content-center rounded-xl ">
    <Image width={40} height={40} src="/logoo.png" alt="Title-Logo" />
  </motion.div>
);

const ToggleSidebar = ({ open, setOpen }) => (
  <motion.button
    layout
    onClick={() => setOpen((prev) => !prev)}
    className="border-t bg-[#0B98AC] hover:bg-white hover:rounded-lg border-white mt-4 py-3 flex items-center justify-center hover:text-[#0B98AC] transition-colors"
  >
    <div className="flex items-center">
      <motion.div layout className="text-2xl">
        <FiChevronsRight
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg cursor-pointer text-gray-600 font-bold hover:text-[#0B98AC]"
        >
          Hide
        </motion.span>
      )}
    </div>
  </motion.button>
);

export default Sidebar;
