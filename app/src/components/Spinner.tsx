import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[60%]">
      <div className="w-16 h-16 border-3 border-t-4 border-blue-400 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;