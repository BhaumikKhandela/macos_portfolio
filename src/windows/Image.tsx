import { WindowControls } from "../components";
import WindowWrapper from "../components/hoc/WindowWrapper";
import useWindowStore from "../components/store/window";

const ImageWindowContent = () => {
  interface ImageWindowData {
    name: string;
    imageUrl: string;
  }
  const { windows } = useWindowStore();
  const rawData = windows.imgfile?.data;

  if (!rawData) return null;

  const data = rawData as ImageWindowData;
  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5 bg-white">
        {imageUrl ? (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(ImageWindowContent, "imgfile");

export default ImageWindow;
