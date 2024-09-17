// src/components/Loader.tsx
import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <Circles
        height="80"
        width="80"
        color="#063d6a"
        ariaLabel="loading"
        wrapperClass="loader"
      />
    </div>
  );
};

export default Loader;
