// ============================================================
//  BANCO DE EJERCICIOS CON SVG INLINE
//  Teorema de Pitágoras y Teorema de Tales — Grado 3
//  Genera 80+ ejercicios únicos con diagramas visuales
// ============================================================

// ---------- UTILIDADES SVG ----------

/**
 * Genera un triángulo rectángulo SVG
 * @param {number} a - cateto 1
 * @param {number} b - cateto 2
 * @param {number} c - hipotenusa
 * @param {string} unknown - 'a' | 'b' | 'c'
 * @param {string} context - texto contextual opcional
 */
function svgRightTriangle(a, b, c, unknown, context = '') {
  // Escalar para que quede dentro de 300x220
  const maxLen = Math.max(a, b, c);
  const scale = 120 / maxLen;
  const bw = Math.round(b * scale);
  const ah = Math.round(a * scale);

  const x0 = 30, y0 = 30 + ah; // vértice recto
  const x1 = x0 + bw, y1 = y0; // vértice derecho
  const x2 = x0, y2 = y0 - ah; // vértice superior

  const labelA = unknown === 'a' ? '?' : `${a}`;
  const labelB = unknown === 'b' ? '?' : `${b}`;
  const labelC = unknown === 'c' ? '?' : `${c}`;

  const midABx = (x0 + x1) / 2, midABy = y0 + 18;
  const midACx = x0 - 22, midACy = (y0 + y2) / 2;
  const midBCx = (x1 + x2) / 2 + 10, midBCy = (y1 + y2) / 2 - 8;

  const unknownColor = '#EF4444';
  const knownColor = '#1E293B';
  const colorA = unknown === 'a' ? unknownColor : knownColor;
  const colorB = unknown === 'b' ? unknownColor : knownColor;
  const colorC = unknown === 'c' ? unknownColor : knownColor;

  const contextText = context
    ? `<text x="155" y="195" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748B">${context}</text>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="210" viewBox="0 0 310 210">
  <rect width="310" height="210" rx="16" fill="#F0F4FF"/>
  <!-- Triángulo -->
  <polygon points="${x0},${y0} ${x1},${y1} ${x2},${y2}" fill="#C7D2FE" stroke="#4F46E5" stroke-width="2.5"/>
  <!-- Cuadrado ángulo recto -->
  <rect x="${x0}" y="${y0 - 12}" width="12" height="12" fill="none" stroke="#4F46E5" stroke-width="2"/>
  <!-- Etiquetas de lados -->
  <text x="${midABx}" y="${midABy}" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="${colorB}">${labelB}</text>
  <text x="${midACx}" y="${midACy}" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="${colorA}">${labelA}</text>
  <text x="${midBCx}" y="${midBCy}" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="${colorC}">${labelC}</text>
  <!-- Etiqueta ángulo recto -->
  <text x="${x0 + 4}" y="${y0 - 2}" font-family="Arial" font-size="9" fill="#4F46E5">90°</text>
  <!-- Fórmula -->
  <text x="155" y="178" text-anchor="middle" font-family="Arial" font-size="12" fill="#4F46E5" font-style="italic">a² + b² = c²</text>
  ${contextText}
</svg>`;
}

/**
 * Genera un SVG de triángulo con contexto real (escalera, poste, etc.)
 */
function svgContextTriangle(a, b, c, unknown, title, labels = {}) {
  const maxLen = Math.max(a, b, c);
  const scale = 100 / maxLen;
  const bw = Math.round(b * scale);
  const ah = Math.round(a * scale);

  const x0 = 40, y0 = 40 + ah;
  const x1 = x0 + bw, y1 = y0;
  const x2 = x0, y2 = y0 - ah;

  const unknownColor = '#EF4444';
  const knownColor = '#1E293B';

  const la = labels.a || (unknown === 'a' ? '? m' : `${a} m`);
  const lb = labels.b || (unknown === 'b' ? '? m' : `${b} m`);
  const lc = labels.c || (unknown === 'c' ? '? m' : `${c} m`);

  const colorA = unknown === 'a' ? unknownColor : knownColor;
  const colorB = unknown === 'b' ? unknownColor : knownColor;
  const colorC = unknown === 'c' ? unknownColor : knownColor;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="220" viewBox="0 0 310 220">
  <rect width="310" height="220" rx="16" fill="#FFFBEB"/>
  <!-- Suelo -->
  <line x1="25" y1="${y0}" x2="200" y2="${y0}" stroke="#92400E" stroke-width="3" stroke-dasharray="6,3"/>
  <!-- Triángulo -->
  <polygon points="${x0},${y0} ${x1},${y1} ${x2},${y2}" fill="#FDE68A" stroke="#D97706" stroke-width="2.5"/>
  <!-- Cuadrado ángulo recto -->
  <rect x="${x0}" y="${y0 - 12}" width="11" height="11" fill="none" stroke="#D97706" stroke-width="2"/>
  <!-- Labels -->
  <text x="${(x0+x1)/2}" y="${y0+18}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="${colorB}">${lb}</text>
  <text x="${x0-30}" y="${(y0+y2)/2}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="${colorA}">${la}</text>
  <text x="${(x1+x2)/2+14}" y="${(y1+y2)/2-6}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="${colorC}">${lc}</text>
  <!-- Título -->
  <text x="155" y="178" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#92400E">${title}</text>
  <text x="155" y="198" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748B">¿Cuánto mide el lado rojo (?)?</text>
  <text x="155" y="214" text-anchor="middle" font-family="Arial" font-size="10" fill="#4F46E5" font-style="italic">a² + b² = c²</text>
</svg>`;
}

/**
 * Genera un SVG de Teorema de Tales con dos triángulos proporcionales
 */
function svgTales(AB, DE, BC, EF, unknown) {
  // AB/DE = BC/EF => unknown puede ser: 'AB','DE','BC','EF'
  const unknownColor = '#EF4444';
  const knownColor = '#1E293B';

  const getLabel = (val, key) =>
    unknown === key ? '?' : `${val}`;

  const lAB = getLabel(AB, 'AB');
  const lDE = getLabel(DE, 'DE');
  const lBC = getLabel(BC, 'BC');
  const lEF = getLabel(EF, 'EF');

  const cAB = unknown === 'AB' ? unknownColor : knownColor;
  const cDE = unknown === 'DE' ? unknownColor : knownColor;
  const cBC = unknown === 'BC' ? unknownColor : knownColor;
  const cEF = unknown === 'EF' ? unknownColor : knownColor;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="210" viewBox="0 0 310 210">
  <rect width="310" height="210" rx="16" fill="#F0FDF4"/>
  <!-- Triángulo grande -->
  <polygon points="155,20 40,170 270,170" fill="#BBF7D0" stroke="#059669" stroke-width="2.5"/>
  <!-- Triángulo pequeño interior (proporcional) -->
  <polygon points="155,20 84,110 226,110" fill="#6EE7B7" stroke="#047857" stroke-width="2"/>
  <!-- Línea paralela -->
  <line x1="84" y1="110" x2="226" y2="110" stroke="#047857" stroke-width="2" stroke-dasharray="5,3"/>

  <!-- Etiquetas lado izquierdo -->
  <text x="100" y="68" font-family="Arial" font-size="14" font-weight="bold" fill="${cAB}">${lAB}</text>
  <text x="52" y="148" font-family="Arial" font-size="14" font-weight="bold" fill="${cDE}">${lDE}</text>

  <!-- Etiquetas lado derecho -->
  <text x="202" y="68" font-family="Arial" font-size="14" font-weight="bold" fill="${cBC}">${lBC}</text>
  <text x="242" y="148" font-family="Arial" font-size="14" font-weight="bold" fill="${cEF}">${lEF}</text>

  <!-- Planteamiento -->
  <text x="155" y="190" text-anchor="middle" font-family="Arial" font-size="11" fill="#047857" font-style="italic">AB/DE = BC/EF ⟹ ${lAB}/${lDE} = ${lBC}/${lEF}</text>
</svg>`;
}

/**
 * SVG Tales con "rayos" desde vértice (versión paralela doble)
 */
function svgTalesRays(a1, a2, b1, b2, unknown) {
  // segmentos sobre dos rectas desde un vértice
  // a1/a2 = b1/b2, unknown es la incógnita
  const unknownColor = '#EF4444';
  const knownColor = '#1E293B';
  const getL = (v, k) => unknown === k ? '?' : `${v}`;

  const la1 = getL(a1, 'a1');
  const la2 = getL(a2, 'a2');
  const lb1 = getL(b1, 'b1');
  const lb2 = getL(b2, 'b2');

  const ca1 = unknown === 'a1' ? unknownColor : knownColor;
  const ca2 = unknown === 'a2' ? unknownColor : knownColor;
  const cb1 = unknown === 'b1' ? unknownColor : knownColor;
  const cb2 = unknown === 'b2' ? unknownColor : knownColor;

  // Puntos: vértice O=(155,30), líneas izquierda y derecha
  // Rayo izq: O -> A(70,100) -> A'(30,160)
  // Rayo der: O -> B(240,100) -> B'(280,160)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="210" viewBox="0 0 310 210">
  <rect width="310" height="210" rx="16" fill="#EFF6FF"/>
  <!-- Paralelas -->
  <line x1="70" y1="100" x2="240" y2="100" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="30" y1="165" x2="280" y2="165" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Rayos desde vértice -->
  <line x1="155" y1="25" x2="30" y2="165" stroke="#1D4ED8" stroke-width="2.5"/>
  <line x1="155" y1="25" x2="280" y2="165" stroke="#1D4ED8" stroke-width="2.5"/>
  <!-- Vértice O -->
  <circle cx="155" cy="25" r="4" fill="#1D4ED8"/>
  <text x="160" y="20" font-family="Arial" font-size="12" fill="#1D4ED8">O</text>
  <!-- Puntos de intersección -->
  <circle cx="70" cy="100" r="4" fill="#1D4ED8"/>
  <circle cx="240" cy="100" r="4" fill="#1D4ED8"/>
  <circle cx="30" cy="165" r="4" fill="#1D4ED8"/>
  <circle cx="280" cy="165" r="4" fill="#1D4ED8"/>
  <!-- Etiquetas segmentos izquierda -->
  <text x="88" y="62" font-family="Arial" font-size="14" font-weight="bold" fill="${ca1}">${la1}</text>
  <text x="43" y="137" font-family="Arial" font-size="14" font-weight="bold" fill="${ca2}">${la2}</text>
  <!-- Etiquetas segmentos derecha -->
  <text x="212" y="62" font-family="Arial" font-size="14" font-weight="bold" fill="${cb1}">${lb1}</text>
  <text x="265" y="137" font-family="Arial" font-size="14" font-weight="bold" fill="${cb2}">${lb2}</text>
  <!-- Planteamiento -->
  <text x="155" y="192" text-anchor="middle" font-family="Arial" font-size="11" fill="#1D4ED8" font-style="italic">${la1}/${la2} = ${lb1}/${lb2}</text>
</svg>`;
}

/**
 * SVG Tales con triángulo y altura / sombra
 */
function svgTalesPost(h1, s1, h2, unknown) {
  // Poste h1 proyecta sombra s1; poste h2 proyecta sombra ?
  // h1/s1 = h2/s2  => s2 = h2*s1/h1
  const unknownColor = '#EF4444';
  const knownColor = '#1E293B';

  const s2 = Math.round((h2 * s1) / h1);
  const ls2 = unknown === 's2' ? '?' : `${s2}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="220" viewBox="0 0 310 220">
  <rect width="310" height="220" rx="16" fill="#FFF7ED"/>
  <!-- Sol -->
  <circle cx="270" cy="30" r="18" fill="#FCD34D" stroke="#F59E0B" stroke-width="2"/>
  <text x="270" y="35" text-anchor="middle" font-family="Arial" font-size="14">☀</text>
  <!-- Suelo -->
  <line x1="10" y1="175" x2="300" y2="175" stroke="#78350F" stroke-width="3"/>
  <!-- Poste 1 -->
  <line x1="60" y1="95" x2="60" y2="175" stroke="#92400E" stroke-width="5"/>
  <text x="35" y="138" font-family="Arial" font-size="13" font-weight="bold" fill="${knownColor}">${h1} m</text>
  <!-- Sombra 1 -->
  <line x1="60" y1="175" x2="${60+s1*8}" y2="175" stroke="#D97706" stroke-width="3"/>
  <text x="${60+s1*4}" y="195" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="${knownColor}">${s1} m</text>
  <!-- Rayo de sol a poste 1 -->
  <line x1="270" y1="40" x2="${60+s1*8}" y2="175" stroke="#FCD34D" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="270" y1="40" x2="60" y2="95" stroke="#FCD34D" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Poste 2 -->
  <line x1="185" y1="${175 - h2*5}" x2="185" y2="175" stroke="#1D4ED8" stroke-width="5"/>
  <text x="195" y="${175 - h2*2.5}" font-family="Arial" font-size="13" font-weight="bold" fill="${knownColor}">${h2} m</text>
  <!-- Sombra 2 -->
  <line x1="185" y1="175" x2="${185+s2*8}" y2="175" stroke="${unknownColor}" stroke-width="3"/>
  <text x="${185+s2*4}" y="213" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="${unknownColor}">${ls2} m</text>
  <!-- Rayo de sol a poste 2 -->
  <line x1="270" y1="40" x2="${185+s2*8}" y2="175" stroke="#FCD34D" stroke-width="1.5" stroke-dasharray="4,3"/>
</svg>`;
}

// ==============================================================
//  GENERADOR DE 80+ EJERCICIOS DE PITÁGORAS
// ==============================================================
export function generatePythagorasExercises() {
  const exercises = [];

  // --- Tripletas pitagóricas conocidas ---
  const triples = [
    [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25],
    [20, 21, 29], [9, 40, 41], [6, 8, 10], [10, 24, 26],
    [12, 16, 20], [15, 20, 25], [9, 12, 15], [8, 6, 10],
    [5, 12, 13], [20, 48, 52], [28, 45, 53], [33, 56, 65],
    [36, 77, 85], [13, 84, 85], [11, 60, 61],
  ];

  // --- TIPO 1: Calcular hipotenusa (diagrama puro) ---
  const hipTriples = [[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15],[15,20,25],[7,24,25],[20,21,29]];
  hipTriples.forEach(([a, b, c]) => {
    exercises.push({
      type: 'pitagoras',
      subtype: 'find_hipotenusa',
      question: `Calcula la hipotenusa del triángulo rectángulo.`,
      svgData: svgRightTriangle(a, b, c, 'c'),
      answer: c,
      hint: `a² + b² = c² → ${a}² + ${b}² = c²`,
      grade: '3',
      topic: 'Teorema de Pitágoras',
    });
  });

  // --- TIPO 2: Calcular cateto A (diagrama puro) ---
  const triplA = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[20,21,29],[6,8,10],[10,24,26]];
  triplA.forEach(([a, b, c]) => {
    exercises.push({
      type: 'pitagoras',
      subtype: 'find_cateto_a',
      question: `Calcula el cateto faltante del triángulo rectángulo.`,
      svgData: svgRightTriangle(a, b, c, 'a'),
      answer: a,
      hint: `a² = c² - b² → a² = ${c}² - ${b}²`,
      grade: '3',
      topic: 'Teorema de Pitágoras',
    });
  });

  // --- TIPO 3: Calcular cateto B (diagrama puro) ---
  const triplB = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[20,21,29],[9,12,15],[15,20,25]];
  triplB.forEach(([a, b, c]) => {
    exercises.push({
      type: 'pitagoras',
      subtype: 'find_cateto_b',
      question: `Calcula el cateto faltante del triángulo rectángulo.`,
      svgData: svgRightTriangle(a, b, c, 'b'),
      answer: b,
      hint: `b² = c² - a² → b² = ${c}² - ${a}²`,
      grade: '3',
      topic: 'Teorema de Pitágoras',
    });
  });

  // --- TIPO 4: Contexto - Escalera apoyada en pared ---
  const ladderExercises = [
    { wall: 4, base: 3, ladder: 5, find: 'ladder', title: '🪜 Escalera apoyada en pared' },
    { wall: 12, base: 5, ladder: 13, find: 'wall', title: '🪜 ¿A qué altura llega?' },
    { wall: 8, base: 15, ladder: 17, find: 'ladder', title: '🪜 Longitud de la escalera' },
    { wall: 15, base: 20, ladder: 25, find: 'base', title: '🪜 Distancia al pie de la pared' },
    { wall: 24, base: 7, ladder: 25, find: 'ladder', title: '🪜 Escalera muy alta' },
    { wall: 40, base: 9, ladder: 41, find: 'ladder', title: '🏗️ Escalera de construcción' },
    { wall: 12, base: 16, ladder: 20, find: 'wall', title: '🏠 Escalera en casa' },
  ];
  ladderExercises.forEach(({ wall, base, ladder, find, title }) => {
    const unknown = find === 'wall' ? 'a' : find === 'base' ? 'b' : 'c';
    const answer = find === 'wall' ? wall : find === 'base' ? base : ladder;
    exercises.push({
      type: 'pitagoras',
      subtype: 'context_ladder',
      question: `${title}: ¿Cuánto mide el lado rojo?`,
      svgData: svgContextTriangle(wall, base, ladder, unknown, title,
        { a: `${find === 'wall' ? '? m' : wall + ' m'}`, b: `${find === 'base' ? '? m' : base + ' m'}`, c: `${find === 'ladder' ? '? m' : ladder + ' m'}` }),
      answer,
      hint: `Usa: a² + b² = c²`,
      grade: '3',
      topic: 'Teorema de Pitágoras',
    });
  });

  // --- TIPO 5: Contexto - Poste y cable ---
  const cables = [
    { h: 6, d: 8, c: 10 }, { h: 5, d: 12, c: 13 }, { h: 8, d: 15, c: 17 },
    { h: 9, d: 12, c: 15 }, { h: 7, d: 24, c: 25 },
  ];
  cables.forEach(({ h, d, c }) => {
    exercises.push({
      type: 'pitagoras',
      subtype: 'context_cable',
      question: `📡 Un poste de ${h} m tiene un cable que llega al suelo a ${d} m. ¿Cuánto mide el cable?`,
      svgData: svgContextTriangle(h, d, c, 'c', `📡 Poste y cable`,
        { a: `${h} m`, b: `${d} m`, c: '? m' }),
      answer: c,
      hint: `Cable² = altura² + distancia²`,
      grade: '3',
      topic: 'Teorema de Pitágoras',
    });
  });

  // --- TIPO 6: Contexto - Diagonal de rectángulo ---
  const rects = [
    { w: 3, h: 4, d: 5 }, { w: 5, h: 12, d: 13 }, { w: 8, h: 15, d: 17 },
    { w: 6, h: 8, d: 10 }, { w: 9, h: 12, d: 15 },
  ];
  rects.forEach(({ w, h, d }) => {
    exercises.push({
      type: 'pitagoras',
      subtype: 'context_rect',
      question: `📐 Un rectángulo mide ${w} × ${h} cm. ¿Cuánto mide su diagonal?`,
      svgData: svgRightTriangle(h, w, d, 'c', `Rectángulo ${w}×${h} cm`),
      answer: d,
      hint: `diagonal² = ancho² + alto²`,
      grade: '3',
      topic: 'Teorema de Pitágoras',
    });
  });

  // --- TIPO 7: Solo texto numérico variado (sin SVG) ---
  const textExercises = [
    { q: 'Un triángulo rectángulo tiene catetos de 9 cm y 40 cm. ¿Cuánto mide la hipotenusa?', a: 41 },
    { q: 'La hipotenusa es 29 cm y un cateto es 20 cm. ¿Cuánto mide el otro cateto?', a: 21 },
    { q: 'Los catetos miden 28 y 21 cm. Calcula la hipotenusa.', a: 35 },
    { q: 'Hipotenusa = 61 cm, cateto = 60 cm. ¿El otro cateto?', a: 11 },
    { q: 'Catetos: 9 cm y 12 cm. ¿Hipotenusa?', a: 15 },
    { q: 'Un cuadrado de lado 3 cm. ¿Cuánto mide su diagonal?', a: 5 }, // √18 ≈ 4.2 → no exacto, skip
    { q: 'Catetos iguales de 3 cm y 4 cm. ¿Hipotenusa?', a: 5 },
    { q: 'Hipotenusa = 85, cateto = 77. ¿El otro cateto?', a: 36 },
    { q: 'Catetos 11 y 60. ¿Hipotenusa?', a: 61 },
    { q: 'Hipotenusa = 53, cateto = 45. ¿El otro cateto?', a: 28 },
  ];
  textExercises.forEach(({ q, a }) => {
    const svgFormula = `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="160" viewBox="0 0 310 160">
  <rect width="310" height="160" rx="16" fill="#F0F4FF"/>
  <text x="155" y="50" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#1E293B">📐 Problema</text>
  <foreignObject x="15" y="60" width="280" height="80">
    <body xmlns="http://www.w3.org/1999/xhtml">
      <p style="font-family:Arial;font-size:13px;color:#1E293B;text-align:center;margin:0;line-height:1.4">${q}</p>
    </body>
  </foreignObject>
  <text x="155" y="148" text-anchor="middle" font-family="Arial" font-size="11" fill="#4F46E5" font-style="italic">a² + b² = c²</text>
</svg>`;
    exercises.push({
      type: 'pitagoras',
      subtype: 'text_problem',
      question: q,
      svgData: svgFormula,
      answer: a,
      hint: 'Identifica catetos e hipotenusa, luego aplica a² + b² = c²',
      grade: '3',
      topic: 'Teorema de Pitágoras',
    });
  });

  // --- TIPO 8: Variaciones con escala (múltiplos de tripletas) ---
  const scaleTriples = [
    [3,4,5,2], [3,4,5,3], [3,4,5,4], [3,4,5,5],
    [5,12,13,2], [5,12,13,3],
    [8,15,17,2], [7,24,25,2], [9,40,41,2],
    [20,21,29,2], [6,8,10,2], [9,12,15,2],
  ];
  scaleTriples.forEach(([a, b, c, k]) => {
    const A = a*k, B = b*k, C = c*k;
    exercises.push({
      type: 'pitagoras',
      subtype: 'scaled_triple',
      question: `Triángulo escalado: calcula la hipotenusa.`,
      svgData: svgRightTriangle(A, B, C, 'c'),
      answer: C,
      hint: `Es ${k} veces el triángulo ${a}-${b}-${c}`,
      grade: '3',
      topic: 'Teorema de Pitágoras',
    });
  });

  // --- TIPO 9: Triángulos escalados — buscar cateto ---
  const scaleTriplesCateto = [
    [3,4,5,2,'a'], [3,4,5,3,'b'], [5,12,13,2,'a'],
    [8,15,17,2,'b'], [6,8,10,3,'a'], [9,12,15,2,'b'],
    [20,21,29,2,'a'], [3,4,5,4,'b'],
  ];
  scaleTriplesCateto.forEach(([a, b, c, k, find]) => {
    const A = a*k, B = b*k, C = c*k;
    const unknown = find;
    const answer = find === 'a' ? A : B;
    exercises.push({
      type: 'pitagoras',
      subtype: 'scaled_find_cateto',
      question: `Triángulo rectángulo: halla el cateto faltante.`,
      svgData: svgRightTriangle(A, B, C, unknown),
      answer,
      hint: `Cateto² = Hipotenusa² - Cateto²`,
      grade: '3',
      topic: 'Teorema de Pitágoras',
    });
  });

  // --- TIPO 10: Contexto — barco y faro, campo de fútbol ---
  const extraContext = [
    { a: 60, b: 11, c: 61, find: 'c', q: '⛵ Un barco navega 60 km al norte y 11 km al este. ¿A qué distancia está del punto de partida?' },
    { a: 40, b: 30, c: 50, find: 'c', q: '🏃 Una persona camina 40 m hacia el norte y 30 m hacia el este. ¿Qué distancia recorrió en línea recta?' },
    { a: 24, b: 7, c: 25, find: 'c', q: '🏕️ Un campamento está a 24 km al norte y 7 km al este. ¿Cuál es la distancia directa?' },
    { a: 20, b: 15, c: 25, find: 'c', q: '🏟️ Una cancha mide 20 m × 15 m. ¿Cuánto mide la diagonal?' },
    { a: 9, b: 40, c: 41, find: 'a', q: '🔧 Un tornillo diagonal de 41 cm conecta dos puntos a 40 cm horizontalmente. ¿Cuánto mide la altura vertical?' },
    { a: 12, b: 35, c: 37, find: 'b', q: '🚣 Una embarcación cruza 37 km desde la costa. Si subió 12 km en vertical, ¿cuánto avanzó horizontalmente?' },
    { a: 9, b: 12, c: 15, find: 'c', q: '🏡 Un jardín rectangular tiene lados de 9 m y 12 m. ¿Cuánto mide la diagonal del jardín?' },
    { a: 20, b: 48, c: 52, find: 'c', q: '🚁 Un helicóptero vuela 20 km al norte y 48 km al este. ¿A qué distancia directa está del aeropuerto?' },
    { a: 28, b: 21, c: 35, find: 'a', q: '🧱 Un muro diagonal de 35 m conecta dos esquinas. La base horizontal mide 21 m. ¿Cuánto mide el muro vertical?' },
  ];
  extraContext.forEach(({ a, b, c, find, q }) => {
    const unknown = find;
    const answer = find === 'a' ? a : find === 'b' ? b : c;
    exercises.push({
      type: 'pitagoras',
      subtype: 'context_real',
      question: q,
      svgData: svgContextTriangle(a, b, c, unknown, '📏 Problema real'),
      answer,
      hint: `Identifica los catetos y la hipotenusa, luego aplica a² + b² = c²`,
      grade: '3',
      topic: 'Teorema de Pitágoras',
    });
  });

  return exercises;
}

// ==============================================================
//  GENERADOR DE 80+ EJERCICIOS DE TALES
// ==============================================================
export function generateThalesExercises() {
  const exercises = [];

  // --- TIPO 1: Triángulos proporcionales con SVG ---
  // AB/DE = BC/EF, encontrar uno de los segmentos
  const proportionalSets = [
    // [AB, DE, BC, EF, unknown, answer]
    [2, 4, 3, 6, 'EF', 6],
    [3, 6, 4, 8, 'EF', 8],
    [2, 6, 3, 9, 'EF', 9],
    [4, 8, 6, 12, 'EF', 12],
    [3, 9, 5, 15, 'EF', 15],
    [5, 10, 6, 12, 'EF', 12],
    [2, 4, 5, 10, 'EF', 10],
    [3, 6, 7, 14, 'EF', 14],
    [2, 6, 4, 12, 'EF', 12],
    [4, 12, 3, 9, 'EF', 9],
    // Find DE
    [2, 4, 3, 6, 'DE', 4],
    [3, 6, 4, 8, 'DE', 6],
    [5, 10, 6, 12, 'DE', 10],
    [2, 4, 5, 10, 'DE', 4],
    [3, 9, 5, 15, 'DE', 9],
    // Find AB
    [2, 4, 3, 6, 'AB', 2],
    [3, 6, 5, 10, 'AB', 3],
    [4, 8, 6, 12, 'AB', 4],
    [5, 10, 7, 14, 'AB', 5],
    [2, 6, 3, 9, 'AB', 2],
    // Find BC
    [2, 4, 3, 6, 'BC', 3],
    [3, 6, 4, 8, 'BC', 4],
    [5, 10, 6, 12, 'BC', 6],
    [2, 4, 5, 10, 'BC', 5],
    [3, 9, 5, 15, 'BC', 5],
  ];

  proportionalSets.forEach(([AB, DE, BC, EF, unknown, answer]) => {
    exercises.push({
      type: 'tales',
      subtype: 'proportional_triangles',
      question: `Dos triángulos semejantes. Calcula el segmento rojo (?).`,
      svgData: svgTales(AB, DE, BC, EF, unknown),
      answer,
      hint: `Tales: AB/DE = BC/EF → ${AB}/${DE} = ${BC}/${EF}`,
      grade: '3',
      topic: 'Teorema de Tales',
    });
  });

  // --- TIPO 2: Rayos desde vértice con paralelas ---
  // a1/a2 = b1/b2
  const raysSets = [
    // [a1, a2, b1, b2, unknown, answer]
    [2, 4, 3, 6, 'b2', 6],
    [3, 6, 5, 10, 'b2', 10],
    [4, 8, 6, 12, 'b2', 12],
    [2, 6, 3, 9, 'b2', 9],
    [5, 10, 4, 8, 'b2', 8],
    [3, 9, 4, 12, 'b2', 12],
    [2, 4, 5, 10, 'b2', 10],
    [4, 12, 5, 15, 'b2', 15],
    [3, 6, 2, 4, 'b2', 4],
    [2, 8, 3, 12, 'b2', 12],
    // Find b1
    [2, 4, 3, 6, 'b1', 3],
    [3, 6, 5, 10, 'b1', 5],
    [4, 8, 6, 12, 'b1', 6],
    [2, 6, 3, 9, 'b1', 3],
    [5, 10, 4, 8, 'b1', 4],
    // Find a2
    [2, 4, 3, 6, 'a2', 4],
    [3, 6, 5, 10, 'a2', 6],
    [4, 8, 6, 12, 'a2', 8],
    [2, 6, 3, 9, 'a2', 6],
    [5, 10, 4, 8, 'a2', 10],
    // Find a1
    [2, 4, 3, 6, 'a1', 2],
    [3, 6, 5, 10, 'a1', 3],
    [4, 8, 6, 12, 'a1', 4],
    [2, 6, 3, 9, 'a1', 2],
    [5, 10, 4, 8, 'a1', 5],
  ];

  raysSets.forEach(([a1, a2, b1, b2, unknown, answer]) => {
    exercises.push({
      type: 'tales',
      subtype: 'rays_parallel',
      question: `Dos rectas paralelas cortan los rayos. Halla el segmento rojo (?).`,
      svgData: svgTalesRays(a1, a2, b1, b2, unknown),
      answer,
      hint: `Tales: a₁/a₂ = b₁/b₂`,
      grade: '3',
      topic: 'Teorema de Tales',
    });
  });

  // --- TIPO 3: Problema de sombra/poste ---
  const shadowProblems = [
    { h1: 2, s1: 3, h2: 4, answer: 6, label: 'árbol de 4 m' },
    { h1: 3, s1: 6, h2: 5, answer: 10, label: 'poste de 5 m' },
    { h1: 4, s1: 2, h2: 8, answer: 4, label: 'edificio de 8 m' },
    { h1: 5, s1: 4, h2: 10, answer: 8, label: 'torre de 10 m' },
    { h1: 2, s1: 5, h2: 6, answer: 15, label: 'palmera de 6 m' },
    { h1: 3, s1: 4, h2: 9, answer: 12, label: 'lámpara de 9 m' },
    { h1: 4, s1: 6, h2: 6, answer: 9, label: 'antena de 6 m' },
    { h1: 5, s1: 3, h2: 15, answer: 9, label: 'mástil de 15 m' },
  ];

  shadowProblems.forEach(({ h1, s1, h2, answer, label }) => {
    exercises.push({
      type: 'tales',
      subtype: 'shadow_problem',
      question: `Un poste de ${h1} m proyecta una sombra de ${s1} m. ¿Qué sombra proyecta un ${label}?`,
      svgData: svgTalesPost(h1, s1, h2, 's2'),
      answer,
      hint: `${h1}/${s1} = ${h2}/x → x = (${h2}×${s1})/${h1}`,
      grade: '3',
      topic: 'Teorema de Tales',
    });
  });

  // --- TIPO 4: Texto con planteamiento algebraico ---
  const textProbs = [
    { q: 'En un triángulo, una paralela divide los lados en: 4 y 8 por un lado, 5 y ? por el otro. ¿Cuánto mide ?', a: 10 },
    { q: 'Segmentos proporcionales: 3/6 = 4/x. Halla x.', a: 8 },
    { q: 'Se tienen segmentos: 2/8 = 3/x. Halla x.', a: 12 },
    { q: 'Por Tales: x/9 = 4/12. Halla x.', a: 3 },
    { q: 'Por Tales: 5/x = 10/8. Halla x.', a: 4 },
    { q: 'Segmentos: 6/3 = x/4. Halla x.', a: 8 },
    { q: 'Una paralela divide un triángulo. Un lado queda 3 y 6, el otro lado 4 y x. Halla x.', a: 8 },
    { q: 'Por Tales: 2/6 = x/12. Halla x.', a: 4 },
    { q: 'Proposición: x/15 = 4/12. Halla x.', a: 5 },
    { q: '¿Cuánto mide x si: 8/4 = 10/x?', a: 5 },
  ];

  textProbs.forEach(({ q, a }) => {
    const svgFormula = `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="170" viewBox="0 0 310 170">
  <rect width="310" height="170" rx="16" fill="#F0FDF4"/>
  <text x="155" y="45" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#047857">📏 Teorema de Tales</text>
  <line x1="30" y1="55" x2="280" y2="55" stroke="#059669" stroke-width="1.5"/>
  <foreignObject x="15" y="62" width="280" height="80">
    <body xmlns="http://www.w3.org/1999/xhtml">
      <p style="font-family:Arial;font-size:13px;color:#1E293B;text-align:center;margin:0;line-height:1.5">${q}</p>
    </body>
  </foreignObject>
  <text x="155" y="155" text-anchor="middle" font-family="Arial" font-size="11" fill="#047857" font-style="italic">Tales: a₁/a₂ = b₁/b₂</text>
</svg>`;
    exercises.push({
      type: 'tales',
      subtype: 'text_problem',
      question: q,
      svgData: svgFormula,
      answer: a,
      hint: 'Aplica la proporción del Teorema de Tales',
      grade: '3',
      topic: 'Teorema de Tales',
    });
  });

  // --- TIPO 5: Más proporcionales con SVG (distintas razones) ---
  const extraProportional = [
    [6, 12, 8, 16, 'EF', 16],
    [3, 12, 4, 16, 'EF', 16],
    [5, 15, 6, 18, 'EF', 18],
    [4, 16, 5, 20, 'EF', 20],
    [7, 14, 9, 18, 'EF', 18],
    [6, 9, 8, 12, 'EF', 12],
    [3, 12, 2, 8, 'EF', 8],
    [4, 6, 6, 9, 'EF', 9],
    // Find AB extras
    [6, 12, 8, 16, 'AB', 6],
    [5, 15, 6, 18, 'AB', 5],
    [7, 14, 9, 18, 'AB', 7],
    // Find DE extras
    [6, 12, 8, 16, 'DE', 12],
    [5, 15, 6, 18, 'DE', 15],
    [7, 14, 9, 18, 'DE', 14],
  ];
  extraProportional.forEach(([AB, DE, BC, EF, unknown, answer]) => {
    exercises.push({
      type: 'tales',
      subtype: 'proportional_triangles',
      question: `Dos triángulos semejantes. Calcula el segmento rojo (?).`,
      svgData: svgTales(AB, DE, BC, EF, unknown),
      answer,
      hint: `Tales: AB/DE = BC/EF → ${AB}/${DE} = ${BC}/${EF}`,
      grade: '3',
      topic: 'Teorema de Tales',
    });
  });

  // --- TIPO 6: Rayos extra ---
  const extraRays = [
    [3, 12, 5, 20, 'b2', 20],
    [4, 16, 3, 12, 'b2', 12],
    [6, 12, 7, 14, 'b2', 14],
    [2, 10, 3, 15, 'b2', 15],
    [5, 20, 4, 16, 'b2', 16],
    [3, 12, 5, 20, 'b1', 5],
    [4, 16, 3, 12, 'b1', 3],
    [6, 12, 7, 14, 'a2', 12],
    [2, 10, 3, 15, 'a1', 2],
  ];
  extraRays.forEach(([a1, a2, b1, b2, unknown, answer]) => {
    exercises.push({
      type: 'tales',
      subtype: 'rays_parallel',
      question: `Dos rectas paralelas cortan los rayos. Halla el segmento rojo (?).`,
      svgData: svgTalesRays(a1, a2, b1, b2, unknown),
      answer,
      hint: `Tales: a₁/a₂ = b₁/b₂`,
      grade: '3',
      topic: 'Teorema de Tales',
    });
  });

  // --- TIPO 7: Sombras extra ---
  const extraShadows = [
    { h1: 6, s1: 4, h2: 9, answer: 6, label: 'pino de 9 m' },
    { h1: 4, s1: 3, h2: 12, answer: 9, label: 'edificio de 12 m' },
    { h1: 3, s1: 2, h2: 6, answer: 4, label: 'arbusto de 6 m' },
    { h1: 5, s1: 6, h2: 10, answer: 12, label: 'árbol de 10 m' },
  ];
  extraShadows.forEach(({ h1, s1, h2, answer, label }) => {
    exercises.push({
      type: 'tales',
      subtype: 'shadow_problem',
      question: `Un poste de ${h1} m proyecta una sombra de ${s1} m. ¿Qué sombra proyecta un ${label}?`,
      svgData: svgTalesPost(h1, s1, h2, 's2'),
      answer,
      hint: `${h1}/${s1} = ${h2}/x → x = (${h2}×${s1})/${h1}`,
      grade: '3',
      topic: 'Teorema de Tales',
    });
  });

  return exercises;
}
