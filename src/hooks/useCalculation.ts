import { useState } from "react";
import { Grid, GridUpdates } from "./useGridState";

let sudokuWebWorker = new Worker(new URL("./webworker.ts", import.meta.url), {
  type: "module",
});

const useCalculation = (state: Grid, gridUpdates: GridUpdates) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (loading) {
      return;
    }
    sudokuWebWorker.postMessage({ type: "RUN", arg: null });
    setLoading(true);
    sudokuWebWorker.onmessage = (e: { data: number[][] }) => {
      const newGrid = e.data?.map((row) =>
        row.map((value) => {
          if (value === 0) {
            return { isInit: false, value };
          }
          return { isInit: true, value };
        })
      );
      gridUpdates.setGrid(newGrid);
      setLoading(false);
    };
  };

  const handleSolve = () => {
    if (loading) {
      return;
    }
    const grid = state.map((row) =>
      row.map((cell) => (cell.isInit ? cell.value : 0))
    );
    sudokuWebWorker.postMessage({ type: "SOLVE", arg: grid });
    setLoading(true);
    sudokuWebWorker.onmessage = (e: { data: number[][] }) => {
      const newGrid = state.map((row, y) =>
        row.map((cell, x) => {
          if (cell.isInit === false) {
            return { isInit: false, value: e.data[y][x] };
          }
          return { isInit: true, value: cell.value };
        })
      );
      gridUpdates.setGrid(newGrid);
      setLoading(false);
    };
  };

  const handleTerminate = () => {
    sudokuWebWorker.terminate();
    setLoading(false);
    sudokuWebWorker = new Worker(new URL("./webworker.ts", import.meta.url), {
      type: "module",
    });
  };

  const clearGrid = () => {
    gridUpdates.clearGrid();
  };

  const handlers = {
    handleGenerate,
    handleSolve,
    handleTerminate,
    clearGrid,
  };

  return { loading, handlers } as const;
};

export default useCalculation;
