import { useState } from "react";

export interface Cell {
  value: number;
  isInit: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface Grid extends Array<Array<Cell>> {}

const getInitGrid = () => {
  const grid: { value: number; isInit: boolean }[][] = [];
  for (let y = 0; y < 9; y += 1) {
    const row = new Array(9).fill({ value: 0, isInit: false });
    grid.push(row);
  }
  return grid;
};

export interface UpdateSingleCellArgs {
  value: number | string;
  isInit: boolean;
}

export interface GridUpdates {
  clearGrid: () => void;
  updateSingleCell: (newValue: Cell, position: Position) => void;
  setGrid: (grid: Grid) => void;
}

const initValue = getInitGrid();

const useGridReducer = () => {
  const [gridState, setGridState] = useState(initValue);

  const updates = {
    clearGrid: () => {
      setGridState(initValue);
    },
    updateSingleCell: (newValue: Cell, position: Position) => {
      const newGridState = structuredClone(gridState);
      newValue.value = Number(newValue.value);
      if (
        Number.isNaN(newValue.value) ||
        newValue.value > 9 ||
        newValue.value < 0
      ) {
        return;
      }
      const { x, y } = position;
      newGridState[y][x] = newValue;
      setGridState(newGridState);
    },
    setGrid: (newGrid: Grid) => {
      setGridState(newGrid);
    },
  };

  return [gridState, updates] as const;
};

export default useGridReducer;
