'use client';

import Link from 'next/link';
import { ArrowRightIcon, CheckIcon, RocketLaunchIcon, CpuChipIcon, ShieldCheckIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CpuChipIcon className="h-8 w-8 text-green-400" />
            <Link href="/" className="text-xl font-bold text-white">Synaptic</Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="/personalities" className="text-gray-300 hover:text-white transition-colors">
              AI Personalities
            </Link>
            <Link href="/workflows" className="text-gray-300 hover:text-white transition-colors">
              Workflows
            </Link>
            <Link href="/setup" className="text-gray-300 hover:text-white transition-colors">
              Setup Guide
            </Link>
            <Link 
              href="https://github.com/johanlido/Synaptic" 
              className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              target="_blank"
            >
              GitHub
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-gray-800">
            <div className="px-6 py-4 space-y-4">
              <Link 
                href="/docs" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link 
                href="/personalities" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Personalities
              </Link>
              <Link 
                href="/workflows" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Workflows
              </Link>
              <Link 
                href="/setup" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Setup Guide
              </Link>
              <Link 
                href="https://github.com/johanlido/Synaptic" 
                className="block bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-center"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
              >
                GitHub
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-gray-300 text-sm mb-8">
              <CpuChipIcon className="h-4 w-4 mr-2" />
              🌟 Open Source • Community-Driven • AI Personality Intelligence
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Intelligent AI
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                {' '}Orchestration
              </span>
              <br />
              for Developers
            </h1>
            
            <p className="text-xl text-gray-400 mb-6 max-w-3xl mx-auto leading-relaxed">
              Transform your development workflow with AI personality intelligence. Based on empirical analysis of 4,442+ coding tasks, 
              Synaptic automatically selects optimal AI models and applies personality-aware guardrails for superior code quality.
            </p>

            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-green-300 font-semibold mb-2">🚀 100% Open Source & Free Forever</p>
              <p className="text-gray-300 text-sm">
                MIT Licensed • Community contributions welcome • Built by developers, for developers
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                href="/setup"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center"
              >
                Get Started in 15 Minutes
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
              <Link 
                href="https://github.com/johanlido/Synaptic"
                className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-gray-900 inline-flex items-center"
                target="_blank"
              >
                ⭐ Star on GitHub
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50-80%</div>
                <div className="text-gray-400">Faster Design-to-Code</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">21%</div>
                <div className="text-gray-400">Faster Task Completion</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">6+</div>
                <div className="text-gray-400">Tools Unified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative px-6 py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need for AI-Assisted Development
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A complete ecosystem of AI tools working together seamlessly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-colors">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CpuChipIcon className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Claude Desktop Integration</h3>
              <p className="text-gray-400 mb-4">
                Seamless integration with Claude Desktop and MCP servers for intelligent code generation and research.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-400">
                  <CheckIcon className="h-4 w-4 text-green-400 mr-2" />
                  Perplexity MCP for research
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <CheckIcon className="h-4 w-4 text-green-400 mr-2" />
                  Automation MCP for workflows
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <CheckIcon className="h-4 w-4 text-green-400 mr-2" />
                  Figma MCP for design-to-code
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Enterprise Security</h3>
              <p className="text-gray-400 mb-4">
                Built-in security best practices, API key management, and compliance-ready configurations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-400">
                  <CheckIcon className="h-4 w-4 text-green-400 mr-2" />
                  Secure API key management
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <CheckIcon className="h-4 w-4 text-green-400 mr-2" />
                  WCAG 2.1 AA compliance
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <CheckIcon className="h-4 w-4 text-green-400 mr-2" />
                  Security audit logging
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 transition-colors">
              <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <RocketLaunchIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Zero Configuration</h3>
              <p className="text-gray-400 mb-4">
                Interactive setup wizard with platform detection and automated configuration for all environments.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-400">
                  <CheckIcon className="h-4 w-4 text-green-400 mr-2" />
                  Interactive setup wizard
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <CheckIcon className="h-4 w-4 text-green-400 mr-2" />
                  Platform-specific guides
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <CheckIcon className="h-4 w-4 text-green-400 mr-2" />
                  Health checks & validation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="relative px-6 py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              🌟 Join Our Open Source Community
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Synaptic is built by developers, for developers. Every contribution matters, from code to documentation, 
              bug reports to feature ideas. Together, we&apos;re shaping the future of AI-assisted development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-black/40 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-3">All Contributors Welcome</h3>
              <p className="text-gray-400 mb-4">
                Whether you&apos;re a seasoned developer or just starting out, we welcome all skill levels and backgrounds.
              </p>
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/main/.github/CONTRIBUTING.md"
                className="text-green-400 hover:text-green-300 font-semibold"
                target="_blank"
              >
                Contributing Guide →
              </Link>
            </div>

            <div className="bg-black/40 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-3">MIT Licensed</h3>
              <p className="text-gray-400 mb-4">
                Completely free and open source. Use it in personal projects, commercial applications, or fork it for your own needs.
              </p>
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/main/LICENSE"
                className="text-green-400 hover:text-green-300 font-semibold"
                target="_blank"
              >
                View License →
              </Link>
            </div>

            <div className="bg-black/40 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-white mb-3">Community Support</h3>
              <p className="text-gray-400 mb-4">
                Get help, share ideas, and connect with other developers in our GitHub discussions and issues.
              </p>
              <Link 
                href="https://github.com/johanlido/Synaptic/discussions"
                className="text-green-400 hover:text-green-300 font-semibold"
                target="_blank"
              >
                Join Discussions →
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">🎯 Ways to Contribute</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-gray-300">
                <div className="font-semibold text-green-400 mb-1">Code</div>
                <div>Features, bug fixes, optimizations</div>
              </div>
              <div className="text-gray-300">
                <div className="font-semibold text-blue-400 mb-1">Documentation</div>
                <div>Guides, examples, tutorials</div>
              </div>
              <div className="text-gray-300">
                <div className="font-semibold text-purple-400 mb-1">Testing</div>
                <div>Bug reports, platform testing</div>
              </div>
              <div className="text-gray-300">
                <div className="font-semibold text-yellow-400 mb-1">Ideas</div>
                <div>Feature requests, feedback</div>
              </div>
            </div>
            <div className="mt-6">
              <Link 
                href="https://github.com/johanlido/Synaptic/issues/new/choose"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center"
                target="_blank"
              >
                Start Contributing
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Development Workflow?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of developers using AI to build faster, smarter, and more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://github.com/johanlido/Synaptic/generate"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center"
              target="_blank"
            >
              Use This Template
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
            <Link 
              href="/docs"
              className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-gray-900"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CpuChipIcon className="h-6 w-6 text-green-400" />
                <span className="text-white font-semibold">Synaptic</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Open source AI development orchestrator with personality intelligence.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="https://github.com/johanlido/Synaptic" 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                >
                  GitHub
                </Link>
                <Link 
                  href="https://github.com/johanlido/Synaptic/discussions" 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                >
                  Discussions
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Documentation</h4>
              <div className="space-y-2 text-sm">
                <Link href="/setup" className="block text-gray-400 hover:text-white transition-colors">
                  Quick Start
                </Link>
                <Link href="/personalities" className="block text-gray-400 hover:text-white transition-colors">
                  AI Personalities
                </Link>
                <Link href="/workflows" className="block text-gray-400 hover:text-white transition-colors">
                  Workflows
                </Link>
                <Link href="/docs" className="block text-gray-400 hover:text-white transition-colors">
                  Full Documentation
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <div className="space-y-2 text-sm">
                <Link 
                  href="https://github.com/johanlido/Synaptic/blob/main/.github/CONTRIBUTING.md" 
                  className="block text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                >
                  Contributing Guide
                </Link>
                <Link 
                  href="https://github.com/johanlido/Synaptic/blob/main/.github/CODE_OF_CONDUCT.md" 
                  className="block text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                >
                  Code of Conduct
                </Link>
                <Link 
                  href="https://github.com/johanlido/Synaptic/issues" 
                  className="block text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                >
                  Issues & Bug Reports
                </Link>
                <Link 
                  href="https://github.com/johanlido/Synaptic/discussions" 
                  className="block text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                >
                  Community Discussions
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link 
                  href="https://github.com/johanlido/Synaptic/blob/main/LICENSE" 
                  className="block text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                >
                  MIT License
                </Link>
                <Link 
                  href="https://github.com/johanlido/Synaptic/blob/main/.github/SECURITY.md" 
                  className="block text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                >
                  Security Policy
                </Link>
                <Link 
                  href="https://github.com/johanlido/Synaptic/blob/main/CHANGELOG.md" 
                  className="block text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                >
                  Changelog
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Synaptic. Open source under MIT License.
            </div>
            <div className="text-gray-400 text-sm">
              Built with ❤️ by the open source community
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

