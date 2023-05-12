import React, { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Index = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  });
  return <div></div>;
};

export default Index;
