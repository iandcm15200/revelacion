const fs = require('fs');

const filePath = 'app/login/page.tsx';
const buffer = fs.readFileSync(filePath);
let content = buffer.toString('utf-8');

console.log('=== Corrección Master de Emojis ===\n');

// Usar Buffer.from con los bytes exactos encontrados anteriormente
const replacements = [
  // Emojis compuestos (más largos primero para evitar reemplazos parciales)
  { bytes: [0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x99, 0xe2, 0x84, 0xa2], emoji: '', name: 'corazón azul' },
  { bytes: [0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x99, 0xe2, 0x80, 0x94], emoji: '', name: 'corazón rosa' },
  { bytes: [0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x98, 0xc2, 0xa4], emoji: '', name: 'persona' },
  { bytes: [0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x98, 0xc2, 0xb6], emoji: '', name: 'bebé' },
  { bytes: [0xc3, 0xb0, 0xc5, 0xb8, 0xc5, 0xbd, 0xe2, 0x80, 0xb0], emoji: '', name: 'fiesta' },
  { bytes: [0xc3, 0xb0, 0xc5, 0xb8, 0xc5, 0xbd, 0xe2, 0x82, 0xac], emoji: '', name: 'moño' },
  { bytes: [0xc3, 0xb0, 0xc5, 0xb8, 0xc5, 0xbd, 0xcb, 0x86], emoji: '', name: 'globo' },
  { bytes: [0xc3, 0xb0, 0xc5, 0xb8, 0xc2, 0x8d, 0xc2, 0xbc], emoji: '', name: 'osito (largo)' },
  { bytes: [0xc3, 0xb0, 0xc5, 0xb8, 0xc2, 0xbc], emoji: '', name: 'osito (corto)' },
  { bytes: [0xc3, 0xb0, 0xc5, 0xb8, 0xc5, 0xbd], emoji: '', name: 'regalo' }
];

let totalCount = 0;

replacements.forEach(({ bytes, emoji, name }) => {
  const badStr = Buffer.from(bytes).toString('utf-8');
  const count = content.split(badStr).length - 1;
  
  if (count > 0) {
    content = content.split(badStr).join(emoji);
    console.log('', name.padEnd(20), emoji, '(' + count + 'x)');
    totalCount += count;
  }
});

fs.writeFileSync(filePath, content, 'utf-8');

console.log('\n TOTAL:', totalCount, 'emojis corregidos\n');

// Verificación
const lines = content.split('\n');
console.log('Verificación de líneas clave:');
console.log('1226:', lines[1226].trim().substring(0, 50));
console.log('1245:', lines[1245].trim().substring(0, 50));
console.log('1311:', lines[1311].trim().substring(0, 50));
console.log('1326:', lines[1326].trim().substring(0, 50));
