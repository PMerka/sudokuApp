import Box from "../Box/Box";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import useGridReducer from "../../hooks/useGridReducer";

export default function Main() {
  const [state, gridUpdates] = useGridReducer();

  return (
    <div className="container m-auto grid grid-cols-5 px-5 xlg:px-20 ">
      <Box className="col-span-5 lg:col-span-5">
        Main setting Puzzle solver Puzzle generator
      </Box>
      <Box className="col-span-5 lg:col-span-3 aspect-square">
        <SudokuGrid data={state} gridUpdates={gridUpdates} />
      </Box>
      <Box className=" col-span-5 lg:col-span-2 min-h-60">
        Controls
        <button>Start</button>
      </Box>
    </div>
  );
}
