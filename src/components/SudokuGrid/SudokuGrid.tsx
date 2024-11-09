import { Grid, GridUpdates } from "../../hooks/useGridState";
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
        <Row key={y} id={`${y}`}>
          {row.map((cell, x) => (
            <Cell
              key={`${x} ${y}`}
              inputRefs={(el) => {
                const pos = 9 * y + x;
                if (el) cellRefs.current[pos] = el;
              }}
              position={{ x, y }}
              value={cell.value === 0 ? "" : cell.value}
              isInit={cell.isInit}
              onKeyDown={(e) => keyDownHandler(e)}
              onFocus={() => focusHandler({ x, y })}
              onChange={(e) => {
                const value = Number(e.target.value);
                const isInit = Boolean(value);
                gridUpdates.updateSingleCell({ value, isInit }, { x, y });
              }}
            ></Cell>
          ))}
        </Row>
      ))}
    </div>
  );
}
