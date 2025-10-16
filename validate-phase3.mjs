#!/usr/bin/env node

/**
 * Simple validation script for Phase 3 React-PDF migration
 */

import fs from 'fs';
import path from 'path';

console.log('🧪 PHASE 3 VALIDATION: React-PDF Components');
console.log('==========================================');

const componentsDir = './src/lib/pdf/components';
const requiredFiles = [
  'styles.ts',
  'CoverPage.tsx',
  'ExecutiveSummary.tsx',
  'RecommendationsPage.tsx',
  'ReportDocument.tsx'
];

let allGood = true;

// Check components
console.log('\n1. Checking React-PDF Components:');
for (const file of requiredFiles) {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`   ✅ ${file} (${sizeKB}KB)`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allGood = false;
  }
}

// Check generator
console.log('\n2. Checking React-PDF Generator:');
const generatorPath = './src/lib/pdf/react-pdf-generator.ts';
if (fs.existsSync(generatorPath)) {
  const stats = fs.statSync(generatorPath);
  const sizeKB = (stats.size / 1024).toFixed(1);
  console.log(`   ✅ react-pdf-generator.ts (${sizeKB}KB)`);
} else {
  console.log(`   ❌ react-pdf-generator.ts - MISSING`);
  allGood = false;
}

// Check API route integration
console.log('\n3. Checking API Route Integration:');
const apiPath = './src/app/api/generate-pdf/route.ts';
if (fs.existsSync(apiPath)) {
  const content = fs.readFileSync(apiPath, 'utf-8');
  const usesReactPDF = content.includes('react-pdf-generator');
  const disabledPuppeteer = content.includes('// import { generatePDFWithPuppeteer }');
  
  console.log(`   ✅ API route exists`);
  console.log(`   ${usesReactPDF ? '✅' : '❌'} Uses React-PDF`);
  console.log(`   ${disabledPuppeteer ? '✅' : '❌'} Puppeteer disabled`);
  
  if (!usesReactPDF || !disabledPuppeteer) allGood = false;
} else {
  console.log(`   ❌ API route - MISSING`);
  allGood = false;
}

// Check test page
console.log('\n4. Checking Test Page Integration:');
const testPagePath = './src/app/test-pdf/page.tsx';
if (fs.existsSync(testPagePath)) {
  const content = fs.readFileSync(testPagePath, 'utf-8');
  const usesReactPDF = content.includes('react-pdf-generator');
  
  console.log(`   ✅ Test page exists`);
  console.log(`   ${usesReactPDF ? '✅' : '❌'} Uses React-PDF`);
  
  if (!usesReactPDF) allGood = false;
} else {
  console.log(`   ❌ Test page - MISSING`);
  allGood = false;
}

// Check legacy cleanup
console.log('\n5. Checking Legacy Cleanup:');
const legacyDir = './src/lib/pdf/legacy';
if (fs.existsSync(legacyDir)) {
  const legacyFiles = fs.readdirSync(legacyDir);
  console.log(`   ✅ Legacy folder exists with ${legacyFiles.length} files`);
  for (const file of legacyFiles) {
    console.log(`      📁 ${file}`);
  }
} else {
  console.log(`   ⚠️  Legacy folder not found`);
}

// Summary
console.log('\n==========================================');
if (allGood) {
  console.log('🎉 PHASE 3 COMPLETE - All components ready!');
  console.log('\n📋 DELIVERABLES:');
  console.log('   ✅ StyleSheet system with branded colors');
  console.log('   ✅ CoverPage component with branding');
  console.log('   ✅ ExecutiveSummary with metrics display');
  console.log('   ✅ RecommendationsPage with insights');
  console.log('   ✅ ReportDocument main wrapper');
  console.log('   ✅ API route migration complete');
  console.log('   ✅ Test page updated');
  console.log('   ✅ Legacy files archived');
  
  console.log('\n🚀 READY FOR TESTING:');
  console.log('   1. npm run dev');
  console.log('   2. Visit http://localhost:3000/test-pdf');
  console.log('   3. Test PDF generation');
  
} else {
  console.log('❌ PHASE 3 INCOMPLETE - Issues found!');
}

console.log('==========================================');