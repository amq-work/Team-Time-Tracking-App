// verify-setup.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requiredFiles = {
  'Root Config Files': [
    'package.json',
    'tailwind.config.js',
    'postcss.config.js',
    'vite.config.ts',
    'tsconfig.json',
    'index.html'
  ],
  'Source Root': [
    'src/main.tsx',
    'src/App.tsx',
    'src/index.css'
  ],
  'UI Components': [
    'src/components/ui/Button.tsx',
    'src/components/ui/Input.tsx',
    'src/components/ui/Card.tsx',
    'src/components/ui/StatsCard.tsx'
  ],
  'Layout Components': [
    'src/components/layout/AppLayout.tsx',
    'src/components/layout/Sidebar.tsx',
    'src/components/layout/TopBar.tsx'
  ],
  'Auth Pages': [
    'src/pages/auth/Login.tsx',
    'src/pages/auth/Signup.tsx'
  ],
  'Main Pages': [
    'src/pages/Dashboard.tsx',
    'src/pages/TimeTracker.tsx',
    'src/pages/Projects.tsx',
    'src/pages/Team.tsx',
    'src/pages/Analytics.tsx',
    'src/pages/Reports.tsx',
    'src/pages/Settings.tsx'
  ]
};

const requiredDependencies = [
  'react-router-dom',
  'framer-motion',
  'recharts',
  'lucide-react',
  'tailwindcss',
  'postcss',
  'autoprefixer'
];

console.log('\n🔍 VERIFYING CHRONOS APP SETUP\n');
console.log('=' .repeat(50));

let allFilesExist = true;
let totalFiles = 0;
let existingFiles = 0;

// Check files
for (const [category, files] of Object.entries(requiredFiles)) {
  console.log(`\n📁 ${category}:`);
  let categoryMissing = false;
  
  for (const file of files) {
    totalFiles++;
    const filePath = path.join(__dirname, file);
    const exists = fs.existsSync(filePath);
    
    if (exists) {
      existingFiles++;
      console.log(`  ✅ ${file}`);
    } else {
      allFilesExist = false;
      categoryMissing = true;
      console.log(`  ❌ ${file} - MISSING`);
    }
  }
  
  if (categoryMissing) {
    console.log(`  ⚠️  This category has missing files!`);
  }
}

// Check dependencies
console.log(`\n\n📦 Checking Dependencies:\n`);
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  for (const dep of requiredDependencies) {
    if (allDeps[dep]) {
      console.log(`  ✅ ${dep}@${allDeps[dep]}`);
    } else {
      console.log(`  ❌ ${dep} - NOT INSTALLED`);
      allFilesExist = false;
    }
  }
} else {
  console.log(`  ❌ package.json not found!`);
  allFilesExist = false;
}

// Summary
console.log(`\n${'='.repeat(50)}`);
console.log(`\n📊 SUMMARY:`);
console.log(`  Total Files Required: ${totalFiles}`);
console.log(`  Files Found: ${existingFiles}`);
console.log(`  Missing: ${totalFiles - existingFiles}`);

if (allFilesExist) {
  console.log(`\n🎉 SUCCESS! All files are in place!`);
  console.log(`\n🚀 Next Steps:`);
  console.log(`  1. Run: npm run dev`);
  console.log(`  2. Open: http://localhost:5173`);
  console.log(`  3. Login with any credentials (mock auth is active)`);
} else {
  console.log(`\n⚠️  WARNING: Some files are missing!`);
  console.log(`\n📝 Please create the missing files listed above.`);
  console.log(`\n💡 Tip: Make sure you're running this script from the project root directory.`);
}

console.log(`\n${'='.repeat(50)}\n`);