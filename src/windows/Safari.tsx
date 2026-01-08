import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  MoveRightIcon,
  PanelLeftIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  ShieldHalfIcon,
} from "lucide-react";
import { WindowControls } from "../components";
import WindowWrapper from "../components/hoc/WindowWrapper";
import { blogPosts } from "../constants";

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />
        <PanelLeftIcon className="ml-10" />
        <div className="flex items-center gap-1 ml-5">
          <ChevronLeftIcon className="icon" />
          <ChevronRightIcon className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalfIcon className="icon" />
          <div className="search">
            <SearchIcon className="icon" />

            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1"
            />
          </div>
        </div>
        <div className="flex items-center gap-5 ">
          <ShareIcon className="icon" />
          <PlusIcon className="icon" />
          <CopyIcon className="icon" />
        </div>
      </div>
      <div className="blog">
        <h2>My Developer Blog</h2>
        <div className="space-y-8">
          {blogPosts.map(({ id, title, image, link, date }) => (
            <div key={id} className="blog-post">
              <div className="col-span-2">
                <img src={image} alt={title} />
              </div>
              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Check out the full post{" "}
                  <MoveRightIcon className="icon-hover" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
