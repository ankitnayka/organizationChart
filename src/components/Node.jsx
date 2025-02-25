// components/Node.js
import React from "react";
import { useNodeContext } from "../context/NodeContext";

const Node = ({ node }) => {
  const { addSubordinate, removeNode, addBranchMember } = useNodeContext();

  return (
    <div className="border p-2 rounded-lg shadow-md bg-white text-center mt-2">
      <div className="flex justify-between items-center">
        <span
          onClick={() => addSubordinate(node.id, node.path)}
          className="cursor-pointer font-bold"
        >
          {node.name} 
        </span>

        <div className="space-x-2">
          {!node.isBranchMember && (
            <button
              className="bg-green-500 text-white px-2 rounded-xl"
              onClick={() => addSubordinate(node.id, node.path)}
            >
              +
            </button>
          )}
          <button
            className="bg-blue-500 text-white px-2 rounded-xl"
            onClick={() => addBranchMember(node.id, node.path)}
          >
            branch
          </button>
          {node.id !== 1 && (
            <button
              className="bg-red-500 text-white px-2 rounded-xl"
              onClick={() => removeNode(node.id)}
            >
              -
            </button>
          )}
        </div>
      </div>

      {node.expanded && (
        <div className="ml-4 border-l mt-2 pl-4">
          {node.subordinates.map((sub) => (
            <Node
              key={sub.id}
              node={sub}
            />
          ))}
          {node.branchMembers.map((branch) => (
            <Node
              key={branch.id}
              node={branch}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Node;