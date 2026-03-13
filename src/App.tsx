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
import MobileShell from "./mobile/MobileShell";

gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <Navbar />

      {/* Desktop / tablet experience */}
      <div className="hidden sm:block">
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
      </div>

      {/* iPhone-style mobile shell */}
      <MobileShell />
    </main>
  );
}

export default App;
