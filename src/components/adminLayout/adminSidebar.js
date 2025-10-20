"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiChevronsRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { FaMoneyCheckAlt, FaChartLine, FaUsers } from "react-icons/fa";
import Image from "next/image";

const sidebarhead = [{ mainhead: "Sigmantarian" }, { subhead: "Admin Dashboard" }];

const Sidebar = ({ open, setOpen }) => {
  const pathname = usePathname();
  const [selected, setSelected] = useState("Dashboard");

  const sidebarItems = [
    { Icon: MdSpaceDashboard, title: "Dashboard", route: "/admindashboard" },
    { Icon: AiOutlinePlusSquare, title: "Create Package", route: "/admindashboard/createpackage" },
    { Icon: BsBoxSeam, title: "Package Details", route: "/admindashboard/packagedetail" },
    { Icon: HiOutlineUsers, title: "User's Package", route: "/admindashboard/userspackage" },
    // { Icon: FaChartLine, title: "Package Request", route: "/admindashboard/packageRequest" },
    { Icon: FaMoneyCheckAlt, title: "Withdraw Details", route: "/admindashboard/withdrawdetails" },
    { Icon: FaUsers, title: "Users", route: "/admindashboard/users" },
  ];

  const router = useRouter();

  useEffect(() => {
    const matchingItem = sidebarItems.find(item => pathname === item.route);
    if (matchingItem) setSelected(matchingItem.title);
  }, [pathname]);

  return (
    <motion.nav
      layout
      className="fixed top-0 left-0 h-screen z-50 flex flex-col justify-between bg-[#0B98AC]
      backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.3)] p-2 border-r border-white"
      style={{ width: open ? "230px" : "70px" }}
    >
      <div>
        <TitleSection open={open} />

        <div className="flex flex-col gap-2 mt-2">
          {sidebarItems.map(item => (
            <SidebarOption
              key={item.title}
              {...item}
              selected={selected}
              setSelected={setSelected}
              open={open}
              router={router}
            />
          ))}
        </div>
      </div>

      <ToggleSidebar open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const SidebarOption = ({ Icon, title, route, selected, setSelected, open, router }) => {
  const handleClick = () => {
    setSelected(title);
    router.push(route);
  };

  return (
    <motion.button
      layout
      onClick={handleClick}
      className={`relative flex h-10 w-full items-center rounded-xl px-2 gap-2
      transition-all duration-300 ${
        selected === title
          ? "bg-white text-[#0B98AC] shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          : "text-white hover:bg-white hover:text-[#0B98AC] hover:shadow-[0_0_8px_rgba(168,85,247,0.4)]"
      }`}
    >
      <motion.div className="grid h-full w-8 place-content-center text-lg">
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          className="text-sm font-medium truncate"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};



const TitleSection = ({ open }) => (
  <div className="mb-3">
    <div className="flex items-center gap-2 cursor-pointer">
      <Logo />
      {open && (
        <div className="ml-1">
          {sidebarhead.map((data, i) => (
            <div key={i}>
              <span className="block text-lg text-white font-bold">{data.mainhead}</span>
              <span className="block text-xs text-gray-200">{data.subhead}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Logo = () => (
  <motion.div className="grid size-10 place-content-center rounded-xl ">
    <Image src="/logoo.png" width={300} height={300} alt="Sidebar-Logo" />
  </motion.div>
);

const ToggleSidebar = ({ open, setOpen }) => (
  <motion.button
    layout
    onClick={() => setOpen(prev => !prev)}
    className="border-t bg-[#0B98AC] hover:bg-white hover:rounded-lg border-white mt-4 py-3 flex items-center justify-center hover:text-[#0B98AC] transition-colors"
  >
    <div className="flex items-center justify-center gap-2">
      <FiChevronsRight className={`text-[#0B98AC] hover:text-white transition-transform ${open && "rotate-180"}`} />
      {open && <span className="text-lg text-white font-bold hover:text-[#0B98AC]">Hide</span>}
    </div>
  </motion.button>
);

export default Sidebar;
