#!/bin/bash

# Synaptic Interactive Setup Wizard
# AI Development Orchestrator with Personality-Aware Configuration

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Unicode symbols
CHECK="✅"
CROSS="❌"
ARROW="➜"
ROCKET="🚀"
GEAR="⚙️"
LOCK="🔒"
BRAIN="🧠"
STAR="⭐"

echo -e "${CYAN}${BRAIN} Synaptic Setup Wizard${NC}"
echo -e "${CYAN}AI Development Orchestrator${NC}"
echo -e "${CYAN}===============================${NC}"
echo -e "${BLUE}Transform your development workflow with intelligent AI orchestration${NC}"
echo ""

# Detect platform
detect_platform() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        PLATFORM="macos"
        echo -e "${BLUE}📱 Detected: macOS${NC}"
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$OSTYPE" == "cygwin" ]]; then
        PLATFORM="windows"
        echo -e "${BLUE}🪟 Detected: Windows${NC}"
    else
        PLATFORM="linux"
        echo -e "${BLUE}🐧 Detected: Linux${NC}"
    fi
    echo ""
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Validate prerequisites
validate_prerequisites() {
    echo -e "${YELLOW}${GEAR} Checking prerequisites...${NC}"
    local all_good=true
    
    # Check Node.js
    if command_exists node; then
        NODE_VERSION=$(node --version | sed 's/v//')
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1)
        if [ "$MAJOR_VERSION" -ge 18 ]; then
            echo -e "${GREEN}${CHECK} Node.js: $NODE_VERSION${NC}"
        else
            echo -e "${RED}${CROSS} Node.js: $NODE_VERSION (requires 18+)${NC}"
            all_good=false
        fi
    else
        echo -e "${RED}${CROSS} Node.js: Not installed${NC}"
        all_good=false
    fi
    
    # Check Python
    if command_exists python3; then
        PYTHON_VERSION=$(python3 --version | awk '{print $2}')
        echo -e "${GREEN}${CHECK} Python: $PYTHON_VERSION${NC}"
    else
        echo -e "${RED}${CROSS} Python 3: Not installed${NC}"
        all_good=false
    fi
    
    # Check Git
    if command_exists git; then
        GIT_VERSION=$(git --version | awk '{print $3}')
        echo -e "${GREEN}${CHECK} Git: $GIT_VERSION${NC}"
    else
        echo -e "${RED}${CROSS} Git: Not installed${NC}"
        all_good=false
    fi
    
    # Check VSCode
    if command_exists code; then
        echo -e "${GREEN}${CHECK} VSCode: Installed${NC}"
    else
        echo -e "${YELLOW}⚠️  VSCode: Not found in PATH${NC}"
    fi
    
    # Check Claude Desktop (platform-specific)
    case $PLATFORM in
        "macos")
            if [ -d "/Applications/Claude.app" ]; then
                echo -e "${GREEN}${CHECK} Claude Desktop: Installed${NC}"
            else
                echo -e "${YELLOW}⚠️  Claude Desktop: Not found${NC}"
            fi
            ;;
        "windows")
            # Windows check would go here
            echo -e "${YELLOW}⚠️  Claude Desktop: Please verify installation manually${NC}"
            ;;
        "linux")
            echo -e "${YELLOW}⚠️  Claude Desktop: Use web version${NC}"
            ;;
    esac
    
    echo ""
    
    if [ "$all_good" = false ]; then
        echo -e "${RED}${CROSS} Some prerequisites are missing. Please install them first.${NC}"
        echo -e "${BLUE}${ARROW} See docs/getting-started/setup-$PLATFORM.md for installation instructions${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}${CHECK} All prerequisites validated!${NC}"
    echo ""
}

# Choose AI stack components
choose_ai_stack() {
    echo -e "${PURPLE}🎯 Choose Your AI Stack Components${NC}"
    echo ""
    
    # Research & Documentation
    echo -e "${CYAN}Research & Documentation:${NC}"
    read -p "$(echo -e "${ARROW} Install Perplexity MCP (web search, research)? [Y/n]: ")" -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        INSTALL_PERPLEXITY=false
    else
        INSTALL_PERPLEXITY=true
    fi
    
    # Development & Automation
    echo -e "${CYAN}Development & Automation:${NC}"
    read -p "$(echo -e "${ARROW} Install Manus MCP (browser automation, code execution)? [Y/n]: ")" -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        INSTALL_MANUS=false
    else
        INSTALL_MANUS=true
    fi
    
    # Design & Frontend
    echo -e "${CYAN}Design & Frontend:${NC}"
    read -p "$(echo -e "${ARROW} Install Figma MCP (design-to-code)? [y/N]: ")" -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        INSTALL_FIGMA=true
    else
        INSTALL_FIGMA=false
    fi
    
    echo ""
}

# NEW: AI Personality Selection
select_ai_personality() {
    echo -e "${BRAIN}${PURPLE} AI Personality Selection${NC}"
    echo -e "${BLUE}Based on empirical analysis of 4,442+ coding tasks across leading LLMs${NC}"
    echo ""
    echo -e "${CYAN}Choose your primary development style:${NC}"
    echo ""
    echo -e "${STAR} 1) ${GREEN}Senior Architect${NC} - Complex, comprehensive enterprise solutions"
    echo -e "   ${BLUE}Best for:${NC} Enterprise apps, system design, complex architecture"
    echo -e "   ${YELLOW}Model:${NC} Claude Sonnet 4 (95.57% HumanEval performance)"
    echo -e "   ${RED}Watch out for:${NC} Over-engineering, excessive verbosity"
    echo ""
    echo -e "${STAR} 2) ${GREEN}Rapid Prototyper${NC} - Quick, balanced development and iteration"
    echo -e "   ${BLUE}Best for:${NC} MVPs, rapid prototyping, general development"
    echo -e "   ${YELLOW}Model:${NC} GPT-4o (balanced approach, moderate complexity)"
    echo -e "   ${RED}Watch out for:${NC} Control flow mistakes, exception handling gaps"
    echo ""
    echo -e "${STAR} 3) ${GREEN}Efficient Generalist${NC} - Minimal, optimized code"
    echo -e "   ${BLUE}Best for:${NC} Code optimization, refactoring, performance tuning"
    echo -e "   ${YELLOW}Model:${NC} OpenCoder-8B (most concise, 120K LOC vs 370K average)"
    echo -e "   ${RED}Watch out for:${NC} Dead code generation, security gaps"
    echo ""
    echo -e "${STAR} 4) ${GREEN}Documentation Expert${NC} - Well-documented, stable solutions"
    echo -e "   ${BLUE}Best for:${NC} Educational content, team collaboration, maintenance"
    echo -e "   ${YELLOW}Model:${NC} Claude 3.7 Sonnet (16.4% comment density)"
    echo -e "   ${RED}Watch out for:${NC} Potentially outdated patterns"
    echo ""
    echo -e "${STAR} 5) ${GREEN}Adaptive Orchestrator${NC} - Let Synaptic choose automatically"
    echo -e "   ${BLUE}Best for:${NC} Mixed development tasks, learning optimal patterns"
    echo -e "   ${YELLOW}Model:${NC} Task-based intelligent selection"
    echo -e "   ${GREEN}Benefit:${NC} Optimal model for each specific task"
    echo ""
    
    while true; do
        read -p "$(echo -e "${ARROW} Select your development style (1-5): ")" choice
        case $choice in
            1)
                AI_PERSONALITY="senior_architect"
                AI_DISPLAY_NAME="Senior Architect"
                PRIMARY_MODEL="claude-sonnet-4"
                echo -e "${GREEN}${CHECK} Selected: Senior Architect (Claude Sonnet 4)${NC}"
                break
                ;;
            2)
                AI_PERSONALITY="rapid_prototyper"
                AI_DISPLAY_NAME="Rapid Prototyper"
                PRIMARY_MODEL="gpt-4o"
                echo -e "${GREEN}${CHECK} Selected: Rapid Prototyper (GPT-4o)${NC}"
                break
                ;;
            3)
                AI_PERSONALITY="efficient_generalist"
                AI_DISPLAY_NAME="Efficient Generalist"
                PRIMARY_MODEL="opencoder-8b"
                echo -e "${GREEN}${CHECK} Selected: Efficient Generalist (OpenCoder-8B)${NC}"
                break
                ;;
            4)
                AI_PERSONALITY="balanced_predecessor"
                AI_DISPLAY_NAME="Documentation Expert"
                PRIMARY_MODEL="claude-3.7-sonnet"
                echo -e "${GREEN}${CHECK} Selected: Documentation Expert (Claude 3.7 Sonnet)${NC}"
                break
                ;;
            5)
                AI_PERSONALITY="adaptive_orchestrator"
                AI_DISPLAY_NAME="Adaptive Orchestrator"
                PRIMARY_MODEL="adaptive"
                echo -e "${GREEN}${CHECK} Selected: Adaptive Orchestrator (Intelligent Selection)${NC}"
                break
                ;;
            *)
                echo -e "${RED}Invalid choice. Please select 1-5.${NC}"
                ;;
        esac
    done
    
    echo ""
    echo -e "${CYAN}Personality-Specific Guardrails Enabled:${NC}"
    case $AI_PERSONALITY in
        "senior_architect")
            echo -e "${ARROW} Verbosity control to prevent over-engineering"
            echo -e "${ARROW} Path traversal validation (34% vulnerability rate)"
            echo -e "${ARROW} Resource management enforcement"
            ;;
        "rapid_prototyper")
            echo -e "${ARROW} Control flow validation (48% bug rate)"
            echo -e "${ARROW} Mandatory exception handling"
            echo -e "${ARROW} API contract verification"
            ;;
        "efficient_generalist")
            echo -e "${ARROW} Dead code removal (42.74% generation rate)"
            echo -e "${ARROW} Security hardening (29.85% credential issues)"
            echo -e "${ARROW} Completeness validation"
            ;;
        "balanced_predecessor")
            echo -e "${ARROW} Pattern modernization"
            echo -e "${ARROW} Security updates for XML handling"
            echo -e "${ARROW} Documentation maintenance"
            ;;
        "adaptive_orchestrator")
            echo -e "${ARROW} Task-based model selection"
            echo -e "${ARROW} Dynamic guardrail application"
            echo -e "${ARROW} Performance optimization"
            ;;
    esac
    
    echo ""
}

# Setup environment variables
setup_environment() {
    echo -e "${YELLOW}${LOCK} Setting up environment variables...${NC}"
    
    if [ ! -f .env ]; then
        cp .env.example .env
        echo -e "${GREEN}${CHECK} Created .env file from template${NC}"
    else
        echo -e "${YELLOW}⚠️  .env file already exists, skipping...${NC}"
    fi
    
    echo ""
    echo -e "${CYAN}Please configure your API keys in the .env file:${NC}"
    
    if [ "$INSTALL_PERPLEXITY" = true ]; then
        echo -e "${ARROW} PERPLEXITY_API_KEY: Get from https://perplexity.ai/settings/api"
    fi
    
    if [ "$INSTALL_FIGMA" = true ]; then
        echo -e "${ARROW} FIGMA_ACCESS_TOKEN: Get from Figma account settings"
    fi
    
    echo -e "${ARROW} GITHUB_PERSONAL_ACCESS_TOKEN: Optional, for GitHub integration"
    echo ""
    
    read -p "$(echo -e "${ARROW} Open .env file for editing now? [Y/n]: ")" -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        if command_exists code; then
            code .env
        elif command_exists nano; then
            nano .env
        elif command_exists vim; then
            vim .env
        else
            echo -e "${YELLOW}⚠️  Please edit .env manually with your preferred editor${NC}"
        fi
    fi
    
    echo ""
}

# Install MCP servers
install_mcp_servers() {
    echo -e "${YELLOW}${GEAR} Installing MCP servers...${NC}"
    
    # Create MCP servers directory
    mkdir -p ~/.local/share/mcp-servers
    
    if [ "$INSTALL_PERPLEXITY" = true ]; then
        echo -e "${BLUE}${ARROW} Installing Perplexity MCP...${NC}"
        if ./scripts/install-perplexity-mcp.sh; then
            echo -e "${GREEN}${CHECK} Perplexity MCP installed successfully${NC}"
        else
            echo -e "${RED}${CROSS} Failed to install Perplexity MCP${NC}"
        fi
    fi
    
    if [ "$INSTALL_MANUS" = true ]; then
        echo -e "${BLUE}${ARROW} Installing Manus MCP...${NC}"
        if ./scripts/install-manus-mcp.sh; then
            echo -e "${GREEN}${CHECK} Manus MCP installed successfully${NC}"
        else
            echo -e "${RED}${CROSS} Failed to install Manus MCP${NC}"
        fi
    fi
    
    if [ "$INSTALL_FIGMA" = true ]; then
        echo -e "${BLUE}${ARROW} Installing Figma MCP...${NC}"
        if ./scripts/install-figma-mcp.sh; then
            echo -e "${GREEN}${CHECK} Figma MCP installed successfully${NC}"
        else
            echo -e "${RED}${CROSS} Failed to install Figma MCP${NC}"
        fi
    fi
    
    echo ""
}

# Configure Claude Desktop
configure_claude() {
    echo -e "${YELLOW}${GEAR} Configuring Claude Desktop...${NC}"
    
    if ./scripts/configure-claude.sh; then
        echo -e "${GREEN}${CHECK} Claude Desktop configured successfully${NC}"
    else
        echo -e "${RED}${CROSS} Failed to configure Claude Desktop${NC}"
        echo -e "${YELLOW}⚠️  You may need to configure manually${NC}"
    fi
    
    echo ""
}

# Run health check
run_health_check() {
    echo -e "${YELLOW}${GEAR} Running health check...${NC}"
    
    if ./scripts/health-check.sh; then
        echo -e "${GREEN}${CHECK} Health check passed!${NC}"
    else
        echo -e "${YELLOW}⚠️  Some issues detected. Check the output above.${NC}"
    fi
    
    echo ""
}

# Show next steps
show_next_steps() {
    echo -e "${GREEN}${ROCKET} Setup Complete!${NC}"
    echo ""
    echo -e "${CYAN}Next Steps:${NC}"
    echo -e "${ARROW} 1. Launch Claude Desktop and look for the MCP indicator (🔌)"
    echo -e "${ARROW} 2. Test your MCP servers with sample queries"
    echo -e "${ARROW} 3. Open VSCode and verify GitHub Copilot is active"
    echo -e "${ARROW} 4. Explore example workflows in docs/examples/"
    echo ""
    echo -e "${CYAN}Quick Test Commands:${NC}"
    if [ "$INSTALL_PERPLEXITY" = true ]; then
        echo -e "${ARROW} Perplexity: 'Search for the latest React 18 features'"
    fi
    if [ "$INSTALL_MANUS" = true ]; then
        echo -e "${ARROW} Manus: 'Browse to github.com and show trending repositories'"
    fi
    if [ "$INSTALL_FIGMA" = true ]; then
        echo -e "${ARROW} Figma: 'Analyze the design at [figma-url]'"
    fi
    echo ""
    echo -e "${CYAN}Documentation:${NC}"
    echo -e "${ARROW} Setup Guide: docs/getting-started/setup-$PLATFORM.md"
    echo -e "${ARROW} Troubleshooting: docs/troubleshooting.md"
    echo -e "${ARROW} Best Practices: docs/best-practices.md"
    echo ""
    echo -e "${GREEN}Happy coding with AI! 🎉${NC}"
}

# Main execution flow
main() {
    detect_platform
    validate_prerequisites
    select_ai_personality
    choose_ai_stack
    setup_environment
    install_mcp_servers
    configure_claude
    run_health_check
    show_next_steps
}

# Run main function
main "$@"

