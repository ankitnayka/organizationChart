import { createSlice } from "@reduxjs/toolkit";


const initialState={
    nodes:[
        {id:1,name:'Director',path:'1',subordinates:[],branchMembers:[],expanded:true,isBranchMember:false}
    ]
}


export const orgChartSlice =createSlice({
    name:'orgChart',
    initialState,
    reducers:{
        addSubordinate:(state,action)=>{
            const {parentId,parentPath}=action.payload;
            const findNode=(nodes)=>{
                for(let node of nodes){
                    if(node.id ===parentId){
                        let newIndex=node.subordinates.length+1;
                        let newPath=parentPath ? `${parentPath}/${newIndex}` : `${newIndex}`
                        let newName=`Subordinate ${newPath}`

                        const newSubordinate={
                            id:Date.now(),
                            name:newName,
                            subordinates:[],
                            branchMembers:[],
                            expanded:true,
                            isBranchMember:false
                        }
                        node.subordinates.push(newSubordinate);
                        return;
                    }
                    findNode(node.subordinates)
                    findNode(node.branchMembers)
                }
            }
            findNode(state.nodes)
        },
        addBranchMember:(state,action)=>{
            const {parentId,parentPath}=action.payload
            const findNode=(nodes)=>{
                    for(let node of nodes){
                        if(node.id ===parentId){
                            let newIndex=node.branchMembers.length+1;
                            let newPath=parentPath ?` ${parentPath}/${newIndex}`: `${newIndex}`
                            let newName=  `BranchMember ${newPath}`
                            
                            const newBranch={
                                id:Date.now(),
                                name:newName,
                                path:newPath,
                                subordinates:[],
                                branchMembers:[],
                                expanded:true,
                                isBranchMember:false
                            }
                            node.branchMembers.push(newBranch)
                            return;
                        }
                        findNode(node.subordinates)
                        findNode(node.branchMembers)
                    }
            }
            findNode(state.nodes)
        },
        removeNode:(state,action)=>{
            const {nodeId}=action.payload;
            const removeRecursive=(nodes)=>{
                return nodes.filter((node)=>{
                    if(node.id ===nodeId){
                        return false
                    }
                    node.subordinates=removeRecursive(node.subordinates)
                    node.branchMembers=removeRecursive(node.branchMembers)
                    return true
                })
            }
            state.nodes=removeRecursive(state.nodes)
        }
    }
})

export const {addBranchMember,addSubordinate,removeNode}=orgChartSlice.actions;
export default orgChartSlice.reducer