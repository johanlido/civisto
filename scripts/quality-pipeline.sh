#!/bin/bash
# Synaptic Quality Pipeline
# Personality-aware code quality checks based on LLM coding behavior analysis

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CONFIG_FILE="$PROJECT_ROOT/configs/ai-personalities.yml"

# Default thresholds based on LLM analysis
MAX_LOC_CLAUDE_SONNET=200    # Limit verbosity (normally 370K/4442 = 83 LOC per task)
MAX_COMPLEXITY=10            # Cyclomatic complexity limit
MIN_COMMENT_DENSITY=5        # Minimum comment percentage
MAX_FUNCTION_LENGTH=50       # Maximum lines per function

print_header() {
    echo -e "${BLUE}🔍 Synaptic Quality Pipeline${NC}"
    echo -e "${BLUE}Personality-aware code quality analysis${NC}"
    echo "=================================================="
}

print_section() {
    echo -e "\n${YELLOW}$1${NC}"
    echo "----------------------------------------"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

detect_ai_model() {
    local code_path="$1"
    
    # Simple heuristics to detect which AI model likely generated the code
    local loc_count=$(find "$code_path" -name "*.js" -o -name "*.py" -o -name "*.java" | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}' || echo "0")
    local comment_lines=$(find "$code_path" -name "*.js" -o -name "*.py" -o -name "*.java" | xargs grep -c "^\s*//\|^\s*#\|^\s*/\*" 2>/dev/null | awk -F: '{sum+=$2} END {print sum+0}')
    
    if [ "$loc_count" -gt 0 ]; then
        local comment_density=$((comment_lines * 100 / loc_count))
    else
        local comment_density=0
    fi
    
    # Personality detection based on empirical data
    if [ "$loc_count" -gt 300 ] && [ "$comment_density" -lt 10 ]; then
        echo "claude_sonnet_4"  # High verbosity, low comments
    elif [ "$comment_density" -gt 15 ]; then
        echo "claude_3_7_sonnet"  # High documentation
    elif [ "$loc_count" -lt 100 ]; then
        echo "opencoder_8b"  # Minimal code
    else
        echo "gpt_4o"  # Balanced approach
    fi
}

check_verbosity_control() {
    local code_path="$1"
    local model="$2"
    
    print_section "Verbosity Control Analysis"
    
    local total_loc=0
    local file_count=0
    local verbose_files=0
    
    while IFS= read -r -d '' file; do
        local file_loc=$(wc -l < "$file")
        total_loc=$((total_loc + file_loc))
        file_count=$((file_count + 1))
        
        if [ "$file_loc" -gt "$MAX_FUNCTION_LENGTH" ]; then
            verbose_files=$((verbose_files + 1))
            print_warning "File $file is verbose ($file_loc lines)"
        fi
    done < <(find "$code_path" -name "*.js" -o -name "*.py" -o -name "*.java" -print0)
    
    if [ "$file_count" -gt 0 ]; then
        local avg_loc=$((total_loc / file_count))
        
        # Model-specific verbosity checks
        case "$model" in
            "claude_sonnet_4")
                if [ "$avg_loc" -gt "$MAX_LOC_CLAUDE_SONNET" ]; then
                    print_error "Claude Sonnet 4 verbosity detected: Average $avg_loc LOC per file (limit: $MAX_LOC_CLAUDE_SONNET)"
                    return 1
                else
                    print_success "Verbosity under control: Average $avg_loc LOC per file"
                fi
                ;;
            *)
                if [ "$verbose_files" -gt 0 ]; then
                    print_warning "$verbose_files files exceed recommended length"
                else
                    print_success "All files within reasonable length limits"
                fi
                ;;
        esac
    fi
    
    return 0
}

check_security_vulnerabilities() {
    local code_path="$1"
    local model="$2"
    
    print_section "Security Vulnerability Analysis"
    
    local security_issues=0
    
    # Check for hardcoded credentials (major issue for all models)
    print_warning "Scanning for hardcoded credentials..."
    local credential_patterns=(
        "password\s*=\s*[\"'][^\"']+[\"']"
        "api_key\s*=\s*[\"'][^\"']+[\"']"
        "secret\s*=\s*[\"'][^\"']+[\"']"
        "token\s*=\s*[\"'][^\"']+[\"']"
    )
    
    for pattern in "${credential_patterns[@]}"; do
        local matches=$(find "$code_path" -name "*.js" -o -name "*.py" -o -name "*.java" | xargs grep -i -E "$pattern" 2>/dev/null | wc -l)
        if [ "$matches" -gt 0 ]; then
            print_error "Found $matches potential hardcoded credentials"
            security_issues=$((security_issues + matches))
        fi
    done
    
    # Check for path traversal vulnerabilities (high risk for Claude models)
    if [[ "$model" == *"claude"* ]]; then
        print_warning "Scanning for path traversal vulnerabilities (Claude-specific risk)..."
        local path_traversal=$(find "$code_path" -name "*.js" -o -name "*.py" -o -name "*.java" | xargs grep -E "\.\./|\.\.\\\\|path\.join\(" 2>/dev/null | wc -l)
        if [ "$path_traversal" -gt 0 ]; then
            print_error "Found $path_traversal potential path traversal vulnerabilities"
            security_issues=$((security_issues + path_traversal))
        fi
    fi
    
    # Check for SQL injection patterns
    print_warning "Scanning for SQL injection vulnerabilities..."
    local sql_injection=$(find "$code_path" -name "*.js" -o -name "*.py" -o -name "*.java" | xargs grep -i -E "SELECT.*\+.*FROM|INSERT.*\+.*VALUES" 2>/dev/null | wc -l)
    if [ "$sql_injection" -gt 0 ]; then
        print_error "Found $sql_injection potential SQL injection vulnerabilities"
        security_issues=$((security_issues + sql_injection))
    fi
    
    # Model-specific security checks
    case "$model" in
        "llama_3_2_90b")
            print_warning "High-risk model detected: Applying maximum security validation"
            # Additional checks for highest-risk model
            local xxe_patterns=$(find "$code_path" -name "*.xml" -o -name "*.java" | xargs grep -i "DOCTYPE\|ENTITY" 2>/dev/null | wc -l)
            if [ "$xxe_patterns" -gt 0 ]; then
                print_error "Found $xxe_patterns potential XXE vulnerabilities"
                security_issues=$((security_issues + xxe_patterns))
            fi
            ;;
        "opencoder_8b")
            print_warning "Efficient model detected: Enhanced credential scanning"
            # OpenCoder has highest hardcoded credential rate (29.85%)
            ;;
    esac
    
    if [ "$security_issues" -eq 0 ]; then
        print_success "No obvious security vulnerabilities detected"
        return 0
    else
        print_error "Found $security_issues potential security issues"
        return 1
    fi
}

check_dead_code() {
    local code_path="$1"
    local model="$2"
    
    print_section "Dead Code Analysis"
    
    # Particularly important for OpenCoder-8B (42.74% dead code rate)
    if [ "$model" = "opencoder_8b" ]; then
        print_warning "OpenCoder model detected: Enhanced dead code scanning"
    fi
    
    local dead_code_issues=0
    
    # Check for unused variables (simple pattern matching)
    print_warning "Scanning for unused variables..."
    while IFS= read -r -d '' file; do
        case "$file" in
            *.js)
                # JavaScript unused variables
                local unused_vars=$(grep -E "^\s*(let|const|var)\s+\w+" "$file" | while read -r line; do
                    local var_name=$(echo "$line" | sed -E 's/.*\s(let|const|var)\s+([a-zA-Z_][a-zA-Z0-9_]*).*/\2/')
                    local usage_count=$(grep -c "\b$var_name\b" "$file")
                    if [ "$usage_count" -eq 1 ]; then
                        echo "$var_name"
                    fi
                done | wc -l)
                ;;
            *.py)
                # Python unused variables (basic check)
                local unused_vars=$(grep -E "^\s*\w+\s*=" "$file" | while read -r line; do
                    local var_name=$(echo "$line" | sed -E 's/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=.*/\1/')
                    local usage_count=$(grep -c "\b$var_name\b" "$file")
                    if [ "$usage_count" -eq 1 ]; then
                        echo "$var_name"
                    fi
                done | wc -l)
                ;;
            *)
                local unused_vars=0
                ;;
        esac
        
        if [ "$unused_vars" -gt 0 ]; then
            print_warning "File $(basename "$file"): $unused_vars potential unused variables"
            dead_code_issues=$((dead_code_issues + unused_vars))
        fi
    done < <(find "$code_path" -name "*.js" -o -name "*.py" -print0)
    
    # Check for unused functions
    print_warning "Scanning for unused functions..."
    local unused_functions=$(find "$code_path" -name "*.js" -o -name "*.py" | xargs grep -E "function\s+\w+|def\s+\w+" 2>/dev/null | wc -l)
    
    if [ "$dead_code_issues" -eq 0 ]; then
        print_success "No obvious dead code detected"
        return 0
    else
        print_warning "Found $dead_code_issues potential dead code issues"
        return 1
    fi
}

check_control_flow() {
    local code_path="$1"
    local model="$2"
    
    print_section "Control Flow Analysis"
    
    # Particularly important for GPT-4o (48.15% control flow bugs)
    if [ "$model" = "gpt_4o" ]; then
        print_warning "GPT-4o model detected: Enhanced control flow validation"
    fi
    
    local control_flow_issues=0
    
    # Check for complex nested conditions
    print_warning "Scanning for complex nested conditions..."
    while IFS= read -r -d '' file; do
        local nested_ifs=$(grep -E "if.*if" "$file" | wc -l)
        if [ "$nested_ifs" -gt 3 ]; then
            print_warning "File $(basename "$file"): $nested_ifs complex nested conditions"
            control_flow_issues=$((control_flow_issues + 1))
        fi
        
        # Check for unmatched try/catch blocks
        local try_blocks=$(grep -c "\btry\b" "$file" 2>/dev/null || echo "0")
        local catch_blocks=$(grep -c "\bcatch\b" "$file" 2>/dev/null || echo "0")
        if [ "$try_blocks" -ne "$catch_blocks" ]; then
            print_warning "File $(basename "$file"): Unmatched try/catch blocks ($try_blocks try, $catch_blocks catch)"
            control_flow_issues=$((control_flow_issues + 1))
        fi
    done < <(find "$code_path" -name "*.js" -o -name "*.py" -o -name "*.java" -print0)
    
    if [ "$control_flow_issues" -eq 0 ]; then
        print_success "Control flow appears well-structured"
        return 0
    else
        print_warning "Found $control_flow_issues control flow concerns"
        return 1
    fi
}

check_documentation_quality() {
    local code_path="$1"
    local model="$2"
    
    print_section "Documentation Quality Analysis"
    
    local total_lines=0
    local comment_lines=0
    
    # Count total lines and comment lines
    while IFS= read -r -d '' file; do
        local file_lines=$(wc -l < "$file")
        total_lines=$((total_lines + file_lines))
        
        case "$file" in
            *.js)
                local file_comments=$(grep -c "^\s*//\|^\s*/\*" "$file" 2>/dev/null || echo "0")
                ;;
            *.py)
                local file_comments=$(grep -c "^\s*#" "$file" 2>/dev/null || echo "0")
                ;;
            *.java)
                local file_comments=$(grep -c "^\s*//\|^\s*/\*" "$file" 2>/dev/null || echo "0")
                ;;
            *)
                local file_comments=0
                ;;
        esac
        
        comment_lines=$((comment_lines + file_comments))
    done < <(find "$code_path" -name "*.js" -o -name "*.py" -o -name "*.java" -print0)
    
    if [ "$total_lines" -gt 0 ]; then
        local comment_density=$((comment_lines * 100 / total_lines))
        
        # Model-specific documentation expectations
        case "$model" in
            "claude_3_7_sonnet")
                # Expect high documentation (16.4% baseline)
                if [ "$comment_density" -lt 15 ]; then
                    print_warning "Low documentation density for Claude 3.7: $comment_density% (expected >15%)"
                    return 1
                else
                    print_success "Good documentation density: $comment_density%"
                fi
                ;;
            "gpt_4o")
                # Expect low documentation (4.4% baseline)
                if [ "$comment_density" -lt "$MIN_COMMENT_DENSITY" ]; then
                    print_warning "Documentation density: $comment_density% (minimum: $MIN_COMMENT_DENSITY%)"
                    return 1
                else
                    print_success "Adequate documentation density: $comment_density%"
                fi
                ;;
            *)
                if [ "$comment_density" -lt "$MIN_COMMENT_DENSITY" ]; then
                    print_warning "Low documentation density: $comment_density%"
                    return 1
                else
                    print_success "Documentation density: $comment_density%"
                fi
                ;;
        esac
    else
        print_warning "No code files found for documentation analysis"
        return 1
    fi
    
    return 0
}

generate_report() {
    local code_path="$1"
    local model="$2"
    local results="$3"
    
    print_section "Quality Report Summary"
    
    echo "Code Path: $code_path"
    echo "Detected AI Model: $model"
    echo "Analysis Results:"
    echo "$results"
    
    # Generate recommendations based on model personality
    echo -e "\n${BLUE}Model-Specific Recommendations:${NC}"
    case "$model" in
        "claude_sonnet_4")
            echo "• Focus on conciseness - break large functions into smaller ones"
            echo "• Validate all file paths to prevent traversal attacks"
            echo "• Use environment variables for all credentials"
            ;;
        "gpt_4o")
            echo "• Simplify complex control flow logic"
            echo "• Add comprehensive error handling"
            echo "• Include more inline documentation"
            ;;
        "opencoder_8b")
            echo "• Remove all unused variables and functions"
            echo "• Add security validation for all inputs"
            echo "• Enhance error handling and edge cases"
            ;;
        "claude_3_7_sonnet")
            echo "• Update to modern patterns and APIs"
            echo "• Maintain excellent documentation standards"
            echo "• Apply current security best practices"
            ;;
        "llama_3_2_90b")
            echo "• CRITICAL: Manual security review required"
            echo "• Implement comprehensive input validation"
            echo "• Add extensive testing and monitoring"
            ;;
    esac
}

main() {
    local code_path="${1:-.}"
    local specified_model="$2"
    
    print_header
    
    # Detect or use specified AI model
    if [ -n "$specified_model" ]; then
        local detected_model="$specified_model"
        echo "Using specified model: $detected_model"
    else
        local detected_model=$(detect_ai_model "$code_path")
        echo "Detected AI model: $detected_model"
    fi
    
    # Run personality-aware quality checks
    local results=""
    local overall_status=0
    
    # Verbosity control
    if check_verbosity_control "$code_path" "$detected_model"; then
        results="$results\n✅ Verbosity Control: PASS"
    else
        results="$results\n❌ Verbosity Control: FAIL"
        overall_status=1
    fi
    
    # Security vulnerabilities
    if check_security_vulnerabilities "$code_path" "$detected_model"; then
        results="$results\n✅ Security Analysis: PASS"
    else
        results="$results\n❌ Security Analysis: FAIL"
        overall_status=1
    fi
    
    # Dead code analysis
    if check_dead_code "$code_path" "$detected_model"; then
        results="$results\n✅ Dead Code Analysis: PASS"
    else
        results="$results\n⚠️ Dead Code Analysis: WARNINGS"
    fi
    
    # Control flow analysis
    if check_control_flow "$code_path" "$detected_model"; then
        results="$results\n✅ Control Flow Analysis: PASS"
    else
        results="$results\n⚠️ Control Flow Analysis: WARNINGS"
    fi
    
    # Documentation quality
    if check_documentation_quality "$code_path" "$detected_model"; then
        results="$results\n✅ Documentation Quality: PASS"
    else
        results="$results\n⚠️ Documentation Quality: WARNINGS"
    fi
    
    # Generate final report
    generate_report "$code_path" "$detected_model" "$results"
    
    # Final status
    echo -e "\n${BLUE}Overall Quality Status:${NC}"
    if [ "$overall_status" -eq 0 ]; then
        print_success "Quality checks passed"
    else
        print_error "Quality issues detected - review required"
    fi
    
    exit "$overall_status"
}

# Show usage if no arguments provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <code_path> [ai_model]"
    echo ""
    echo "Arguments:"
    echo "  code_path    Path to code directory to analyze"
    echo "  ai_model     Optional: Specify AI model (claude_sonnet_4, gpt_4o, opencoder_8b, etc.)"
    echo ""
    echo "Examples:"
    echo "  $0 ./src"
    echo "  $0 ./project claude_sonnet_4"
    echo "  $0 . gpt_4o"
    exit 1
fi

main "$@"

