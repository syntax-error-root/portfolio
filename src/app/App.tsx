import React, { useState } from 'react';
import { Navbar } from '../components/navigation/Navbar';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Expertise } from '../components/sections/Expertise';
import { Projects } from '../components/sections/Projects';
import { ArchitectureLab } from '../components/sections/ArchitectureLab';
import { Contact } from '../components/sections/Contact';
import { TerminalModal } from '../components/terminal/TerminalModal';

export function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 relative selection:bg-sky-400 selection:text-black">
      {/* Floating System Navigation Bar */}
      <Navbar
        isTerminalOpen={isTerminalOpen}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      <main>
        {/* Hero Section with Interactive 3D Real-time Construct */}
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* About Section with Topology Diagram */}
        <About />

        {/* Technical Capabilities Matrix */}
        <Expertise />

        {/* Production Case Studies */}
        <Projects />

        {/* Signature Interactive 3D Architecture Playground */}
        <ArchitectureLab />

        {/* Closing Contact & Operational Footer */}
        <Contact />
      </main>

      {/* Interactive Terminal CLI Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
