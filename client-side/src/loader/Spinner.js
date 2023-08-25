import React from "react";
import { Vortex } from "react-loader-spinner";

const Spinner = () => {
  return (
    <Vortex
      visible={true}
      height="50"
      width="50"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={["yellow", "purple", "blue", "yellow", "blue", "purple" ]}
    />
  );
};

export default Spinner;
