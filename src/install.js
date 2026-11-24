// src/install.js
const fs = require('fs');
const path = require('path');

const gitHooksDir = path.join(process.cwd(), '.git', 'hooks');
const hookPath = path.join(gitHooksDir, 'pre-commit');
const cliPath = path.resolve(__dirname, 'cli.js').replace(/\\/g, '/');

if (!fs.existsSync(gitHooksDir)) {
  console.error('❌ Error: Not a Git repository (.git/hooks not found).');
  process.exit(1);
}

const hookScript = `#!/bin/sh\nnode "${cliPath}"\n`;

fs.writeFileSync(hookPath, hookScript, { mode: 0o755 });
console.log('✅ git-secret-guard pre-commit hook installed successfully!');