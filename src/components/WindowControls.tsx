import type { WindowConfigKeyType } from "./store/window";
import useWindowStore from "./store/window";

export const WindowControls = ({ target }: { target: WindowConfigKeyType }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};
