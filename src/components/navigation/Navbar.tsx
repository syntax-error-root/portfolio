import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
}

export function Navbar({ onToggleTerminal, isTerminalOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeUTC, setTimeUTC] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUTC(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: '[01] OVERVIEW', href: '#hero' },
    { label: '[02] SPECS', href: '#about' },
    { label: '[03] MATRIX', href: '#expertise' },
    { label: '[04] DEPLOYMENTS', href: '#projects' },
    { label: '[05] LAB', href: '#architecture' },
    { label: '[06] CONTACT', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c] border-b border-[#1e242f]">
      {/* Top Telemetry Ticker Strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-[#101216] border-b border-[#1e242f] text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 bg-emerald-400"></span>
            SYS_ONLINE // 99.99% PROD
          </span>
          <span className="text-slate-600">|</span>
          <span>LOCATION: 24.8465° N, 89.3777° E (BD)</span>
          <span className="text-slate-600">|</span>
          <span>CLUSTER: SRE-NODE-01</span>
        </div>
        <div className="flex items-center gap-4 font-mono">
          <span>{timeUTC}</span>
          <span className="text-red-500 font-bold">SEC_LEVEL: 0</span>
        </div>
      </div>

      {/* Main Tactical Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Brand Unit Tag */}
        <a href="#hero" className="flex items-center gap-3 font-mono text-xs tracking-wider">
          <span className="px-2 py-0.5 bg-red-600 text-white font-bold tracking-widest text-[10px]">
            UNIT / D-01
          </span>
          <span className="text-white font-bold tracking-tight">OMIK.SYS</span>
          <span className="text-slate-500 hidden sm:inline">[PLATFORM ARCHITECT]</span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-[#13171e] transition-colors border-r border-[#1e242f] last:border-r-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={onToggleTerminal}
            className={`flex items-center gap-2 px-3 py-1 border transition-all ${
              isTerminalOpen
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-[#101216] border-[#1e242f] text-slate-300 hover:border-slate-500'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-red-500" />
            <span className="hidden sm:inline">CONSOLE</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:flex items-center gap-1 px-3 py-1 bg-white text-black font-bold uppercase hover:bg-slate-200 transition-colors"
          >
            TRANSMIT
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white border border-[#1e242f]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0c] border-b border-[#1e242f] p-4 flex flex-col gap-2 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 text-slate-300 hover:bg-[#13171e] border-b border-[#1e242f] last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
