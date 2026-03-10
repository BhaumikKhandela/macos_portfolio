import gsap from "gsap";
import { Draggable } from "gsap/all";

import { Dock, Home, Navbar, Welcome } from "./components";
import {
  Contact,
  Finder,
  GitHub,
  Image,
  Resume,
  Safari,
  Terminal,
  TextWindow,
} from "./windows";


gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Home />
      
      <Terminal />
      <Safari />
      <GitHub />
      <Resume />
      <Finder />
      <TextWindow />
      <Image />
      <Contact />
    </main>
  );
}

export default App;
