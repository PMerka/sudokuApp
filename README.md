# Sudoku Solver and Generator

This GitHub project is a web-app Sudoku tool that includes both a solver and a generator. The generator can create Sudoku grids with only one solution and ensure that they contain the minimal number of clues for an added challenge. The solver finds solutions to any valid Sudoku puzzle.

The web workers are used for the computational heavy task of solving and creating sudoku puzzles. This way the calculation runs in separated background thread and doesn't block UI.
