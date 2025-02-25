// components/OrgChart.js
import React from "react";
import { useNodeContext } from "../context/NodeContext";
import Node from "./Node";

const OrgChart = () => {
  const { nodes } = useNodeContext();

  return (
    <div className="p-5 border-2">
      {nodes.map((node) => (
        <Node 
          key={node.id}
          node={node}
        />
      ))}
    </div>
  );
};

export default OrgChart;