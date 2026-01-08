import gsap from "gsap";
import { Draggable } from "gsap/all";

import { Dock, Navbar, Welcome } from "./components";
import { Contact, Finder, Image, Resume, Safari, Terminal, TextWindow } from "./windows";


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
