#!/bin/bash
set -e

# Force pnpm installation
corepack enable
corepack prepare pnpm@10.12.1 --activate

# Install dependencies
pnpm install --frozen-lockfile

# Build the web app
cd apps/web
pnpm build
