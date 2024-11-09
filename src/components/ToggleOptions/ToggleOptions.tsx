import { MODE } from "../Main/Main";

export default function ToggleOptions({
  active,
  setOption,
  mode,
}: {
  active: string;
  setOption: (value: string) => void;
  mode: MODE;
}) {
  const optionsList = Object.keys(MODE);
  const optionNumber = optionsList.indexOf(active);
  const optionsLength = optionsList.length;
  return (
    <>
      <div className="relative w-fit flex bg-blue-100 rounded m-auto">
        <div
          className={`absolute "left-0" translate-x-full
         bg-blue-600 h-full transition ease-in-out delay-150 rounded`}
          style={{
            width: `${100 / optionsLength}%`,
            transform: `translate(${optionNumber * 100}%, 0)`,
          }}
        ></div>
        {optionsList.map((option) => (
          <button
            onClick={() => setOption(option)}
            className={`${
              active === option && "text-white"
            } transition ease-in-out z-10 relative min-w-32 py-2 font-bold`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="text-center text-lg px-4 py-4 italic">
        {mode === MODE.SOLVER && "Find solution of any sudoku puzzle."}
        {mode === MODE.GENERATOR &&
          "Create Sudoku puzzles with single solution."}
      </div>
    </>
  );
}
