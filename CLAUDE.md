# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TUBITAK CLI project called **Gemini CLI Türkçe** - a Turkish-localized CLI tool built on top of Google's Gemini CLI. The project aims to make Gemini CLI accessible and enhanced for Turkish-speaking developers by providing:

1. **Full Turkish Localization** - All UI elements, help messages, and error messages in Turkish
2. **Turkish-focused Slash Commands** - Pre-built commands for academic and professional Turkish use cases
3. **Modern React Ink UI** - Interactive menus and beautiful CLI interface
4. **Comprehensive Turkish Documentation** - Complete guides and examples

**Primary Language**: Turkish - All documentation and user-facing content should be in Turkish.

**Project Status**: Phase 1 - Analysis & Setup
**Target Completion**: 4-5 weeks based on PRD timeline

## Project Goals

### Primary Goals
1. Add complete Turkish localization support to Gemini CLI
2. Develop Turkish-focused prompt and slash command packages
3. Create modern and user-friendly CLI interface with React Ink
4. Prepare comprehensive Turkish documentation and example scenarios

### Secondary Goals
- Add persona and workflow support inspired by SuperGemini framework
- Prepare infrastructure for future MCP server integration
- Contribute to open-source community

## Project Architecture

The project is designed as a wrapper layer on top of existing Gemini CLI:

```
┌─────────────────────────────────────────┐
│         React Ink UI Layer              │
│    (Menus, Spinner, Colored Output)     │
├─────────────────────────────────────────┤
│      Turkish Localization Layer         │
│   (Messages, Help, Error Texts)         │
├─────────────────────────────────────────┤
│       Slash Command / Prompt Package    │
│  (/ozetle, /kod-acikla-tr, /rapor...)   │
├─────────────────────────────────────────┤
│          Gemini CLI (Base)              │
│      (google-gemini/gemini-cli)         │
└─────────────────────────────────────────┘
```

## Project Context

The project extends Gemini CLI functionality using:
1. **Extension System**: Add new features to Gemini CLI through modular extensions
2. **MCP Server Integration**: Create custom tools using Model Context Protocol
3. **Turkish Localization Layer**: Language support and cultural adaptation
4. **React Ink UI**: Modern interactive command-line interface

Reference documentation is available in:
- `Gemini_CLI_PRD.md` - Complete Product Requirements Document
- `GEMINI-CLI-UZERINE-CLI-INSA-ETME-REHBERI.md` - Comprehensive guide for building on Gemini CLI

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
- `Gemini_CLI_PRD.md:1` - Complete Product Requirements Document with timeline and requirements
- `README.md:1` - Project readme (will be updated with Turkish content)
- `GEMINI-CLI-UZERINE-CLI-INSA-ETME-REHBERI.md:1` - Comprehensive guide for building on Gemini CLI
- `nodejs-kurulumu.md:1` - Node.js installation instructions in Turkish
- `ROADMAP.md` - Detailed project roadmap and milestone tracking (to be created)

## Project Timeline

### Phase 1: Analysis & Setup (Week 1) - CURRENT PHASE
- ✅ Review Gemini CLI repository and setup
- ✅ Test basic commands (chat, tools, context)
- ✅ Review SuperGemini documentation
- 🔄 Create project Git repository structure
- 🔄 Set up initial directory structure

### Phase 2: Turkish Interface & Config (Week 2-2.5)
- Create `config.json` with language selection
- Write Turkish versions of help texts and error messages
- Implement `--lang tr` parameter

### Phase 3: Prompt / Slash Command Package (Week 3-4)
- Define 5-10 core commands
- Design system prompts for each command
- Integrate commands into CLI

### Phase 4: React Ink Interface (Week 5)
- Implement main menu with Ink
- Create prompt input field and response display
- Add UX details (spinner, colored warnings)

### Phase 5: Testing & Documentation (Final Week)
- Test different scenarios
- Bug fixes
- Prepare project report
- Complete documentation

## Planned Slash Commands (from PRD)

| Command | Description | Priority |
|---------|-------------|----------|
| `/ozetle` | Extract Turkish summary from file or text | High |
| `/acikla-baslangic` | Explain technical topics for beginners in Turkish | High |
| `/kod-acikla-tr` | Explain code line by line in Turkish | High |
| `/rapor-taslagi` | Generate project report or assignment draft from notes | Medium |
| `/ing-ceviri-akademik` | Translate Turkish text to academic English | Medium |

## Success Criteria

1. ✅ 100% Turkish localization of all help and error messages
2. ✅ Minimum 5 functional slash commands working
3. ✅ Interactive menu system completed with React Ink
4. ✅ Comprehensive Turkish README and at least 3 example scenarios
5. ✅ All basic functions working without errors
6. ✅ Project report delivered on time

## Future Development

### Immediate Next Steps (Phase 1)
1. ✅ Create project directory structure following PRD specifications
2. ✅ Set up TypeScript configuration for MCP server development
3. ✅ Initialize localization files (tr.json, en.json)
4. ✅ Create `.gemini/` directory for project-specific configuration
5. ✅ Define initial slash commands in `.gemini/commands/` as TOML files

### Phase 2+ Implementation
1. Build Turkish localization layer
2. Develop MCP server with custom tools
3. Create React Ink UI components
4. Integrate all layers
5. Comprehensive testing and documentation

### Future Enhancements (Post-MVP)
- **MCP Server Integration**: Extended tool support via Model Context Protocol
- **GitHub Actions CI/CD**: Automated testing and deployment pipeline
- **Additional Language Support**: Kurdish, Arabic localization
- **Theme System**: Customizable color schemes
- **Plugin Architecture**: Community-developed plugin system
- **VS Code Integration**: CLI access from within editor
