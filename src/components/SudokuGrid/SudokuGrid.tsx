import { Grid, GridUpdates } from "../../hooks/useGridReducer";
import Cell from "./Cell/Cell";
import Row from "./Row/Row";
import { useGridFocus } from "./UseGridFocus";

export default function SudokuGrid({
  data,
  gridUpdates,
}: {
  data: Grid;
  gridUpdates: GridUpdates;
}) {
  const gridSize = data.length * data[0].length;
  const [cellRefs, focusHandler, keyDownHandler] = useGridFocus(gridSize);
  return (
    <div className="flex flex-col h-full border-solid border-gray-400 border-4">
      {data.map((row, y) => (
        <Row>
          {row.map((cell, x) => (
            <Cell
              inputRefs={(el) => {
                const pos = 9 * y + x;
                if (el) cellRefs.current[pos] = el;
              }}
              position={{ x, y }}
              value={cell.value}
              isInit={cell.isInit}
              onKeyDown={(e) => keyDownHandler(e)}
              onFocus={() => focusHandler({ x, y })}
              onChange={(e) => {
                console.log(e.target.value);
                gridUpdates.updateSingleCell(
                  { value: Number(e.target.value), isInit: true },
                  { x, y }
                );
              }}
            ></Cell>
          ))}
        </Row>
      ))}
    </div>
  );
}
