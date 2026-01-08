import { SearchIcon } from "lucide-react";
import { WindowControls } from "../components";
import WindowWrapper from "../components/hoc/WindowWrapper";
import { locations, type WorkLocationType } from "../constants";
import useLocationStore, {
  type ActiveItem,
  type LocationType,
} from "../components/store/location";
import clsx from "clsx";
import useWindowStore from "../components/store/window";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  type ExtendedTypes = {
    href?: string;
    fileType?: string;
  };

  const openItem = (item: ActiveItem & ExtendedTypes ) => {
    if (item) {
      if (item.fileType === "pdf") return openWindow("resume");

      if (
        "href" in item &&
        ["fig", "url"].includes(item.fileType as string) &&
        item.href
      ) {
        return window.open(item.href, "_blank");
      }

      if (item.kind === "folder") return setActiveLocation(item);

      openWindow(
        `${item.fileType}${item.kind}` as
          | "finder"
          | "contact"
          | "resume"
          | "safari"
          | "photos"
          | "terminal"
          | "txtfile"
          | "imgfile",
        item
      );
    }
  };

  const renderList = (
    name: string,
    items: LocationType[] | WorkLocationType
  ) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation?.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} alt={item.name} className="w-4" />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <SearchIcon className="icon" />
      </div>
      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>
        <ul className="content">
          {activeLocation &&
            "children" in activeLocation &&
            activeLocation?.children.map((item) => (
              <li
                key={item.id}
                className={"position" in item ? item.position : ""}
                onClick={() => openItem(item)}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
