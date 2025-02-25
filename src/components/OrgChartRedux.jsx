import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBranchMember,
  addSubordinate,
  removeNode,
} from "../features/orgChartSlice ";

const Node = ({ node, addSubordinate, addBranchMember, removeNode }) => {
  return (
    <div className="border p-2 rounded-lg shadow-lg bg-white text-center mt-2">
      <div className="flex justify-between items-center">
        <span
          onClick={() =>
            addSubordinate({ parentId: node.id, parentPath: node.path })
          }
          className="cursor-pointer font-semibold"
        >
          {node.name}
        </span>
        <div className="space-x-2">
            {
                !node.isBranchMember && (
                    <button 
                            onClick={()=>addBranchMember({parentId:node.id,path:node.path})}
                    className="bg-green-500 rounded-lg text-white px-2">
                        +
                    </button>
              )}
            <button
                className="bg-blue-500 text-white rounded-lg text-white px-2"
                onClick={()=>addBranchMember({parentId:node.id,parentPath:node.path})}
            >Branch 
            </button>
            {
                node.id !==1 &&(
                    <button  className="bg-red-500 text-white rounded-xl"
                    onClick={()=>removeNode({nodeId:node.id})}
                    >
                    -
                    </button>
                )
            }
            
        </div>
      </div>
      {
        node.expanded && (
            <div className="ml-4 border-1 mt-2 pl-4">
                {node.subordinates.map((sub)=>(
                    <Node key={sub.id}
                            node={node}
                            addSubordinate={addSubordinate}
                            removeNode={removeNode}
                            addBranchMember={addBranchMember}
                    />
                ))}
                {
                    node.branchMembers.map((branch)=>(
                        <Node key={branch.id} node={branch}
                                addBranchMember={addBranchMember}
                                removeNode={removeNode}
                                addSubordinate={addSubordinate}
                         />
                    ))
                }
            </div>
        )
      }
    </div>
  );
};


const OrgChartRedux=()=>{
    const nodes=useSelector((state)=>state.orgChart.nodes)
    const dispatch=useDispatch()
    return (
        <div className="p-5 border-2">
          {nodes.map((node) => (
            <Node 
              key={node.id}
              node={node}
              addSubordinate={(payload) => dispatch(addSubordinate(payload))}
              removeNode={(payload) => dispatch(removeNode(payload))}
              addBranchMember={(payload) => dispatch(addBranchMember(payload))}
            />
          ))}
        </div>
      );
}

export default OrgChartRedux