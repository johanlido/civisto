'use client';

import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  CpuChipIcon, 
  PaintBrushIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function WorkflowsPage() {
  const workflows = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      description: 'Build a modern React dashboard with AI assistance',
      icon: PaintBrushIcon,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
      duration: '4-6 hours',
      traditional: '2-3 days',
      savings: '60-70%',
      features: [
        'Research latest React patterns with Perplexity MCP',
        'Convert Figma designs to React components',
        'Automated testing with Automation MCP',
        'WCAG 2.1 AA compliance built-in',
        'Performance optimization guidance'
      ],
      phases: [
        'Research and Planning (5-10 min)',
        'Design Analysis (10-15 min)', 
        'Project Setup (5-10 min)',
        'Core Development (30-45 min)',
        'Data Integration (20-30 min)',
        'Testing & Optimization (15-20 min)'
      ],
      link: 'https://github.com/johanlido/Synaptic/blob/v1/docs/examples/workflows/frontend-development.md'
    },
    {
      id: 'backend',
      title: 'Backend Authentication',
      description: 'Enterprise-grade authentication system with security best practices',
      icon: ShieldCheckIcon,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
      duration: '6-8 hours',
      traditional: '3-5 days',
      savings: '70-80%',
      features: [
        'Security research with Perplexity MCP',
        'JWT token management with refresh tokens',
        'Role-based access control (RBAC)',
        'Automated API testing with Automation MCP',
        'Comprehensive audit logging'
      ],
      phases: [
        'Security Research (10-15 min)',
        'Project Setup (5-10 min)',
        'Database Schema (15-20 min)',
        'Core Implementation (30-40 min)',
        'API Endpoints (25-35 min)',
        'Security & Testing (35-45 min)'
      ],
      link: 'https://github.com/johanlido/Synaptic/blob/v1/docs/examples/workflows/backend-authentication.md'
    },
    {
      id: 'fullstack',
      title: 'Full-Stack Integration',
      description: 'Complete application with frontend, backend, and deployment',
      icon: RocketLaunchIcon,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/20',
      duration: '1-2 days',
      traditional: '1-2 weeks',
      savings: '80-85%',
      features: [
        'Unified development workflow',
        'Automated deployment pipeline',
        'Real-time data synchronization',
        'Comprehensive monitoring setup',
        'Production-ready configuration'
      ],
      phases: [
        'Architecture Planning (15-20 min)',
        'Frontend Development (2-3 hours)',
        'Backend Development (3-4 hours)',
        'Integration & Testing (1-2 hours)',
        'Deployment & Monitoring (30-45 min)',
        'Documentation & Handoff (15-30 min)'
      ],
      link: '#'
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
          <h1 className="text-5xl font-bold text-white mb-6">
            Example Workflows
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Step-by-step development workflows that demonstrate the power of AI-assisted development. 
            Each workflow includes time savings, best practices, and real-world examples.
          </p>
        </div>

        {/* Workflows Grid */}
        <div className="space-y-12">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              {/* Workflow Header */}
              <div className="p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                  <div className="flex items-center mb-4 lg:mb-0">
                    <div className={`${workflow.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mr-6`}>
                      <workflow.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{workflow.title}</h2>
                      <p className="text-gray-400 text-lg">{workflow.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href={workflow.link}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center"
                      target="_blank"
                    >
                      View Workflow
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Workflow Content */}
              <div className="p-8 bg-gray-950">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Time Savings */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <ClockIcon className="h-6 w-6 text-blue-400 mr-2" />
                      Time Savings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                        <span className="text-gray-400">Traditional Development</span>
                        <span className="text-red-400 font-semibold">{workflow.traditional}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                        <span className="text-gray-400">AI-Assisted Development</span>
                        <span className="text-green-400 font-semibold">{workflow.duration}</span>
                      </div>
                      <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                        <div className="text-2xl font-bold text-green-400">{workflow.savings}</div>
                        <div className="text-gray-400">Time Saved</div>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <CheckCircleIcon className="h-6 w-6 text-green-400 mr-2" />
                      Key Features
                    </h3>
                    <div className="space-y-3">
                      {workflow.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start p-3 bg-gray-800 rounded-lg">
                          <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Workflow Phases */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <RocketLaunchIcon className="h-6 w-6 text-blue-400 mr-2" />
                    Workflow Phases
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workflow.phases.map((phase, phaseIndex) => (
                      <div key={phaseIndex} className="flex items-center p-4 bg-gray-800 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                          {phaseIndex + 1}
                        </div>
                        <span className="text-gray-400 text-sm">{phase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gray-900 border border-gray-700 rounded-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Try These Workflows?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Get started with the synaptic and experience the power of AI-assisted development firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://github.com/johanlido/Synaptic"
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
              View Documentation
            </Link>
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

