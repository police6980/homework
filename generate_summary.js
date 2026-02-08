const fs = require('fs');
const path = require('path');

const getFilesRecursively = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.DS_Store' || file === 'package-lock.json' || file === 'homework.db' || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg') || file.endsWith('.ico')) return;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getFilesRecursively(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
};

const rootDir = __dirname;
const allFiles = getFilesRecursively(rootDir);

let content = '# Homework App Codebase Summary\n\n';

allFiles.forEach(filePath => {
    try {
        const relativePath = path.relative(rootDir, filePath);
        // Skip Codebase_Summary.md itself to avoid recursion/bloat if run multiple times
        if (relativePath === 'Codebase_Summary.md') return;

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const ext = path.extname(filePath).substring(1) || 'txt';
        content += `\n## File: ${relativePath}\n\`\`\`${ext}\n${fileContent}\n\`\`\`\n`;
        console.log(`Added ${relativePath}`);
    } catch (e) {
        console.error(`Error reading ${filePath}: ${e.message}`);
    }
});

fs.writeFileSync(path.join(__dirname, 'Codebase_Summary.md'), content);
console.log('Successfully created Codebase_Summary.md');
