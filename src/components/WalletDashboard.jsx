"use client";

import { WalletContext } from "@/app/Connector";
import { sigmav3ABI } from "@/lib/utils/sigmav3ABI";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";


const sigmaV3 = "0x5d212DB791464804a5005d1968C9AE973A4BA581"

const WalletDashboardHeading = () => {
  const [Id, setId] = useState(0)
  const [ref, setRef] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEarn, setEarnUsers] = useState(0);
  const { walletAddress, setWalletAddress, signer, setSigner }  = useContext(WalletContext);
  const sigm = new ethers.Contract(sigmaV3,sigmav3ABI,signer);
  useEffect(()=>{

    async function run(){
      const [o, t, three, f] = await sigm.userDetails(walletAddress)
      const [one, two, th, four] = await sigm.user(walletAddress)
      const [userss, ttlEarn] = await sigm.LastIdUser();
      const totalP = (userss).toString()
      const totalEarn = (ttlEarn).toString()
      // console.log("This is total users: ",userss);
      setTotalUsers(totalP)
      setEarnUsers(totalEarn)
      const on = (one).toString()
      const thre = (three).toString()
      setRef(on)
      setId(thre)
      // console.log("This is ID:",thre);
    }
    if(walletAddress ){
      run()
    }
  },[walletAddress,sigm,Id])
  return (
    <div className="bg-[#01204c] text-center text-white">
      {/* <h2 className="text-center pt-8 px-4 font-semibold">
        Advertisement bonus coming soon...
      </h2> */}
      <div className="flex flex-wrap justify-center items-center  text-xl gap-10 max-w-6xl mx-auto pt-10 pb-14 px-14 ">
        <div className=" border p-6 rounded-xl flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-semibold">
            {" "}
            ALL PARTICIPANTS{" "}
          </h1>
          <h1 className="text-yellow-200">
            {/* {" "} */}
           {totalUsers}
          </h1>
        </div>

        <div className=" border  p-6 rounded-xl flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-semibold uppercase">
            {" "}
            TOTAL PlateForm EARNING{" "}
          </h1>
          <h1 className="text-yellow-200">{totalEarn}</h1>
        </div>
        <div className=" border  p-6 rounded-xl flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-semibold">Your ID number</h1>

          <h1 className="text-yellow-200">{Id}</h1>
        </div>
      </div>
    </div>
  );
};
export default WalletDashboardHeading;
