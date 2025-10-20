"use client";
import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { WalletContext } from '@/app/Connector';
import { sigmav3ABI } from '@/lib/utils/sigmav3ABI';

const Statistics = () => {
  
  
  // state Varibles 
  const sigmaV3 = "0x5d212DB791464804a5005d1968C9AE973A4BA581"
  const { walletAddress, setWalletAddress, signer, setSigner }  = useContext(WalletContext);
  const [userDate, setUserDate] = useState([]);
  const [userID, setUserId] = useState([]);
  const [DRef, setDRef] = useState([]);
  const [earned, setEarned] = useState([])
  const [team, setTeam] = useState([])

  // Use Effects 
  useEffect(()=>{
    const sigm = new ethers.Contract(sigmaV3,sigmav3ABI,signer);
    async function run() {
      const [v1,v2,v3,v4] = await sigm.userDetails(walletAddress);
      const [vb1,vb2,vb3,vb4] = await sigm.user(walletAddress);
      const numofTeam = (v4).toString();
      let tol2 = [];
      
      // fetch team List
      for (let j = 0; j < (numofTeam+1); j++) {
        let tol = await sigm.teamlist(walletAddress,j)
        for(let i = 0; i<(numofTeam+1); i++){
          if(tol[i] > 0){
            let num = (tol[i]).toString()
            tol2.push(num)
            // console.log("statistics LN40: ",num);
            // if(i == numofTeam){
            //     console.log("done!!",team);
                
            //   }
            }
          }
        }
      // console.log("statistics LN47: ",tol2);
      setTeam([tol2]);
      // console.log("statistics LN49: ",team);
      // console.log(`statistics ln50: ${team.length}`);
        // console.log(`statitics LN:40 =>${tol2}`);
        
      let myDate = [];
      let myDReff = [];
      let myID = [];
      let myEarned = [];

      for (let k = 0; k < (tol2.length); k++) {
        let add = await sigm.IdtoAddress(tol2[k])
        const [v1,v2,v3,v4] = await sigm.userDetails(add);
        const [vb1,vb2,vb3,vb4] = await sigm.user(add);
        let date = new Date(vb4 * 1000);
        // let divider = (vb1).toNumber() / team.length;
        
        myDate.push(date.toDateString());
        myDReff.push(v1.toString());
        myID.push(v3.toString());
        myEarned.push(vb1.toString());
      }
  
        // console.log('statistics LN 70: ',myDate)
        console.log('statistics LN 73: ',myDate)    

    setUserDate(myDate)
    setUserId(myID)
    setDRef(myDReff)
    setEarned(myEarned)

    }
    if(walletAddress){
      run()
    }
    
  },[walletAddress])



  return (
    <div className="flex flex-col justify-center">
      <div className=" flex flex-col justify-center  md:h-96 rounded-xl  bg-[#1C398E] text-center border border-white lg:p-4">
          <div className="lg:w-full">
            <table className=" lg:w-full text-sm text-left rtl:text-right bg-[#01204c] ">
              <thead className=" text-[12px] md:text-md text-gray-100 uppercase bg-[#74469188] ">
                <tr>
                  <th scope="col" className="px-1 md:px-5 lg:px-6 py-3">
                    registration date
                  </th>
                  <th scope="col" className="px-1 md:px-5 lg:px-6 py-3 ">
                    ref id
                  </th>
                  <th scope="col" className="px-1 md:px-5 lg:px-6 py-3 ">
                    user id
                  </th>

                  <th scope="col" className="px-1 md:px-5 lg:px-6 py-3 ">
                    earn ref
                  </th>
                </tr>
              </thead>
              <tbody>
              {userDate.map((date, index) => (
                  <tr
                    key={index}
                    className="text-gray-200 border-b bg-[#401b5788]  ">

                    <td className="px-3 md:px-6 py-4">
                      {date}
                    </td>

                    <td className="px-3 md:px-6 py-4">
                      {DRef[index]}
                      </td>
                    
                    <td className="px-3 md:px-6 py-4">
                      {userID[index]}
                      </td>

                    <td className="px-3 md:px-6 py-4">
                      {earned[index]}
                      </td>

                  </tr>
              ))}
              </tbody>
            </table>
          </div>
      </div>
      <div className="flex justify-center gap-5 py-4">
        <button
        // onClick={setuserdate}
          className="bg-[#1C398E] text-white border border-gray-200 px-3 py-2 rounded-lg "
        >
          Loading
        </button>
      </div>
    </div>
  );
};

export default Statistics;
