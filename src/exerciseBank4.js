// ============================================================
//  BANCO DE EJERCICIOS GRADO 3 (PARTE 2)
//  Ecuaciones Cuadráticas | Ley de Senos | Ley de Cosenos
// ============================================================

// ===================== SVG HELPERS ========================

function svgGenericTriangle(a, b, c, labels, title) {
  // A is opposite a, B is opposite b, C is opposite c
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const sinA = Math.sqrt(1 - cosA * cosA);
  let xC = b * cosA;
  let yC = b * sinA;
  
  let minX = Math.min(0, c, xC);
  let maxX = Math.max(0, c, xC);
  let w = maxX - minX;
  let h = yC;
  if (h === 0) h = 1; 
  
  const scaleX = 200 / w;
  const scaleY = 110 / h;
  const scale = Math.min(scaleX, scaleY);
  
  xC *= scale; yC *= scale; 
  let sc = c * scale;
  
  const scaledMinX = Math.min(0, sc, xC);
  const scaledMaxX = Math.max(0, sc, xC);
  const scaledW = scaledMaxX - scaledMinX;
  const offsetX = (310 - scaledW) / 2 - scaledMinX;
  
  const scaledH = yC;
  const offsetY = (180 - scaledH) / 2 + 20; 
  
  const ptA = { x: offsetX, y: offsetY + scaledH };
  const ptB = { x: offsetX + sc, y: offsetY + scaledH };
  const ptC = { x: offsetX + xC, y: offsetY + scaledH - yC };

  const midAB = { x: (ptA.x + ptB.x) / 2, y: (ptA.y + ptB.y) / 2 + 18 };
  const midBC = { x: (ptB.x + ptC.x) / 2 + 15, y: (ptB.y + ptC.y) / 2 };
  const midCA = { x: (ptC.x + ptA.x) / 2 - 15, y: (ptC.y + ptA.y) / 2 };

  const angA = { x: ptA.x + 20, y: ptA.y - 8 };
  const angB = { x: ptB.x - 20, y: ptB.y - 8 };
  const angC = { x: ptC.x, y: ptC.y + 20 };

  const getCol = (val) => (val === 'x' || val === '?' || (typeof val === 'string' && val.includes('?'))) ? '#EF4444' : '#1E293B';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="210" viewBox="0 0 310 210">
    <rect width="310" height="210" rx="16" fill="#F8FAFC"/>
    <text x="155" y="25" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#475569" letter-spacing="1">${title}</text>
    
    <polygon points="${ptA.x},${ptA.y} ${ptB.x},${ptB.y} ${ptC.x},${ptC.y}" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2.5"/>
    
    ${labels.c ? `<text x="${midAB.x}" y="${midAB.y}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="${getCol(labels.c)}">${labels.c}</text>` : ''}
    ${labels.a ? `<text x="${midBC.x}" y="${midBC.y}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="${getCol(labels.a)}">${labels.a}</text>` : ''}
    ${labels.b ? `<text x="${midCA.x}" y="${midCA.y}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="${getCol(labels.b)}">${labels.b}</text>` : ''}

    ${labels.A ? `<text x="${angA.x}" y="${angA.y}" text-anchor="start" font-family="Arial" font-size="13" fill="${getCol(labels.A)}">${labels.A}</text>` : ''}
    ${labels.B ? `<text x="${angB.x}" y="${angB.y}" text-anchor="end" font-family="Arial" font-size="13" fill="${getCol(labels.B)}">${labels.B}</text>` : ''}
    ${labels.C ? `<text x="${angC.x}" y="${angC.y}" text-anchor="middle" font-family="Arial" font-size="13" fill="${getCol(labels.C)}">${labels.C}</text>` : ''}
    
    <text x="155" y="195" text-anchor="middle" font-family="Arial" font-size="10" fill="#64748B" font-style="italic">* Redondea tu respuesta al número entero más cercano *</text>
  </svg>`;
}

function svgCuadratica(title, equation) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="150" viewBox="0 0 310 150">
    <rect width="310" height="150" rx="16" fill="#FEF2F2"/>
    <text x="155" y="30" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#B91C1C">${title}</text>
    <rect x="25" y="45" width="260" height="60" rx="8" fill="#FFFFFF" stroke="#FECACA" stroke-width="2"/>
    <text x="155" y="82" text-anchor="middle" font-family="Arial" font-size="22" font-weight="bold" fill="#1E293B">${equation}</text>
    <text x="155" y="130" text-anchor="middle" font-family="Arial" font-size="11" fill="#7F1D1D" font-style="italic">Escribe el MAYOR valor posible para x</text>
  </svg>`;
}

// ============================================================
//  GENERADOR: ECUACIONES CUADRÁTICAS (30+ ejercicios)
// ============================================================
export function generateEcuacionesCuadraticasExercises() {
  const exercises = [];
  const G = '3';
  const T = 'Ecuaciones de 2do Grado';

  // Generamos 30 ecuaciones diferentes usando raíces enteras
  for (let i = 0; i < 30; i++) {
    // Escoger dos raíces r1 y r2
    // Asegurar que al menos una no sea tan trivial, rango [-12, 12]
    let r1 = Math.floor(Math.random() * 25) - 12;
    let r2 = Math.floor(Math.random() * 25) - 12;
    
    // Si ambas son iguales, cambiar una
    if (r1 === r2) r2 += (r2 < 0 ? 1 : -1);

    const maxRoot = Math.max(r1, r2);
    
    const sum = r1 + r2;
    const prod = r1 * r2;
    
    let eq = 'x² ';
    if (sum < 0) eq += `+ ${Math.abs(sum)}x `;
    else if (sum > 0) eq += `- ${sum}x `;
    
    if (prod > 0) eq += `+ ${prod} = 0`;
    else if (prod < 0) eq += `- ${Math.abs(prod)} = 0`;
    else eq += `= 0`; // prod = 0

    // Limpiar casos raros como "1x"
    eq = eq.replace(' 1x ', ' x ').replace('- 1x ', '- x ').replace('+ 1x ', '+ x ');
    
    exercises.push({
      grade: G,
      topic: T,
      subtype: 'cuadratica_completas',
      difficulty: 3,
      question: `Resuelve la siguiente ecuación y escribe la raíz (valor de x) más grande.`,
      svgData: svgCuadratica('ECUACIÓN CUADRÁTICA', eq),
      answer: maxRoot,
      hint: '', // Sin pistas
    });
  }
  
  return exercises;
}

// ============================================================
//  GENERADOR: LEY DE SENOS (30+ ejercicios)
// ============================================================
export function generateLeySenosExercises() {
  const exercises = [];
  const G = '3';
  const T = 'Ley de Senos';

  for (let i = 0; i < 30; i++) {
    // Ángulos A y B en grados
    const A_deg = Math.floor(Math.random() * 80) + 30; // 30 a 110
    const B_deg = Math.floor(Math.random() * (160 - A_deg)) + 20; // 20 a (160-A)
    const C_deg = 180 - A_deg - B_deg;

    const A = A_deg * Math.PI / 180;
    const B = B_deg * Math.PI / 180;
    const C = C_deg * Math.PI / 180;

    // Lado c aleatorio
    const c = Math.floor(Math.random() * 40) + 10;
    
    const a = c * Math.sin(A) / Math.sin(C);
    const b = c * Math.sin(B) / Math.sin(C);

    const isFindingSide = Math.random() > 0.5;

    let labels = {};
    let answer;
    let questionText = '';

    if (isFindingSide) {
      // Find side b given A, B, a
      labels = { A: `${A_deg}°`, B: `${B_deg}°`, a: `${Math.round(a)}`, b: 'x' };
      answer = Math.round(b);
      questionText = 'Utiliza la Ley de Senos para encontrar el lado x.';
    } else {
      // Find angle B given a, b, A
      labels = { A: `${A_deg}°`, a: `${Math.round(a)}`, b: `${Math.round(b)}`, B: 'x°' };
      answer = B_deg;
      questionText = 'Utiliza la Ley de Senos para encontrar el ángulo x.';
    }

    exercises.push({
      grade: G,
      topic: T,
      subtype: isFindingSide ? 'find_side' : 'find_angle',
      difficulty: 3,
      question: questionText,
      svgData: svgGenericTriangle(a, b, c, labels, 'LEY DE SENOS'),
      answer: answer,
      hint: '', // Sin pistas
    });
  }

  return exercises;
}

// ============================================================
//  GENERADOR: LEY DE COSENOS (30+ ejercicios)
// ============================================================
export function generateLeyCosenosExercises() {
  const exercises = [];
  const G = '3';
  const T = 'Ley de Cosenos';

  for (let i = 0; i < 30; i++) {
    const A_deg = Math.floor(Math.random() * 80) + 30; 
    const B_deg = Math.floor(Math.random() * (160 - A_deg)) + 20; 
    const C_deg = 180 - A_deg - B_deg;

    const A = A_deg * Math.PI / 180;
    const B = B_deg * Math.PI / 180;
    const C = C_deg * Math.PI / 180;

    const c = Math.floor(Math.random() * 40) + 15;
    const a = c * Math.sin(A) / Math.sin(C);
    const b = c * Math.sin(B) / Math.sin(C);

    const isFindingSide = Math.random() > 0.5;

    let labels = {};
    let answer;
    let questionText = '';

    if (isFindingSide) {
      // Find side c given a, b, C
      labels = { a: `${Math.round(a)}`, b: `${Math.round(b)}`, C: `${C_deg}°`, c: 'x' };
      answer = Math.round(c);
      questionText = 'Utiliza la Ley de Cosenos para calcular el lado x.';
    } else {
      // Find angle C given a, b, c
      labels = { a: `${Math.round(a)}`, b: `${Math.round(b)}`, c: `${Math.round(c)}`, C: 'x°' };
      answer = C_deg;
      questionText = 'Utiliza la Ley de Cosenos para calcular el ángulo x.';
    }

    exercises.push({
      grade: G,
      topic: T,
      subtype: isFindingSide ? 'find_side' : 'find_angle',
      difficulty: 3,
      question: questionText,
      svgData: svgGenericTriangle(a, b, c, labels, 'LEY DE COSENOS'),
      answer: answer,
      hint: '', // Sin pistas
    });
  }

  return exercises;
}
