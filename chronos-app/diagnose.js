import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🔍 DIAGNOSING CHRONOS APP ERRORS\n');
console.log('='.repeat(60));

const issues = [];

// Function to check file for common errors
function checkFile(filePath, type) {
  if (!fs.existsSync(filePath)) {
    issues.push(`❌ MISSING: ${type} - ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for empty files
  if (content.trim().length === 0) {
    issues.push(`⚠️  EMPTY FILE: ${filePath}`);
  }
  
  // Check for common syntax issues
  if (content.includes('HTMLMotionProps') && type === 'component') {
    issues.push(`⚠️  ISSUE: ${filePath} uses HTMLMotionProps (needs fix)`);
  }
  
  // Check for missing imports
  if (content.includes('from ') && !content.includes('import React') && type === 'component') {
    issues.push(`⚠️  WARNING: ${filePath} might be missing React import`);
  }
  
  // Check for export issues
  if (type === 'page' && !content.includes('export const') && !content.includes('export default')) {
    issues.push(`⚠️  ISSUE: ${filePath} has no export`);
  }
  
  // Check for TypeScript errors
  if (content.includes(': any')) {
    issues.push(`💡 INFO: ${filePath} uses 'any' type`);
  }
}

// Check all component files
const components = [
  'src/components/ui/Button.tsx',
  'src/components/ui/Input.tsx',
  'src/components/ui/Card.tsx',
  'src/components/ui/StatsCard.tsx',
  'src/components/layout/AppLayout.tsx',
  'src/components/layout/Sidebar.tsx',
  'src/components/layout/TopBar.tsx'
];

console.log('\n📁 Checking Components:');
components.forEach(comp => {
  const fullPath = path.join(__dirname, comp);
  checkFile(fullPath, 'component');
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ ${comp}`);
  } else {
    console.log(`  ❌ ${comp} - MISSING`);
  }
});

// Check all page files
const pages = [
  'src/pages/Dashboard.tsx',
  'src/pages/TimeTracker.tsx',
  'src/pages/Projects.tsx',
  'src/pages/Team.tsx',
  'src/pages/Analytics.tsx',
  'src/pages/Reports.tsx',
  'src/pages/Settings.tsx',
  'src/pages/auth/Login.tsx',
  'src/pages/auth/Signup.tsx'
];

console.log('\n📁 Checking Pages:');
pages.forEach(page => {
  const fullPath = path.join(__dirname, page);
  checkFile(fullPath, 'page');
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ ${page}`);
  } else {
    console.log(`  ❌ ${page} - MISSING`);
  }
});

// Check App.tsx
console.log('\n📁 Checking App.tsx:');
const appPath = path.join(__dirname, 'src/App.tsx');
if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf8');
  console.log(`  ✅ src/App.tsx exists (${appContent.length} chars)`);
  
  // Check for route imports
  const requiredImports = ['Dashboard', 'TimeTracker', 'Projects', 'Team', 'Analytics', 'Reports', 'Settings', 'Login', 'Signup'];
  const missingImports = [];
  requiredImports.forEach(imp => {
    if (!appContent.includes(imp)) {
      missingImports.push(imp);
    }
  });
  
  if (missingImports.length > 0) {
    issues.push(`⚠️  App.tsx missing imports: ${missingImports.join(', ')}`);
  }
} else {
  issues.push(`❌ src/App.tsx is MISSING!`);
}

// Check main.tsx
console.log('\n📁 Checking main.tsx:');
const mainPath = path.join(__dirname, 'src/main.tsx');
if (fs.existsSync(mainPath)) {
  const mainContent = fs.readFileSync(mainPath, 'utf8');
  console.log(`  ✅ src/main.tsx exists (${mainContent.length} chars)`);
  
  if (!mainContent.includes('createRoot')) {
    issues.push(`⚠️  main.tsx might not have proper React 18 rendering`);
  }
} else {
  issues.push(`❌ src/main.tsx is MISSING!`);
}

// Check package.json for dependencies
console.log('\n📦 Checking Dependencies:');
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const required = ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'recharts', 'lucide-react'];
  
  required.forEach(dep => {
    if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
      console.log(`  ✅ ${dep}`);
    } else {
      issues.push(`❌ Missing dependency: ${dep}`);
      console.log(`  ❌ ${dep} - NOT INSTALLED`);
    }
  });
}

// Check Tailwind config
console.log('\n🎨 Checking Tailwind:');
const tailwindPath = path.join(__dirname, 'tailwind.config.cjs');
const tailwindJsPath = path.join(__dirname, 'tailwind.config.js');
if (fs.existsSync(tailwindPath)) {
  console.log(`  ✅ tailwind.config.cjs exists`);
} else if (fs.existsSync(tailwindJsPath)) {
  console.log(`  ✅ tailwind.config.js exists`);
} else {
  issues.push(`❌ tailwind.config file missing`);
}

const postcssPath = path.join(__dirname, 'postcss.config.cjs');
const postcssJsPath = path.join(__dirname, 'postcss.config.js');
if (fs.existsSync(postcssPath)) {
  console.log(`  ✅ postcss.config.cjs exists`);
} else if (fs.existsSync(postcssJsPath)) {
  console.log(`  ✅ postcss.config.js exists`);
} else {
  issues.push(`❌ postcss.config file missing`);
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 DIAGNOSTIC SUMMARY:\n');

if (issues.length === 0) {
  console.log('✅ No issues found! The app should work.');
  console.log('\n💡 Try:');
  console.log('   1. Delete node_modules/.vite folder');
  console.log('   2. Run: npm run dev');
  console.log('   3. Hard refresh browser (Ctrl+Shift+R)');
} else {
  console.log(`⚠️  Found ${issues.length} issue(s):\n`);
  issues.forEach(issue => console.log(`   ${issue}`));
}

console.log('\n' + '='.repeat(60));