// components/NodeProvider.js
import React, { useState } from "react";
import NodeContext from "../context/NodeContext";

export const NodeProvider = ({ children }) => {
  const [nodes, setNodes] = useState([
    { id: 1, name: "Director", path: "1", subordinates: [], branchMembers: [], expanded: true, isBranchMember: false },
  ]);

  const addSubordinate = (parentId, parentPath) => {
    setNodes((prevNodes) => {
      const newNodes = JSON.parse(JSON.stringify(prevNodes));

      const findNode = (nodes) => {
        for (let node of nodes) {
          if (node.id === parentId) {
            let newIndex = node.subordinates.length + 1;
            let newPath = parentPath ? `${parentPath}/${newIndex}` : `${newIndex}`;
            let newName = `Subordinate ${newPath}`;

            const newSubordinate = {
              id: Date.now(),
              name: newName,
              path: newPath,
              subordinates: [],
              branchMembers: [],
              expanded: true,
              isBranchMember: false,
            };

            node.subordinates.push(newSubordinate);
            return;
          }
          findNode(node.subordinates);
          findNode(node.branchMembers);
        }
      };

      findNode(newNodes);
      return [...newNodes];
    });
  };

  const addBranchMember = (parentId, parentPath) => {
    setNodes((prevNodes) => {
      const newNodes = JSON.parse(JSON.stringify(prevNodes));

      const findNode = (nodes) => {
        for (let node of nodes) {
          if (node.id === parentId) {
            let newIndex = node.branchMembers.length + 1;
            let newPath = parentPath ? `${parentPath}/${newIndex}` : `${newIndex}`;
            let newName = `Branch Member ${newPath}`;

            const newBranch = {
              id: Date.now(),
              name: newName,
              path: newPath,
              subordinates: [],
              branchMembers: [],
              expanded: true,
              isBranchMember: true,
            };

            node.branchMembers.push(newBranch);
            return;
          }
          findNode(node.subordinates);
          findNode(node.branchMembers);
        }
      };

      findNode(newNodes);
      return [...newNodes];
    });
  };

  const removeNode = (nodeId) => {
    setNodes((prevNodes) => {
      const removeRecursive = (nodes) => {
        return nodes.filter((node) => {
          if (node.id === nodeId) return false;
          node.subordinates = removeRecursive(node.subordinates);
          node.branchMembers = removeRecursive(node.branchMembers);
          return true;
        });
      };
      return removeRecursive(prevNodes);
    });
  };

  return (
    <NodeContext.Provider value={{ nodes, addSubordinate, addBranchMember, removeNode }}>
      {children}
    </NodeContext.Provider>
  );
};