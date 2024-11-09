import Box from "../Box/Box";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import useGridState from "src/hooks/useGridState";
import useCalculation from "src/hooks/useCalculation";
import { useState } from "react";
import ToggleOptions from "../ToggleOptions/ToggleOptions";

export enum MODE {
  GENERATOR = "GENERATOR",
  SOLVER = "SOLVER",
}

export default function Main() {
  const [state, gridUpdates] = useGridState();
  const { loading, handlers } = useCalculation(state, gridUpdates);
  const [mode, setMode] = useState(MODE.GENERATOR);

  const handleRun = () => {
    if (mode === MODE.GENERATOR) {
      handlers.handleGenerate();
    }
    if (mode === MODE.SOLVER) {
      handlers.handleSolve();
    }
  };

  return (
    <div className="container m-auto grid grid-cols-5 px-5 xlg:px-20 text-blue-950">
      <Box className="col-span-5 lg:col-span-5 text-center">
        <h1 className="text-xl md:text-3xl font-bold ">
          Sudoku solver and puzzle generator
        </h1>
      </Box>
      <Box className="col-span-5 lg:col-span-3 aspect-square">
        <SudokuGrid data={state} gridUpdates={gridUpdates} />
      </Box>
      <Box className=" col-span-5 lg:col-span-2 min-h-60">
        <ToggleOptions
          active={mode}
          setOption={(value: string) => setMode(value as MODE)}
          mode={mode}
        />

        <div className="flex justify-center gap-3 flex-wrap px-4">
          <button
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-30 min-w-32"
            onClick={() => handleRun()}
          >
            {!loading ? "Start" : "Loading ..."}
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded min-w-32"
            onClick={() => handlers.handleTerminate()}
          >
            Stop
          </button>

          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded min-w-32"
            onClick={() => gridUpdates.clearGrid()}
          >
            Clear canvas
          </button>
        </div>
      </Box>
    </div>
  );
}
