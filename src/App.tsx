import gsap from "gsap";
import { Draggable } from "gsap/all";

import { Dock, Navbar, Welcome } from "./components";
import { Finder, Image, Resume, Safari, Terminal, TextWindow } from "./windows";
import { Contact } from "lucide-react";

gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <TextWindow />
      <Image />
      <Contact />
    </main>
  );
}

export default App;
