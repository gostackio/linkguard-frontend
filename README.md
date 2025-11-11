# LinkGuard Frontend

React + Vite frontend application for LinkGuard.

## Prerequisites

- **Node.js 18+** (Node 16 may have compatibility issues)
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

Or use the provided script: `start.bat`

## Configuration

The frontend runs on port 3000 by default and proxies API requests to `http://localhost:8000`.

You can configure the API URL by setting the `VITE_API_URL` environment variable.

## Troubleshooting

If you encounter issues:

1. **Node version error**: Make sure you're using Node.js 18 or later
2. **Installation errors**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
3. **Vite errors**: Check that all dependencies are properly installed
