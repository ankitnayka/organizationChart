
import React, { createContext, useContext } from "react";

const NodeContext = createContext();

export const useNodeContext = () => useContext(NodeContext);

export default NodeContext;