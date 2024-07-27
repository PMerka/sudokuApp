import { useEffect, useState } from "react";
import { Grid, GridUpdates } from "./useGridReducer";

const testWorker = new Worker(new URL("./webworker.ts", import.meta.url), {
  type: "module",
});

const useCalculation = (state: Grid, gridUpdates: GridUpdates) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (loading) {
      return;
    }
    testWorker.postMessage("RUN");
    setLoading(true);
    testWorker.onmessage = (e: { data: Grid }) => {
      gridUpdates.setGrid(e.data);
      setLoading(false);
    };
  };
};
export default useCalculation;
