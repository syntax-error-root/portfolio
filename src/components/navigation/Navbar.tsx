import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Activity, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
}

export function Navbar({ onToggleTerminal, isTerminalOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture Lab', href: '#architecture' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Callout */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-white font-mono text-sm tracking-wider font-bold group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"></span>
          <span className="text-sky-400 group-hover:text-white transition-colors">OMIK</span>
          <span className="text-white/40">::</span>
          <span className="text-white/80 font-normal">DEVOPS.SYS</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-slate-400 hover:text-sky-400 transition-colors font-mono"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* CLI Terminal Toggle */}
          <button
            onClick={onToggleTerminal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
              isTerminalOpen
                ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
            }`}
            title="Toggle System CLI Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">CLI_CONSOLE</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:flex items-center gap-1 px-4 py-1.5 rounded-md bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Deploy Contact
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090e]/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono tracking-widest text-slate-300 hover:text-sky-400 py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-2 bg-sky-500 text-black font-bold text-xs uppercase tracking-wider rounded"
          >
            Deploy Contact
          </a>
        </div>
      )}
    </header>
  );
}
