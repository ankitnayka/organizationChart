import React from "react";
import { NodeProvider } from "./components/NodeProvider";
import OrgChart from "./components/OrgChart";
import OrgChart1 from "./components/OrgChart1";
import store from "./app/store";
import { Provider } from "react-redux";
import OrgChartRedux from "./components/OrgChartRedux";

const App = () => {
  return (
    <>
      <OrgChartRedux />
      <NodeProvider>
        <OrgChart />

        <OrgChart1 />
      </NodeProvider>
    </>
  );
};

export default App;

// import React, { useState } from "react";
// import { NodeProvider } from "./components/NodeProvider";

// const OrgChart = () => {
//   const { nodes } = useNodeContext();

//   return (
//     <div className="p-5 border-2">
//       {nodes.map((node) => (
//         <Node
//           key={node.id}
//           node={node}
//         />
//       ))}
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <>
//       <NodeProvider>
//         <OrgChart />
//       </NodeProvider>
//     </>
//   );
// };

// export default App;
