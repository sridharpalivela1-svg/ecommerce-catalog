import React from 'react';
import { Database, Code2, Layers, Cpu } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Left Brand Summary */}
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">NexusStore E-Commerce Catalog</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed">
              A full-stack portfolio showcase featuring React, Tailwind CSS, PHP REST API with PDO security, MySQL Database, and dual-mode hybrid storage architecture.
            </p>
          </div>

          {/* Center Stack Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-indigo-300 border border-slate-700">
              <Code2 className="w-3.5 h-3.5" /> React + Vite
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-cyan-300 border border-slate-700">
              <Layers className="w-3.5 h-3.5" /> Tailwind CSS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-purple-300 border border-slate-700">
              <Cpu className="w-3.5 h-3.5" /> PHP 8.x REST API
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-emerald-300 border border-slate-700">
              <Database className="w-3.5 h-3.5" /> MySQL PDO
            </span>
          </div>

          {/* Right Links & Portfolio Notice */}
          <div className="text-right flex flex-col items-center md:items-end gap-1">
            <span className="text-xs text-slate-400 font-mono">Resume Portfolio Project</span>
            <p className="text-xs text-slate-500">
              Designed for Internship & Full-Stack Engineer Applications
            </p>
          </div>

        </div>

        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <span>&copy; {new Date().getFullYear()} NexusStore Catalog. All rights reserved.</span>
          <span className="text-slate-400 font-medium">Ready to push to GitHub</span>
        </div>
      </div>
    </footer>
  );
};
