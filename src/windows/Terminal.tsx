import { CheckIcon, FlagIcon } from "lucide-react";
import WindowWrapper from "../components/hoc/WindowWrapper";
import { techStack } from "../constants";
import { WindowControls } from "../components";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal"/>
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@bhaumik % </span>
          show tech stack
        </p>
        <div className="label">
          <p className="w-32">Category </p>
          <p>Technologies</p>
        </div>
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <CheckIcon className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="footnote">
          <p>
            <CheckIcon size={20} /> {techStack.length} of {techStack.length}{" "}
            stacks loaded successfully (100%)
          </p>
          <p className="text-black">
            <FlagIcon size={15} fill="black" />
            Render time: 6ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
