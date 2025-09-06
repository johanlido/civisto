'use client';

import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  CpuChipIcon, 
  CommandLineIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  RocketLaunchIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function SetupPage() {
  const platforms = [
    {
      name: 'macOS',
      icon: '📱',
      requirements: [
        'macOS 10.15+ (Catalina or later)',
        'Node.js 18+ (via Homebrew)',
        'Python 3.8+ (built-in or via Homebrew)',
        'Git (via Xcode Command Line Tools)',
        'Claude Desktop app'
      ],
      setupSteps: [
        'Install Homebrew: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
        'Install Node.js: brew install node',
        'Install Python: brew install python',
        'Install Git: xcode-select --install',
        'Download Claude Desktop from claude.ai'
      ]
    },
    {
      name: 'Windows',
      icon: '🪟',
      requirements: [
        'Windows 10/11',
        'Node.js 18+ (from nodejs.org)',
        'Python 3.8+ (from python.org)',
        'Git (from git-scm.com)',
        'Claude Desktop app'
      ],
      setupSteps: [
        'Download and install Node.js from nodejs.org',
        'Download and install Python from python.org',
        'Download and install Git from git-scm.com',
        'Download Claude Desktop from claude.ai',
        'Enable PowerShell execution: Set-ExecutionPolicy RemoteSigned'
      ]
    },
    {
      name: 'Linux',
      icon: '🐧',
      requirements: [
        'Ubuntu 20.04+ / Debian 10+ / CentOS 8+',
        'Node.js 18+ (via package manager)',
        'Python 3.8+ (usually pre-installed)',
        'Git (via package manager)',
        'Claude web interface (no desktop app)'
      ],
      setupSteps: [
        'Update packages: sudo apt update && sudo apt upgrade',
        'Install Node.js: curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs',
        'Install Python: sudo apt install python3 python3-pip',
        'Install Git: sudo apt install git',
        'Use Claude web interface at claude.ai'
      ]
    }
  ];

  const quickCommands = [
    {
      title: 'Clone Template',
      command: 'git clone https://github.com/johanlido/Synaptic.git',
      description: 'Download the synaptic to your local machine'
    },
    {
      title: 'Navigate to Directory',
      command: 'cd ai-mcp-template',
      description: 'Enter the template directory'
    },
    {
      title: 'Run Interactive Setup',
      command: './scripts/interactive-setup.sh',
      description: 'Start the guided setup wizard (macOS/Linux)'
    },
    {
      title: 'Windows Setup',
      command: '.\\scripts\\setup.bat',
      description: 'Run setup script for Windows users'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <CpuChipIcon className="h-8 w-8 text-green-400" />
            <span className="text-xl font-bold text-white">synaptic</span>
          </div>
          <Link 
            href="https://github.com/johanlido/Synaptic" 
            className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-900/20 border border-green-500/30 rounded-full text-green-300 text-sm mb-8">
            <ClockIcon className="h-4 w-4 mr-2" />
            Setup Time: 15 Minutes
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Setup Guide
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get your AI development environment up and running in just 15 minutes with our interactive setup wizard
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              🚀 Quick Start (Recommended)
            </h2>
            <p className="text-gray-400">
              The fastest way to get started with the synaptic
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {quickCommands.map((cmd, index) => (
              <div key={index} className="bg-black rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{cmd.title}</h3>
                </div>
                <div className="bg-gray-900 rounded p-3 mb-3">
                  <code className="text-green-400 font-mono text-sm">{cmd.command}</code>
                </div>
                <p className="text-gray-500 text-sm">{cmd.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="https://github.com/johanlido/Synaptic"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center"
              target="_blank"
            >
              Use This Template
              <RocketLaunchIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Platform-Specific Setup */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Platform-Specific Setup
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{platform.icon}</div>
                  <h3 className="text-2xl font-bold text-white">{platform.name}</h3>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {platform.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="text-gray-400 text-sm flex items-start">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <CommandLineIcon className="h-5 w-5 text-blue-400 mr-2" />
                    Setup Steps
                  </h4>
                  <div className="space-y-3">
                    {platform.setupSteps.map((step, stepIndex) => (
                      <div key={stepIndex} className="bg-gray-800 rounded p-3">
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                            {stepIndex + 1}
                          </div>
                        </div>
                        <code className="text-green-400 font-mono text-xs block pl-9">{step}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Process */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Interactive Setup Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Prerequisites Check</h3>
              <p className="text-gray-400 text-sm">
                Validates Node.js, Python, Git, and Claude Desktop installation
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Component Selection</h3>
              <p className="text-gray-400 text-sm">
                Choose which MCP servers to install (Perplexity, Automation, Figma)
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Configuration</h3>
              <p className="text-gray-400 text-sm">
                Sets up environment variables and Claude Desktop integration
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Health Check</h3>
              <p className="text-gray-400 text-sm">
                Verifies installation and provides troubleshooting guidance
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-xl p-8">
          <div className="flex items-center mb-6">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl font-bold text-white">Need Help?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Common Issues</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Permission denied:</strong> Grant Full Disk Access to Terminal (macOS)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Command not found:</strong> Ensure Node.js and Python are in PATH</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>MCP not detected:</strong> Restart Claude Desktop after configuration</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Get Support</h3>
              <div className="space-y-3">
                <Link 
                  href="https://github.com/johanlido/Synaptic/blob/v1/docs/guides/troubleshooting.md"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                  target="_blank"
                >
                  <span className="text-white">📖 Comprehensive Troubleshooting Guide</span>
                  <ArrowLeftIcon className="h-4 w-4 text-gray-400 group-hover:text-white ml-auto rotate-180" />
                </Link>
                <Link 
                  href="https://github.com/johanlido/Synaptic/issues"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                  target="_blank"
                >
                  <span className="text-white">🐛 Report Issues on GitHub</span>
                  <ArrowLeftIcon className="h-4 w-4 text-gray-400 group-hover:text-white ml-auto rotate-180" />
                </Link>
                <Link 
                  href="https://github.com/johanlido/Synaptic/discussions"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                  target="_blank"
                >
                  <span className="text-white">💬 Community Discussions</span>
                  <ArrowLeftIcon className="h-4 w-4 text-gray-400 group-hover:text-white ml-auto rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <CpuChipIcon className="h-6 w-6 text-green-400" />
            <span className="text-white font-semibold">synaptic</span>
          </div>
          <div className="flex items-center space-x-6 text-gray-400 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/docs" className="hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="https://github.com/johanlido/Synaptic" className="hover:text-white transition-colors" target="_blank">
              GitHub
            </Link>
            <span>© 2024 synaptic</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

