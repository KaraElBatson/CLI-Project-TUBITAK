# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TUBITAK CLI project designed to build a custom CLI tool on top of Gemini CLI (Google's Gemini AI command-line interface). The project is in its early initialization stage with Node.js project structure established.

**Primary Language**: Turkish - All documentation and user-facing content should be in Turkish.

## Project Context

The project aims to extend Gemini CLI functionality using one of three approaches:
1. **Extension System**: Add new features to Gemini CLI through modular extensions
2. **MCP Server Integration**: Create custom tools using Model Context Protocol
3. **Headless Mode**: Enable automation and script integration

Reference documentation is available in `GEMINI-CLI-UZERINE-CLI-INSA-ETME-REHBERI.md` which provides comprehensive guidance on building CLI tools on Gemini CLI.

## Development Commands

### Package Management
```bash
# Install dependencies
npm install

# Run tests (currently not configured)
npm test
```

### Project Initialization
The project uses a basic Node.js setup. No build or compilation steps are currently configured.

## Architecture Notes

### Extension Development Pattern
If building a Gemini CLI extension, the expected structure is:
- `gemini-extension.json` - Extension manifest with MCP server configuration
- `GEMINI.md` - Context file for the AI model with project-specific instructions
- `commands/` - Custom TOML command files organized by namespace
- `src/` - TypeScript/JavaScript source code
- MCP servers communicate via stdio, SSE, or HTTP transports

### MCP Server Architecture
- Use `@modelcontextprotocol/sdk` for MCP server implementation
- Tools are registered with Zod schemas for type validation
- Server runs as subprocess and communicates via stdin/stdout
- Supports tool execution, resource access, and prompt registration

### Configuration Priority
Settings can be defined at multiple levels (lowest to highest priority):
1. Default values
2. System defaults (`/etc/gemini-cli/system-defaults.json`)
3. User settings (`~/.gemini/settings.json`)
4. Project settings (`.gemini/settings.json`)
5. System settings (`/etc/gemini-cli/settings.json`)
6. Environment variables
7. Command-line arguments

### Custom Commands (TOML Format)
Commands support:
- Simple prompts
- Argument interpolation with `{{args}}`
- Shell command injection with `!{command}`
- File content injection with `@{path}`
- Namespace organization via directory structure (e.g., `commands/git/status.toml` → `/git:status`)

## Development Guidelines

### Language and Documentation
- All user-facing messages, documentation, and code comments must be in Turkish
- Technical terms can remain in English where appropriate (e.g., "MCP Server", "Extension")

### TypeScript Configuration
If using TypeScript for MCP servers:
- Target: ES2022
- Module: NodeNext
- Enable strict mode
- Output to `dist/` directory

### Extension Manifest Variables
Use these variables in `gemini-extension.json`:
- `${extensionPath}` - Full path to extension installation
- `${workspacePath}` - Current working directory path
- `${/}` or `${pathSeparator}` - OS-specific path separator

## Key Files

- `package.json:1` - Node.js project manifest
- `README.md:1` - Project readme (currently minimal)
- `GEMINI-CLI-UZERINE-CLI-INSA-ETME-REHBERI.md:1` - Comprehensive guide for building on Gemini CLI
- `nodejs-kurulumu.md:1` - Node.js installation instructions in Turkish

## Future Development

When implementing features:
1. Create `.gemini/` directory for project-specific Gemini CLI configuration
2. Define custom commands in `.gemini/commands/` as TOML files
3. If building MCP server, create TypeScript source in `src/` with proper configuration
4. Use `gemini-extension.json` to define extension metadata and MCP server configuration
5. Create `GEMINI.md` in project root with context for the AI model
