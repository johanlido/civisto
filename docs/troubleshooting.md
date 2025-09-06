# synaptic Troubleshooting Guide

This guide helps you resolve common issues when setting up and using synaptic for AI development orchestration.

## Quick Diagnostics

### Check Your Setup
```bash
# Verify Claude Desktop is installed
ls -la ~/Library/Application\ Support/Claude/

# Check MCP server configurations
cat ~/.config/claude/claude_desktop_config.json

# Verify Node.js and npm versions
node --version && npm --version
```

## Common Issues

### 1. Claude Desktop Not Recognizing MCP Servers

**Symptoms:**
- MCP servers don't appear in Claude Desktop
- "No MCP servers found" message
- Claude Desktop starts but servers aren't loaded

**Solutions:**

#### Check Configuration File Location
```bash
# macOS
~/.config/claude/claude_desktop_config.json

# Windows
%APPDATA%\Claude\claude_desktop_config.json

# Linux
~/.config/claude/claude_desktop_config.json
```

#### Verify JSON Syntax
```bash
# Test JSON validity
cat ~/.config/claude/claude_desktop_config.json | python -m json.tool
```

#### Restart Claude Desktop
1. Completely quit Claude Desktop
2. Wait 5 seconds
3. Restart the application
4. Check for MCP servers in the interface

### 2. Perplexity MCP Server Issues

**Symptoms:**
- "Perplexity API key invalid" errors
- Search requests timing out
- No search results returned

**Solutions:**

#### Verify API Key
```bash
# Check if API key is set
echo $PERPLEXITY_API_KEY

# Test API key validity
curl -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
     -H "Content-Type: application/json" \
     https://api.perplexity.ai/chat/completions
```

#### Update API Key
1. Get a new API key from [Perplexity](https://www.perplexity.ai/settings/api)
2. Update your `.env` file:
   ```bash
   PERPLEXITY_API_KEY=your_new_api_key_here
   ```
3. Restart Claude Desktop

### 3. GitHub Copilot Integration Problems

**Symptoms:**
- Copilot suggestions not appearing
- "Copilot not authenticated" errors
- VSCode not recognizing Copilot

**Solutions:**

#### Check Copilot Status
```bash
# In VSCode, open Command Palette (Cmd+Shift+P)
# Run: "GitHub Copilot: Check Status"
```

#### Re-authenticate Copilot
1. Open VSCode
2. Command Palette → "GitHub Copilot: Sign Out"
3. Command Palette → "GitHub Copilot: Sign In"
4. Follow authentication flow

#### Verify Subscription
- Check your [GitHub Copilot subscription](https://github.com/settings/copilot)
- Ensure billing is up to date

### 4. Figma MCP Server Connection Issues

**Symptoms:**
- Cannot access Figma files
- "Figma token invalid" errors
- Permission denied when accessing designs

**Solutions:**

#### Generate New Figma Token
1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Navigate to "Personal Access Tokens"
3. Generate a new token with appropriate permissions
4. Update your configuration:
   ```json
   {
     "figma": {
       "command": "npx",
       "args": ["@figma/figma-mcp-server"],
       "env": {
         "FIGMA_ACCESS_TOKEN": "your_new_token_here"
       }
     }
   }
   ```

#### Check File Permissions
- Ensure you have access to the Figma files you're trying to use
- Verify the file URLs are correct and accessible

### 5. Environment Variables Not Loading

**Symptoms:**
- "API key not found" errors
- Environment variables showing as undefined
- MCP servers failing to start

**Solutions:**

#### Check .env File Location
```bash
# Verify .env file exists and has correct permissions
ls -la .env
cat .env
```

#### Load Environment Variables
```bash
# For bash/zsh
source .env

# For fish shell
set -gx (cat .env | grep -v '^#' | xargs -d '\n')
```

#### Restart Terminal and Applications
1. Close all terminal windows
2. Quit Claude Desktop and VSCode
3. Open new terminal
4. Restart applications

### 6. Performance Issues

**Symptoms:**
- Slow response times from MCP servers
- Claude Desktop freezing or crashing
- High CPU/memory usage

**Solutions:**

#### Optimize MCP Server Configuration
```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["perplexity-mcp"],
      "env": {
        "PERPLEXITY_API_KEY": "your_key",
        "MAX_CONCURRENT_REQUESTS": "3",
        "REQUEST_TIMEOUT": "30000"
      }
    }
  }
}
```

#### Monitor Resource Usage
```bash
# Check system resources
top -p $(pgrep -f "claude")
htop

# Monitor network usage
netstat -an | grep :3000
```

#### Clear Cache
```bash
# Clear Claude Desktop cache (macOS)
rm -rf ~/Library/Caches/Claude/

# Clear npm cache
npm cache clean --force
```

## Platform-Specific Issues

### macOS

#### Gatekeeper Issues
```bash
# Allow unsigned applications (if needed)
sudo spctl --master-disable

# Reset Gatekeeper for specific app
sudo xattr -rd com.apple.quarantine /Applications/Claude.app
```

#### Permission Issues
```bash
# Fix file permissions
chmod 755 ~/.config/claude/
chmod 644 ~/.config/claude/claude_desktop_config.json
```

### Windows

#### PowerShell Execution Policy
```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy to allow scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Path Issues
```cmd
# Add Node.js to PATH
setx PATH "%PATH%;C:\Program Files\nodejs\"

# Verify PATH
echo %PATH%
```

### Linux

#### Package Dependencies
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm python3 python3-pip

# CentOS/RHEL
sudo yum install nodejs npm python3 python3-pip

# Arch Linux
sudo pacman -S nodejs npm python python-pip
```

#### AppImage Issues (if using Claude Desktop AppImage)
```bash
# Make AppImage executable
chmod +x Claude-Desktop.AppImage

# Run with verbose output
./Claude-Desktop.AppImage --verbose
```

## Advanced Troubleshooting

### Debug Mode

#### Enable Claude Desktop Debug Mode
1. Quit Claude Desktop
2. Start from terminal with debug flags:
   ```bash
   # macOS
   /Applications/Claude.app/Contents/MacOS/Claude --debug --verbose
   
   # Linux
   ./Claude-Desktop.AppImage --debug --verbose
   ```

#### MCP Server Debug Logs
```bash
# Add debug logging to MCP server configuration
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["perplexity-mcp", "--debug"],
      "env": {
        "DEBUG": "mcp:*",
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

### Network Diagnostics

#### Test API Connectivity
```bash
# Test Perplexity API
curl -v https://api.perplexity.ai/chat/completions

# Test GitHub API (for Copilot)
curl -v https://api.github.com/user

# Test Figma API
curl -v https://api.figma.com/v1/me
```

#### Check Firewall/Proxy
```bash
# Check if corporate firewall is blocking requests
curl -v --proxy http://proxy.company.com:8080 https://api.perplexity.ai

# Test without proxy
curl -v --noproxy "*" https://api.perplexity.ai
```

## Getting Help

### Log Collection

#### Collect System Information
```bash
# Create diagnostic report
echo "=== System Information ===" > synaptic-debug.log
uname -a >> synaptic-debug.log
node --version >> synaptic-debug.log
npm --version >> synaptic-debug.log

echo "=== Claude Desktop Config ===" >> synaptic-debug.log
cat ~/.config/claude/claude_desktop_config.json >> synaptic-debug.log

echo "=== Environment Variables ===" >> synaptic-debug.log
env | grep -E "(PERPLEXITY|FIGMA|GITHUB)" >> synaptic-debug.log
```

### Community Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/johanlido/Synaptic/issues)
- **Discussions**: [Community Q&A and tips](https://github.com/johanlido/Synaptic/discussions)
- **Documentation**: [Complete setup guides](https://synaptic.civisto.com/docs/)

### Professional Support

For enterprise deployments and professional support:
- Review the [Enterprise Guide](https://synaptic.civisto.com/docs/#enterprise-deployment)
- Check [Best Practices](https://synaptic.civisto.com/docs/#best-practices)
- Consider professional consulting services

## Frequently Asked Questions

### Q: Can I use synaptic without all MCP servers?
**A:** Yes! synaptic is modular. You can install only the MCP servers you need. Each server is independent and optional.

### Q: Is my API key data secure?
**A:** Yes. API keys are stored locally in your configuration files and never transmitted to third parties except the respective API providers.

### Q: Can I use synaptic in a corporate environment?
**A:** Yes. synaptic supports enterprise deployments with custom configurations, proxy settings, and security policies.

### Q: How do I update synaptic components?
**A:** Run the setup script again, or update individual components:
```bash
# Update MCP servers
npm update -g perplexity-mcp figma-mcp

# Update Claude Desktop (download latest from official site)
# Update VSCode and Copilot through their respective update mechanisms
```

### Q: Can I customize the AI guardrails?
**A:** Yes! Edit the `copilot-instructions.md` file to customize the AI behavior and coding standards for your team.

---

*Last updated: January 2025*
*For the latest troubleshooting information, visit [synaptic.civisto.com](https://synaptic.civisto.com)*

