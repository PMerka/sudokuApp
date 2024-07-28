import { MODE } from "../Main/Main";

export default function ToggleOptions({
  active,
  setOption,
}: {
  active: string;
  setOption: (value: string) => void;
}) {
  const optionsList = Object.keys(MODE);
  const optionNumber = optionsList.indexOf(active);
  const optionsLength = optionsList.length;
  return (
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
  );
}
