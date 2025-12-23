const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'login', 'page.tsx');

// Leer archivo como buffer binario
const buffer = fs.readFileSync(filePath);

// Convertir a string UTF-8
let content = buffer.toString('utf-8');

console.log('Tamaño original:', content.length, 'caracteres\n');

// Mapa de todos los emojis - ORDEN IMPORTA (más largos primero)
const emojiMap = {
  // Emojis compuestos (más largos primero)
  '\u00C3\u00B0\u00C5\u00B8\u00C5\u00BD\u00E2\u0082\u00AC\u00C3\u00B0\u00C5\u00B8\u00E2\u0080\u0098\u00E2\u0084\u00A2': '',
  '\u00C3\u00B0\u00C5\u00B8\u00E2\u0080\u0098\u00E2\u0080\u0094\u00C3\u00B0\u00C5\u00B8\u00E2\u0080\u0098\u00E2\u0084\u00A2': '',
  
  // Emojis individuales (más largos primero)
  '\u00C3\u00B0\u00C5\u00B8\u00E2\u0080\u0098\u00E2\u0084\u00A2': '',
  '\u00C3\u00B0\u00C5\u00B8\u00E2\u0080\u0098\u00E2\u0080\u0094': '',
  '\u00C3\u00B0\u00C5\u00B8\u00E2\u0080\u0098\u00C2\u00A4': '',
  '\u00C3\u00B0\u00C5\u00B8\u00E2\u0080\u0098\u00C2\u00B6': '',
  '\u00C3\u00B0\u00C5\u00B8\u00C5\u00BD\u00E2\u0080\u00B0': '',
  '\u00C3\u00B0\u00C5\u00B8\u00C5\u00BD\u00E2\u0082\u00AC': '',
  '\u00C3\u00B0\u00C5\u00B8\u00C5\u00BD\u00CB\u0086': '',
  '\u00C3\u00B0\u00C5\u00B8\u00C2\u008D\u00C2\u00BC': '',
  '\u00C3\u00B0\u00C5\u00B8\u00C2\u00BC': '',
  '\u00C3\u00B0\u00C5\u00B8\u00C5\u00BD': '',
  
  // Placeholder con soft hyphens
  'Mar\u00C3\u00B1\u00C2\u00AD\u00C3\u00ADa Garc\u00C3\u00B1\u00C2\u00AD\u00C3\u00ADa': 'María García'
};

let totalReplacements = 0;

// Aplicar reemplazos en orden
Object.keys(emojiMap).forEach((badStr, index) => {
  const goodStr = emojiMap[badStr];
  const originalLength = content.length;
  
  if (content.includes(badStr)) {
    const count = content.split(badStr).length - 1;
    content = content.split(badStr).join(goodStr);
    console.log((index + 1) + '.', badStr.substring(0, 10) + '...', '', goodStr, '(' + count + 'x)');
    totalReplacements += count;
  }
});

// Guardar archivo
fs.writeFileSync(filePath, content, 'utf-8');

console.log('\n Total:', totalReplacements, 'reemplazos realizados');
console.log('Tamaño final:', content.length, 'caracteres');
