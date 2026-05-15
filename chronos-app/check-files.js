import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requiredFiles = [
  // Config files
  'tailwind.config.js',
  'postcss.config.js',
  'vite.config.ts',
  
  // Source files
  'src/main.tsx',
  'src/App.tsx',
  'src/index.css',
  
  // UI Components
  'src/components/ui/Button.tsx',
  'src/components/ui/Input.tsx',
  'src/components/ui/Card.tsx',
  'src/components/ui/StatsCard.tsx',
  
  // Layout Components
  'src/components/layout/AppLayout.tsx',
  'src/components/layout/Sidebar.tsx',
  'src/components/layout/TopBar.tsx',
  
  // Auth Pages
  'src/pages/auth/Login.tsx',
  'src/pages/auth/Signup.tsx',
  
  // Main Pages
  'src/pages/Dashboard.tsx',
  'src/pages/TimeTracker.tsx',
  'src/pages/Projects.tsx',
  'src/pages/Team.tsx',
  'src/pages/Analytics.tsx',
  'src/pages/Reports.tsx',
  'src/pages/Settings.tsx',
];

console.log('\n🔍 FILE VERIFICATION\n');
console.log('='.repeat(60));

let missingFiles = [];
let existingFiles = [];

for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    existingFiles.push(file);
    console.log(`✅ ${file}`);
  } else {
    missingFiles.push(file);
    console.log(`❌ ${file} - MISSING`);
  }
}

console.log('\n' + '='.repeat(60));
console.log(`\n📊 SUMMARY:`);
console.log(`   Total files: ${requiredFiles.length}`);
console.log(`   Existing: ${existingFiles.length}`);
console.log(`   Missing: ${missingFiles.length}`);

if (missingFiles.length > 0) {
  console.log(`\n⚠️  MISSING FILES:`);
  missingFiles.forEach(file => console.log(`   - ${file}`));
  
  console.log(`\n📝 FOLDERS TO CREATE:`);
  const folders = [...new Set(missingFiles.map(file => path.dirname(file)))];
  folders.forEach(folder => console.log(`   mkdir -p ${folder}`));
} else {
  console.log(`\n🎉 ALL FILES EXIST! Run: npm run dev`);
}

console.log('\n' + '='.repeat(60));