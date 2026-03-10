import { DownloadIcon } from "lucide-react";
import { WindowControls } from "../components";
import WindowWrapper from "../components/hoc/WindowWrapper";

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href="/files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <DownloadIcon className="icon" />
        </a>
      </div>
      <iframe
        src="/files/resume.pdf"
        title="Resume PDF"
        className="w-[820px] h-[70vh] bg-white"
      />
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
