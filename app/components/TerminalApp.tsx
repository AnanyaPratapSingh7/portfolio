'use client';

import { useEffect, useRef, useState } from 'react';

interface FileSystemNode {
  name: string;
  type: 'dir' | 'file';
  children?: FileSystemNode[];
}

export default function TerminalApp({ onExit }: { onExit?: () => void }) {
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState<string[]>(['home', 'ananya']);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prompt = 'ananya@hyprland';

  const fs: FileSystemNode = {
    name: '/',
    type: 'dir',
    children: [
      { name: 'home', type: 'dir', children: [
        { name: 'ananya', type: 'dir', children: [
          { name: 'projects', type: 'dir' },
          { name: 'notes.txt', type: 'file' }
        ]}
      ]},
      { name: 'etc', type: 'dir' },
      { name: 'var', type: 'dir' }
    ]
  };

  const resolvePath = (cwd: string[], node: FileSystemNode): FileSystemNode | null => {
    let current: FileSystemNode | undefined = node;
    for (const part of cwd) {
      current = current.children?.find(child => child.name === part && child.type === 'dir');
      if (!current) return null;
    }
    return current;
  };

  const handleCommand = (raw: string) => {
    const command = raw.trim();
    const parts = command.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    const currentDir = resolvePath(cwd, fs);
    let output: string[] = [];

    switch (cmd) {
      case 'whoami':
        output.push('ananya');
        break;
      case 'help':
        output.push('Available commands: whoami, help, clear, exit, ls, cd, echo, neofetch');
        break;
      case 'clear':
        setLog([]);
        return;
      case 'exit':
        output.push('logout');
        if (onExit) setTimeout(onExit, 300);
        break;
      case 'ls':
        output.push(
          currentDir?.children?.map(child => child.name).join('  ') || ''
        );
        break;
      case 'cd':
        const target = args[0];
        if (!target || target === '~') {
          setCwd(['home', 'ananya']);
        } else if (target === '..') {
          setCwd(prev => prev.slice(0, -1));
        } else {
          const newPath = [...cwd, target];
          const dest = resolvePath(newPath, fs);
          if (dest) setCwd(newPath);
          else output.push(`cd: no such file or directory: ${target}`);
        }
        break;
      case 'echo':
        output.push(args.join(' '));
        break;
      case 'neofetch':
        output.push(
          'ananya@hyprland',
          '----------------------------',
          'OS: HyprlandOS (Simulated)',
          'Kernel: 6.9.0-ananya',
          'Shell: react-bash',
          'Uptime: ∞',
          'Packages: 1337 (pacman)',
          'Terminal: WebTerm',
          'WM: Hyprland',
          '----------------------------'
        );
        break;
      case '':
        break;
      default:
        output.push(`${cmd}: command not found`);
    }

    const fullPrompt = `${prompt}:${cwd.length ? '/' + cwd.join('/') : ''}$`;
    setLog(prev => [...prev, `${fullPrompt} ${command}`, ...output]);
    setInput('');
    setHistory(prev => [...prev, command]);
    setHistoryIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      setHistoryIndex(prev => {
        const newIndex = prev === null ? history.length - 1 : Math.max(prev - 1, 0);
        setInput(history[newIndex] || '');
        return newIndex;
      });
    } else if (e.key === 'ArrowDown') {
      setHistoryIndex(prev => {
        if (prev === null) return null;
        const newIndex = Math.min(prev + 1, history.length);
        setInput(history[newIndex] || '');
        return newIndex === history.length ? null : newIndex;
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [log]);

  const fullPrompt = `${prompt}:${cwd.length ? '/' + cwd.join('/') : ''}$`;

  return (
    <div
      className="bg-black/50 text-green-400 p-3 rounded-xl h-full font-mono overflow-y-auto text-sm"
      ref={scrollRef}
    >
      {log.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
      <div className="flex">
        <span className="mr-1 whitespace-nowrap">{fullPrompt}</span>
        <input
          className="bg-transparent border-none outline-none flex-1 text-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
}
