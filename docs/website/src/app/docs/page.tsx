import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  DocumentTextIcon, 
  CpuChipIcon, 
  RocketLaunchIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

export default function DocsPage() {
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
          <h1 className="text-5xl font-bold text-white mb-6">
            Complete Documentation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to set up and use the synaptic for professional development
          </p>
        </div>

        {/* Documentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Getting Started */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <RocketLaunchIcon className="h-6 w-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Getting Started</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Platform-specific setup guides to get you up and running quickly
            </p>
            <div className="space-y-3">
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/v1/docs/getting-started/setup-macos.md"
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                target="_blank"
              >
                <span className="text-white">📱 macOS Setup Guide</span>
                <DocumentTextIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Link>
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/main/README.md"
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                target="_blank"
              >
                <span className="text-white">🪟 Windows Setup Guide</span>
                <DocumentTextIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Link>
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/main/README.md"
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                target="_blank"
              >
                <span className="text-white">🐧 Linux Setup Guide</span>
                <DocumentTextIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Usage Guides */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <WrenchScrewdriverIcon className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Usage Guides</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Comprehensive guides for configuration and troubleshooting
            </p>
            <div className="space-y-3">
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/v1/docs/guides/troubleshooting.md"
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                target="_blank"
              >
                <span className="text-white">🔧 Comprehensive Troubleshooting</span>
                <DocumentTextIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Link>
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/main/TEMPLATE_CUSTOMIZATION.md"
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                target="_blank"
              >
                <span className="text-white">👥 Team Customization Guide</span>
                <DocumentTextIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Link>
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/main/docs/best-practices.md"
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                target="_blank"
              >
                <span className="text-white">📋 Best Practices</span>
                <DocumentTextIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Example Workflows */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <LightBulbIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Example Workflows</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Step-by-step development workflows with real-world examples
            </p>
            <div className="space-y-3">
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/v1/docs/examples/workflows/frontend-development.md"
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                target="_blank"
              >
                <span className="text-white">🎨 Frontend Development</span>
                <DocumentTextIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Link>
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/v1/docs/examples/workflows/backend-authentication.md"
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                target="_blank"
              >
                <span className="text-white">🔐 Backend Authentication</span>
                <DocumentTextIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Link>
              <Link 
                href="/workflows"
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
              >
                <span className="text-white">🚀 Full-Stack Integration</span>
                <DocumentTextIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* AI Guidelines */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="bg-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <ShieldCheckIcon className="h-6 w-6 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">AI Guidelines</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Guardrails and standards for AI-generated code
            </p>
            <div className="space-y-3">
              <Link 
                href="https://github.com/johanlido/Synaptic/blob/main/copilot-instructions.md"
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                target="_blank"
              >
                <span className="text-white">🤖 AI Agent Instructions</span>
                <DocumentTextIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Link>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-500 mb-2">Includes:</div>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Security best practices</li>
                  <li>• WCAG 2.1 AA compliance</li>
                  <li>• Code quality standards</li>
                  <li>• Authentication patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Quick Start
            </h2>
            <p className="text-gray-400 mb-6">
              Get up and running in just a few commands
            </p>
            <div className="bg-black rounded-lg p-6 text-left max-w-2xl mx-auto">
              <div className="flex items-center mb-4">
                <CommandLineIcon className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-green-400 font-mono text-sm">Terminal</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-gray-500"># Clone the template</div>
                <div className="text-white">git clone https://github.com/johanlido/Synaptic.git</div>
                <div className="text-white">cd ai-mcp-template</div>
                <div className="text-gray-500 mt-4"># Run interactive setup</div>
                <div className="text-white">./scripts/interactive-setup.sh</div>
              </div>
            </div>
            <div className="mt-6">
              <Link 
                href="https://github.com/johanlido/Synaptic"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center"
                target="_blank"
              >
                Use This Template
                <RocketLaunchIcon className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CpuChipIcon className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">MCP Integration</h3>
            <p className="text-gray-400">
              Seamless Claude Desktop integration with Perplexity, Automation, and Figma MCP servers
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Enterprise Ready</h3>
            <p className="text-gray-400">
              Built-in security, compliance features, and professional development standards
            </p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <RocketLaunchIcon className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Zero Config</h3>
            <p className="text-gray-400">
              Interactive setup wizard with platform detection and automated configuration
            </p>
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

