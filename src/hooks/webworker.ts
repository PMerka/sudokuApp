import { SudokuGenerator } from "../sudokuLogic/SudokuGenerator";

self.onmessage = (e: MessageEvent<{ type: string; arg: number[][] }>) => {
  console.log(e.data.type);
  const sudokuGenerator = new SudokuGenerator();
  if (e.data.type === "SOLVE") {
    const resp = sudokuGenerator.findSudokuSolution(e.data.arg);
    self.postMessage(resp);
  }
  if (e.data.type === "RUN") {
    const resp = sudokuGenerator.generatePuzzle();
    self.postMessage(resp);
  }
};
