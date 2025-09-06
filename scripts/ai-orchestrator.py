#!/usr/bin/env python3
"""
Synaptic AI Orchestrator
Intelligent model selection and personality-aware guardrails based on empirical LLM analysis.
"""

import yaml
import re
import os
import json
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum

class TaskType(Enum):
    ARCHITECTURE_DESIGN = "architecture_design"
    RAPID_PROTOTYPE = "rapid_prototype"
    CODE_OPTIMIZATION = "code_optimization"
    DOCUMENTATION = "documentation"
    SECURITY_CRITICAL = "security_critical"
    ENTERPRISE_DEVELOPMENT = "enterprise_development"
    EDUCATIONAL_CONTENT = "educational_content"
    GENERAL_DEVELOPMENT = "general_development"

@dataclass
class ModelRecommendation:
    primary_model: str
    fallback_model: str
    confidence: float
    reasoning: str
    guardrails: List[str]
    avoid_models: List[str] = None

class TaskAnalyzer:
    """Analyzes task descriptions to determine optimal AI model selection."""
    
    def __init__(self):
        self.task_patterns = {
            TaskType.ARCHITECTURE_DESIGN: [
                r'\b(architecture|design|system|enterprise|scalable|microservices)\b',
                r'\b(complex|comprehensive|full-stack|infrastructure)\b',
                r'\b(patterns|frameworks|enterprise-grade)\b'
            ],
            TaskType.RAPID_PROTOTYPE: [
                r'\b(prototype|mvp|quick|fast|rapid|demo)\b',
                r'\b(poc|proof.of.concept|iteration|experiment)\b',
                r'\b(hackathon|sprint|minimal.viable)\b'
            ],
            TaskType.CODE_OPTIMIZATION: [
                r'\b(optimize|refactor|performance|efficient|clean)\b',
                r'\b(improve|enhance|streamline|minimize)\b',
                r'\b(memory|speed|algorithm|complexity)\b'
            ],
            TaskType.DOCUMENTATION: [
                r'\b(document|readme|guide|tutorial|explain)\b',
                r'\b(comments|documentation|api.docs|manual)\b',
                r'\b(help|instructions|examples|walkthrough)\b'
            ],
            TaskType.SECURITY_CRITICAL: [
                r'\b(security|secure|auth|authentication|authorization)\b',
                r'\b(encryption|crypto|ssl|tls|certificate)\b',
                r'\b(vulnerability|penetration|audit|compliance)\b'
            ],
            TaskType.ENTERPRISE_DEVELOPMENT: [
                r'\b(enterprise|production|corporate|business)\b',
                r'\b(scalable|robust|reliable|maintainable)\b',
                r'\b(compliance|audit|governance|standards)\b'
            ],
            TaskType.EDUCATIONAL_CONTENT: [
                r'\b(learn|teach|tutorial|example|educational)\b',
                r'\b(beginner|student|course|training)\b',
                r'\b(explain|demonstrate|illustrate)\b'
            ]
        }
    
    def classify_task(self, description: str) -> Tuple[TaskType, float]:
        """Classify task based on description and return confidence score."""
        description_lower = description.lower()
        scores = {}
        
        for task_type, patterns in self.task_patterns.items():
            score = 0
            for pattern in patterns:
                matches = len(re.findall(pattern, description_lower))
                score += matches
            
            # Normalize score by number of patterns
            scores[task_type] = score / len(patterns)
        
        if not scores or max(scores.values()) == 0:
            return TaskType.GENERAL_DEVELOPMENT, 0.5
        
        best_task = max(scores, key=scores.get)
        confidence = min(scores[best_task], 1.0)
        
        return best_task, confidence

class AIOrchestrator:
    """Main orchestrator for intelligent AI model selection and guardrail application."""
    
    def __init__(self, config_path: str = "configs/ai-personalities.yml"):
        self.config_path = config_path
        self.personalities = {}
        self.task_recommendations = {}
        self.vulnerability_profiles = {}
        self.task_analyzer = TaskAnalyzer()
        self.load_configuration()
    
    def load_configuration(self):
        """Load AI personality configurations from YAML file."""
        try:
            with open(self.config_path, 'r') as file:
                config = yaml.safe_load(file)
                self.personalities = config.get('ai_personalities', {})
                self.task_recommendations = config.get('task_recommendations', {})
                self.vulnerability_profiles = config.get('vulnerability_profiles', {})
        except FileNotFoundError:
            print(f"Warning: Configuration file {self.config_path} not found. Using defaults.")
            self._load_default_config()
    
    def _load_default_config(self):
        """Load default configuration if config file is not found."""
        self.personalities = {
            'rapid_prototyper': {
                'model': 'gpt-4o',
                'display_name': 'Rapid Prototyper',
                'guardrails': ['control_flow_validation', 'exception_handling']
            }
        }
        self.task_recommendations = {
            'general_development': {'primary': 'rapid_prototyper'}
        }
    
    def recommend_model(self, task_description: str, context: Dict = None) -> ModelRecommendation:
        """Recommend optimal AI model based on task analysis."""
        task_type, confidence = self.task_analyzer.classify_task(task_description)
        
        # Get recommendation for task type
        task_key = task_type.value
        if task_key not in self.task_recommendations:
            task_key = 'general_development'
        
        recommendation = self.task_recommendations[task_key]
        primary_model = recommendation.get('primary', 'rapid_prototyper')
        fallback_model = recommendation.get('fallback', 'rapid_prototyper')
        avoid_models = recommendation.get('avoid', [])
        
        # Get personality info
        personality = self.personalities.get(primary_model, {})
        guardrails = personality.get('guardrails', [])
        
        # Generate reasoning
        reasoning = self._generate_reasoning(task_type, primary_model, confidence)
        
        return ModelRecommendation(
            primary_model=primary_model,
            fallback_model=fallback_model,
            confidence=confidence,
            reasoning=reasoning,
            guardrails=guardrails,
            avoid_models=avoid_models
        )
    
    def _generate_reasoning(self, task_type: TaskType, model: str, confidence: float) -> str:
        """Generate human-readable reasoning for model recommendation."""
        personality = self.personalities.get(model, {})
        display_name = personality.get('display_name', model)
        
        reasoning_map = {
            TaskType.ARCHITECTURE_DESIGN: f"Complex architecture requires {display_name}'s comprehensive approach",
            TaskType.RAPID_PROTOTYPE: f"Quick development benefits from {display_name}'s balanced solutions",
            TaskType.CODE_OPTIMIZATION: f"Optimization tasks suit {display_name}'s efficient approach",
            TaskType.DOCUMENTATION: f"Documentation benefits from {display_name}'s clear explanations",
            TaskType.SECURITY_CRITICAL: f"Security-critical code requires {display_name}'s robust patterns",
            TaskType.ENTERPRISE_DEVELOPMENT: f"Enterprise development needs {display_name}'s comprehensive solutions",
            TaskType.EDUCATIONAL_CONTENT: f"Educational content benefits from {display_name}'s clear documentation"
        }
        
        base_reasoning = reasoning_map.get(task_type, f"{display_name} is suitable for general development")
        confidence_text = f"(Confidence: {confidence:.1%})"
        
        return f"{base_reasoning} {confidence_text}"
    
    def get_security_profile(self, model: str) -> Dict:
        """Get security vulnerability profile for a model."""
        model_key = model.replace('-', '_')
        return self.vulnerability_profiles.get(model_key, {})
    
    def apply_guardrails(self, model: str, code: str) -> Tuple[str, List[str]]:
        """Apply personality-specific guardrails to generated code."""
        personality = self.personalities.get(model, {})
        guardrails = personality.get('guardrails', [])
        warnings = []
        
        # Apply specific guardrails based on model personality
        if 'verbosity_control' in guardrails:
            code, verbosity_warnings = self._apply_verbosity_control(code)
            warnings.extend(verbosity_warnings)
        
        if 'dead_code_removal' in guardrails:
            code, dead_code_warnings = self._apply_dead_code_removal(code)
            warnings.extend(dead_code_warnings)
        
        if 'security_hardening' in guardrails:
            security_warnings = self._apply_security_hardening(code)
            warnings.extend(security_warnings)
        
        if 'control_flow_validation' in guardrails:
            flow_warnings = self._validate_control_flow(code)
            warnings.extend(flow_warnings)
        
        return code, warnings
    
    def _apply_verbosity_control(self, code: str) -> Tuple[str, List[str]]:
        """Apply verbosity control for verbose models like Claude Sonnet 4."""
        warnings = []
        lines = code.split('\n')
        
        if len(lines) > 100:
            warnings.append(f"Code is verbose ({len(lines)} lines). Consider breaking into smaller functions.")
        
        # Check for overly complex functions
        function_pattern = r'(function|def|const\s+\w+\s*=)'
        functions = re.findall(function_pattern, code)
        if len(functions) < len(lines) / 50:  # Less than 1 function per 50 lines
            warnings.append("Consider breaking large code blocks into smaller functions.")
        
        return code, warnings
    
    def _apply_dead_code_removal(self, code: str) -> Tuple[str, List[str]]:
        """Remove dead code patterns common in efficient models."""
        warnings = []
        
        # Check for unused variables (simple pattern)
        unused_vars = re.findall(r'(?:let|const|var)\s+(\w+)\s*=.*?;', code)
        for var in unused_vars:
            if code.count(var) == 1:  # Only declared, never used
                warnings.append(f"Potential unused variable: {var}")
        
        return code, warnings
    
    def _apply_security_hardening(self, code: str) -> List[str]:
        """Apply security hardening checks."""
        warnings = []
        
        # Check for hardcoded credentials
        credential_patterns = [
            r'password\s*=\s*["\'][^"\']+["\']',
            r'api_key\s*=\s*["\'][^"\']+["\']',
            r'secret\s*=\s*["\'][^"\']+["\']'
        ]
        
        for pattern in credential_patterns:
            if re.search(pattern, code, re.IGNORECASE):
                warnings.append("Potential hardcoded credential detected. Use environment variables.")
        
        # Check for SQL injection vulnerabilities
        if re.search(r'SELECT.*\+.*FROM', code, re.IGNORECASE):
            warnings.append("Potential SQL injection vulnerability. Use parameterized queries.")
        
        return warnings
    
    def _validate_control_flow(self, code: str) -> List[str]:
        """Validate control flow for models prone to control flow mistakes."""
        warnings = []
        
        # Check for complex nested conditions
        nested_if_count = len(re.findall(r'if\s*\(.*if\s*\(', code))
        if nested_if_count > 3:
            warnings.append("Complex nested conditions detected. Consider simplifying logic.")
        
        # Check for missing error handling
        try_blocks = len(re.findall(r'\btry\b', code))
        catch_blocks = len(re.findall(r'\bcatch\b', code))
        if try_blocks != catch_blocks:
            warnings.append("Unmatched try/catch blocks. Ensure proper error handling.")
        
        return warnings
    
    def generate_claude_config(self, selected_models: List[str]) -> Dict:
        """Generate Claude Desktop configuration for selected models."""
        config = {
            "mcpServers": {}
        }
        
        for model in selected_models:
            personality = self.personalities.get(model, {})
            model_name = personality.get('model', model)
            
            # Add model-specific MCP server configuration
            if 'claude' in model_name:
                config["mcpServers"]["claude"] = {
                    "command": "npx",
                    "args": ["-y", "@anthropic-ai/mcp-server-claude"],
                    "env": {
                        "ANTHROPIC_API_KEY": "${ANTHROPIC_API_KEY}"
                    }
                }
            elif 'gpt' in model_name:
                config["mcpServers"]["openai"] = {
                    "command": "npx", 
                    "args": ["-y", "@openai/mcp-server"],
                    "env": {
                        "OPENAI_API_KEY": "${OPENAI_API_KEY}"
                    }
                }
        
        return config

def main():
    """CLI interface for the AI Orchestrator."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Synaptic AI Orchestrator")
    parser.add_argument("--task", required=True, help="Task description")
    parser.add_argument("--config", default="configs/ai-personalities.yml", help="Configuration file path")
    parser.add_argument("--output", choices=["json", "yaml", "text"], default="text", help="Output format")
    
    args = parser.parse_args()
    
    orchestrator = AIOrchestrator(args.config)
    recommendation = orchestrator.recommend_model(args.task)
    
    if args.output == "json":
        print(json.dumps(recommendation.__dict__, indent=2))
    elif args.output == "yaml":
        print(yaml.dump(recommendation.__dict__, default_flow_style=False))
    else:
        print(f"🧠 AI Model Recommendation for: '{args.task}'")
        print(f"📋 Primary Model: {recommendation.primary_model}")
        print(f"🔄 Fallback Model: {recommendation.fallback_model}")
        print(f"📊 Confidence: {recommendation.confidence:.1%}")
        print(f"💡 Reasoning: {recommendation.reasoning}")
        print(f"🛡️ Guardrails: {', '.join(recommendation.guardrails)}")
        if recommendation.avoid_models:
            print(f"⚠️ Avoid Models: {', '.join(recommendation.avoid_models)}")

if __name__ == "__main__":
    main()

