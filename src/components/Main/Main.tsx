import Box from "../Box/Box";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import useGridReducer from "../../hooks/useGridState";
import useCalculation from "../../hooks/useCalculation";
import { useState } from "react";
import ToggleOptions from "../ToggleOptions/ToggleOptions";

export enum MODE {
  SOLVER = "SOLVER",
  GENERATOR = "GENERATOR",
}

export default function Main() {
  const [state, gridUpdates] = useGridReducer();
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
        />

        <div className="text-center text-lg px-4 py-4 italic">
          {mode === MODE.SOLVER && "Find solution of any sudoku puzzle."}
          {mode === MODE.GENERATOR &&
            "Create Sudoku puzzles with single solution."}
        </div>
        <div className="flex justify-center">
          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-30 min-w-32"
            onClick={() => handleRun()}
          >
            {!loading ? "Start" : "Loading ..."}
          </button>
        </div>
      </Box>
    </div>
  );
}
