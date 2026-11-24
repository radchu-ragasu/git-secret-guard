const { scanContent } = require('./src/scanner');


//Fake API Key
const myCode = `
const appName = "MyApp";
const api_key = "secret_key_998877665544";
`;

// Checking the code for secrets
const result = scanContent(myCode, 'myFile.js');

console.log("கண்டுபிடிக்கப்பட்ட ரகசியங்கள்:", result);