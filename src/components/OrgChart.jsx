import React, { useState } from "react";

const Node = ({ node, addSubordinate, removeNode, addBranchMember }) => {
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
              addSubordinate={addSubordinate}
              removeNode={removeNode}
              addBranchMember={addBranchMember}
            />
          ))}
          {node.branchMembers.map((branch) => (
            <Node
              key={branch.id}
              node={branch}
              addSubordinate={addSubordinate}
              removeNode={removeNode}
              addBranchMember={addBranchMember}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const OrgChart = () => {
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
    <div className="p-5 border-2">
      {nodes.map((node) => (
        <Node 
          key={node.id}
          node={node}
          addSubordinate={addSubordinate}
          removeNode={removeNode}
          addBranchMember={addBranchMember}
        />
      ))}
    </div>
  );
};

export default OrgChart;