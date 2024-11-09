# Sudoku Solver and Generator

This GitHub project is a web-app Sudoku tool that includes both a solver and a generator. The generator can create Sudoku grids with only one solution and ensure that they contain the minimal number of clues for an added challenge. The solver finds solutions to any valid Sudoku puzzle.

The web worker is used for the computational heavy task of solving and creating sudoku puzzles. This way the calculation runs in separated background thread and doesn't block UI.

The solver part is the well known [backtracking algorithm](https://en.wikipedia.org/wiki/Sudoku_solving_algorithms). The generator process can be simplified to this:

1. create random sudoku grid (Use sudoku solver with empty cells. The cell order is random - this mean that it doesn't start from top left corner but based on list od randomly ordered cells)
2. create list of random positions
3. for every sudoku cell in the list, try to delete the number and check if the grid has still only one solution.
