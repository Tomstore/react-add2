import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { getEchartsState } from "../../api";
const Index: React.FC = () => {
  const [option, setOption] = useState({});
  useEffect(() => {
    (async () => {
      const resp = await getEchartsState();
      setOption(resp.data.data);
    })();
  }, []);

  return (
    <div>
      <ReactECharts option={option} style={{ width: 500, height: 500 }} />
    </div>
  );
};

export default Index;
