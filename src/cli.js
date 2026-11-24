#!/usr/bin/env node
// src/cli.js

const fs = require('fs');
const { execSync } = require('child_process');
const { scanContent } = require('./scanner');

console.log('🛡️  Running git-secret-guard scan on staged files...\n');

try {
  // 1. Get list of files staged for commit
  const stagedOutput = execSync('git diff --cached --name-only --diff-filter=ACM', {
    encoding: 'utf-8',
  }).trim();

  if (!stagedOutput) {
    console.log('✅ No staged files to scan.');
    process.exit(0);
  }

  const stagedFiles = stagedOutput.split('\n');
  let totalFindings = [];

  // 2. Read each staged file and scan it
  stagedFiles.forEach((filePath) => {
    // Skip scanner itself or test files so we don't block our own regex definitions
   if (filePath.includes('scanner.js') || filePath.includes('test.js') || filePath.startsWith('notes/')) {
      return;
    }

    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const findings = scanContent(content, filePath);
      totalFindings = totalFindings.concat(findings);
    }
  });

  // 3. Block commit if secrets are found!
  if (totalFindings.length > 0) {
    console.error('🚨 [SECURITY ALERT] Commit blocked! Potential secrets detected:\n');
    totalFindings.forEach((item) => {
      console.error(`   ❌ File: ${item.file} (Line ${item.line})`);
      console.error(`      Type: ${item.type}`);
      console.error(`      Code: ${item.snippet}\n`);
    });
    console.error('💡 Fix: Remove the secret or move it to a .env file before committing.');
    process.exit(1); // Non-zero exit code tells Git to ABORT the commit
  }

  console.log('✅ Clean! No secrets detected. Proceeding with commit...\n');
  process.exit(0);
} catch (error) {
  console.error('⚠️  Error running secret guard:', error.message);
  process.exit(1);
}