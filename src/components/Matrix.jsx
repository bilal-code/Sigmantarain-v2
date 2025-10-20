// components/NumberCircles.js
import React from 'react';

const Matrix = ( {numbers}  ) => {
  console.log("this is array from matrix",numbers);
  return (
    <div className="flex flex-col space-y-2"> {/* Container for circles */}
      {numbers.map((number, index) => (
        <div
          key={index}
          className={`flex items-center justify-center w-8 h-8 rounded-full text-[#fdf08a] font-semibold 
            bg-[#3a83f6]`}>
          {number}
        </div>
      ))} 
    </div>
  );
};

export default Matrix;