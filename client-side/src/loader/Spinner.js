import React from "react";
import { Vortex } from "react-loader-spinner";

const Spinner = ({isLoad}) => {
  return (
    <Vortex
      visible={isLoad}
      height="30"
      width="30"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={["yellow", "purple", "blue", "yellow", "blue", "purple" ]}
    />
  );
};

export default Spinner;
