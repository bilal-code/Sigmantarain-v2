// components/NumberCircles.js
import React from 'react';

const MatrixLoading = (  ) => {
  const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  return (
    <div className="flex flex-col space-y-2"> {/* Container for circles */}
      {numbers.map((number, index) => (
        <div
          key={index}
          className={`flex items-center justify-center w-8 h-8 rounded-full text-[#fdf08a] font-semibold 
            bg-[#3a83f6]`}>
                <a className='text-[6px] p-1 text-white'> Loading </a>
        </div>
      ))} 
    </div>
  );
};

export default MatrixLoading;