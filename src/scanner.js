// src/scanner.js

// Common secret patterns hackers look for in public GitHub repos
const SECRET_PATTERNS = [
  {
    name: 'AWS Access Key ID',
    regex: /AKIA[0-9A-Z]{16}/g,
  },
  {
    name: 'GitHub Personal Access Token',
    regex: /ghp_[A-Za-z0-9]{36}/g,
  },
  {
    name: 'Generic API Key / Secret / Password',
    regex: /(api_key|apikey|secret|token|password|passwd)\s*[:=]\s*['"][A-Za-z0-9_\-!@#$%^&*]{10,}['"]/gi,
  },
  {
    name: 'Private Cryptographic Key',
    regex: /-----BEGIN (RSA|EC|OPENSSH|PGP) PRIVATE KEY-----/g,
  },
];

/**
 * Scans text content line-by-line for potential leaked secrets.
 * @param {string} content - File content to scan
 * @param {string} filePath - Name/path of the file being scanned
 * @returns {Array} List of detected secret findings
 */
function scanContent(content, filePath = 'unknown') {
  const findings = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    SECRET_PATTERNS.forEach((pattern) => {
      // Reset regex state before testing each line
      pattern.regex.lastIndex = 0;

      if (pattern.regex.test(line)) {
        findings.push({
          file: filePath,
          line: index + 1,
          type: pattern.name,
          snippet: line.trim(),
        });
      }
    });
  });

  return findings;
}

module.exports = { scanContent, SECRET_PATTERNS };