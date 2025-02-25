import { configureStore } from "@reduxjs/toolkit";
import orgChartSlice from "../features/orgChartSlice ";

export default configureStore({
  reducer: {
    orgChart: orgChartSlice, 
  },
});