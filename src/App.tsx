import gsap from "gsap";
import  {Draggable}  from "gsap/all";

import { Dock, Navbar, Welcome } from "./components"
import { Terminal } from "./windows";

gsap.registerPlugin(Draggable);

function App() {
  
  return (
   <main>
    <Navbar />
    <Welcome />
    <Dock />

    <Terminal />
   </main>
  )
}

export default App
