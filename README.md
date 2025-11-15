# Node.js Strict TypeScript API Template

A modern, opinionated Node.js project template demonstrating best practices with strict TypeScript, zero runtime dependencies, and clean architecture principles.

## Features

✨ **Core Technologies**
- **Node.js Native HTTP** - No framework dependencies, using Node's built-in `http` module
- **Strict TypeScript** - Full type safety with strict compiler flags
- **Biome** - Lightning-fast linter and code formatter in Rust
- **pnpm** - Fast, disk space-efficient package manager with locked dependencies

🏗️ **Architecture & Code Quality**
- **Hexagonal Architecture** - Clean separation of concerns with repositories, services, and controllers
- **Import Aliases** - Convenient `#src/` path aliases for cleaner imports
- **Zero Runtime Dependencies** - Minimal attack surface and lightweight deployments
- **Unit Tests** - Native Node.js testing framework with comprehensive test coverage

🔄 **DevOps & CI/CD**
- **GitHub Actions** - Automated testing, linting, and type checking on every push and pull request
- **Locked Dependencies** - Exact version pinning with `pnpm` for reproducible builds
