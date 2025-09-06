'use client';

import Link from 'next/link';
import { CpuChipIcon, ShieldCheckIcon, LightBulbIcon, DocumentTextIcon, RocketLaunchIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Personalities() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const personalities = [
    {
      id: 'senior_architect',
      name: 'Senior Architect',
      model: 'Claude Sonnet 4',
      icon: '🏗️',
      description: 'Complex, comprehensive enterprise solutions with verbosity control',
      performance: '95.57% HumanEval',
      verbosity: 'High (370K LOC)',
      documentation: 'Medium (5.1%)',
      strengths: [
        'Complex system architecture design',
        'Comprehensive problem-solving approach',
        'High benchmark performance',
        'Enterprise-grade solution patterns'
      ],
      weaknesses: [
        'Over-engineering tendency',
        'Excessive verbosity (3x more code)',
        'Path-traversal vulnerabilities (34.04%)',
        'Hard-coded credentials (14.18%)'
      ],
      bestFor: [
        'Enterprise application development',
        'Complex system architecture',
        'Performance-critical applications',
        'Large-scale software design'
      ],
      guardrails: [
        'Verbosity control to prevent over-engineering',
        'Path traversal validation',
        'Resource management enforcement',
        'Credential scanning'
      ],
      color: 'blue'
    },
    {
      id: 'rapid_prototyper',
      name: 'Rapid Prototyper',
      model: 'GPT-4o',
      icon: '⚡',
      description: 'Quick, balanced development and iteration',
      performance: '73.42% HumanEval',
      verbosity: 'Medium (209K LOC)',
      documentation: 'Low (4.4%)',
      strengths: [
        'Balanced approach to problem-solving',
        'Quick solution generation',
        'Reasonable code length',
        'Good general-purpose performance'
      ],
      weaknesses: [
        'Control flow mistakes (48.15% of bugs)',
        'Exception handling gaps',
        'API contract violations',
        'Hard-coded credentials (17.86%)'
      ],
      bestFor: [
        'Rapid prototyping and MVPs',
        'General development tasks',
        'Iterative development cycles',
        'Cross-functional development'
      ],
      guardrails: [
        'Control flow validation',
        'Mandatory exception handling',
        'API contract verification',
        'Security validation'
      ],
      color: 'green'
    },
    {
      id: 'efficient_generalist',
      name: 'Efficient Generalist',
      model: 'OpenCoder-8B',
      icon: '🔧',
      description: 'Minimal, optimized code for performance',
      performance: '64.36% HumanEval',
      verbosity: 'Low (120K LOC)',
      documentation: 'Medium (9.9%)',
      strengths: [
        'Minimal, efficient code generation',
        'Clear, concise logic patterns',
        'Good for optimization tasks',
        'Resource-efficient solutions'
      ],
      weaknesses: [
        'Dead code generation (42.74% - highest)',
        'Hard-coded credentials (29.85% - highest)',
        'Security gaps in implementation',
        'Limited complex scenario handling'
      ],
      bestFor: [
        'Code optimization and refactoring',
        'Performance tuning',
        'Simple scripts and utilities',
        'Resource-constrained environments'
      ],
      guardrails: [
        'Dead code removal',
        'Security hardening',
        'Credential detection',
        'Completeness validation'
      ],
      color: 'orange'
    },
    {
      id: 'documentation_expert',
      name: 'Documentation Expert',
      model: 'Claude 3.7 Sonnet',
      icon: '📚',
      description: 'Well-documented, stable solutions',
      performance: '84.28% HumanEval',
      verbosity: 'Medium (288K LOC)',
      documentation: 'High (16.4%)',
      strengths: [
        'Excellent documentation habits',
        'Stable, reliable code patterns',
        'High comment density',
        'Good balance of features'
      ],
      weaknesses: [
        'Potentially outdated patterns',
        'XML external entity issues (15.52%)',
        'Control flow mistakes (23.62%)',
        'Legacy approach tendencies'
      ],
      bestFor: [
        'Documentation-heavy projects',
        'Educational content creation',
        'Team collaboration projects',
        'Maintenance and legacy systems'
      ],
      guardrails: [
        'Pattern modernization',
        'Security updates',
        'XML security validation',
        'Documentation maintenance'
      ],
      color: 'purple'
    },
    {
      id: 'adaptive_orchestrator',
      name: 'Adaptive Orchestrator',
      model: 'Intelligent Selection',
      icon: '🧠',
      description: 'Task-based intelligent model selection',
      performance: 'Optimal per task',
      verbosity: 'Adaptive',
      documentation: 'Context-aware',
      strengths: [
        'Optimal model selection for each task',
        'Reduced cognitive load on developers',
        'Consistent quality across models',
        'Automatic weakness compensation'
      ],
      weaknesses: [
        'Requires task analysis overhead',
        'Complex configuration setup',
        'Learning curve for teams'
      ],
      bestFor: [
        'Mixed development tasks',
        'Learning optimal patterns',
        'Team standardization',
        'Quality optimization'
      ],
      guardrails: [
        'Task-based model selection',
        'Dynamic guardrail application',
        'Performance optimization',
        'Quality assurance'
      ],
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-500 bg-blue-500/10',
      green: 'border-green-500 bg-green-500/10',
      orange: 'border-orange-500 bg-orange-500/10',
      purple: 'border-purple-500 bg-purple-500/10',
      indigo: 'border-indigo-500 bg-indigo-500/10'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

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
            <Link href="/personalities" className="text-white font-semibold">
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
                className="block text-white font-semibold py-2"
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
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              AI Coding
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                {' '}Personalities
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed">
              Based on empirical analysis of 4,442+ coding tasks across leading LLMs. Each AI model has distinct 
              characteristics, strengths, and weaknesses. Synaptic leverages this research to provide intelligent 
              orchestration and personality-aware guardrails.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gray-900 border border-gray-700 rounded-full text-gray-300">
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Scientific Research-Based • 60-70% Vulnerability Reduction
            </div>
          </div>

          {/* Personality Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {personalities.map((personality) => (
              <div 
                key={personality.id}
                className={`border-2 rounded-xl p-8 ${getColorClasses(personality.color)} hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-4">{personality.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{personality.name}</h3>
                    <p className="text-gray-400">{personality.model}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{personality.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                  <div>
                    <p className="text-gray-400">Performance</p>
                    <p className="text-white font-semibold">{personality.performance}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Verbosity</p>
                    <p className="text-white font-semibold">{personality.verbosity}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Documentation</p>
                    <p className="text-white font-semibold">{personality.documentation}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-green-400 font-semibold mb-2 flex items-center">
                      <LightBulbIcon className="h-4 w-4 mr-2" />
                      Strengths
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {personality.strengths.slice(0, 2).map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                      <ShieldCheckIcon className="h-4 w-4 mr-2" />
                      Key Guardrails
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {personality.guardrails.slice(0, 2).map((guardrail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {guardrail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2 flex items-center">
                      <RocketLaunchIcon className="h-4 w-4 mr-2" />
                      Best For
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {personality.bestFor.slice(0, 2).map((use, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-400 mr-2">•</span>
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Research Foundation */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <DocumentTextIcon className="h-8 w-8 mr-3 text-green-400" />
              Research Foundation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">4,442+</div>
                <div className="text-gray-400">Coding Tasks Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
                <div className="text-gray-400">Leading LLMs Studied</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">60-70%</div>
                <div className="text-gray-400">BLOCKER Vulnerabilities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">50%</div>
                <div className="text-gray-400">Vulnerability Reduction</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Development Workflow?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Get started with Synaptic&apos;s AI personality intelligence and experience the future of 
              AI-assisted development with scientific precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/setup"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                <RocketLaunchIcon className="h-5 w-5 mr-2" />
                Get Started
              </Link>
              <Link 
                href="https://github.com/johanlido/Synaptic"
                className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all inline-flex items-center justify-center"
                target="_blank"
              >
                <CpuChipIcon className="h-5 w-5 mr-2" />
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

