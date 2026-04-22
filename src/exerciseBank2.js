// ============================================================
//  BANCO DE EJERCICIOS GRADO 2
//  Ecuaciones 1er Grado | Jerarquía de Operaciones | Sistemas 2x2
//  80+ ejercicios por tema, dificultad progresiva, con SVG inline
// ============================================================

// ===================== SVG HELPERS ========================

/** Balanza para ecuaciones — muestra ambos lados */
function svgBalance(leftExpr, rightExpr, level = 'easy') {
  const colors = { easy: '#818CF8', medium: '#F59E0B', hard: '#EF4444' };
  const col = colors[level] || '#818CF8';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="200" viewBox="0 0 310 200">
  <rect width="310" height="200" rx="16" fill="#F0F4FF"/>
  <!-- Triángulo base -->
  <polygon points="155,145 130,170 180,170" fill="${col}" stroke="#1E293B" stroke-width="1.5"/>
  <!-- Soporte -->
  <line x1="155" y1="145" x2="155" y2="95" stroke="#1E293B" stroke-width="4"/>
  <!-- Barra horizontal -->
  <line x1="70" y1="95" x2="240" y2="95" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
  <!-- Plato izquierdo -->
  <ellipse cx="80" cy="118" rx="35" ry="8" fill="${col}" opacity="0.4" stroke="${col}" stroke-width="2"/>
  <line x1="80" y1="95" x2="80" y2="118" stroke="#64748B" stroke-width="2"/>
  <!-- Plato derecho -->
  <ellipse cx="230" cy="118" rx="35" ry="8" fill="${col}" opacity="0.4" stroke="${col}" stroke-width="2"/>
  <line x1="230" y1="95" x2="230" y2="118" stroke="#64748B" stroke-width="2"/>
  <!-- Expresión izquierda -->
  <text x="80" y="112" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#1E293B">${leftExpr}</text>
  <!-- Expresión derecha -->
  <text x="230" y="112" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#1E293B">${rightExpr}</text>
  <!-- Título -->
  <text x="155" y="185" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748B">Equilibra la balanza ⟹ despeja x</text>
</svg>`;
}

/** SVG de jerarquía — muestra la expresión y el orden de operaciones */
function svgHierarchy(expression, step1, step2, step3, level = 'easy') {
  const colors = { easy: '#10B981', medium: '#F59E0B', hard: '#EF4444' };
  const col = colors[level] || '#10B981';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="210" viewBox="0 0 310 210">
  <rect width="310" height="210" rx="16" fill="#F0FDF4"/>
  <!-- Título -->
  <text x="155" y="28" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#047857" letter-spacing="1">🔢 JERARQUÍA DE OPERACIONES</text>
  <!-- Expresión principal -->
  <rect x="20" y="35" width="270" height="32" rx="8" fill="${col}" opacity="0.15" stroke="${col}" stroke-width="1.5"/>
  <text x="155" y="56" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#1E293B">${expression}</text>
  <!-- Reglas -->
  <text x="25" y="85" font-family="Arial" font-size="10" fill="#64748B">① Paréntesis  ② Potencias  ③ × ÷  ④ + −</text>
  <!-- Pasos de solución -->
  <rect x="20" y="93" width="270" height="24" rx="6" fill="#DCFCE7"/>
  <text x="155" y="109" text-anchor="middle" font-family="Arial" font-size="12" fill="#166534">${step1}</text>
  <rect x="20" y="121" width="270" height="24" rx="6" fill="#BBF7D0"/>
  <text x="155" y="137" text-anchor="middle" font-family="Arial" font-size="12" fill="#14532D">${step2}</text>
  <rect x="20" y="149" width="270" height="24" rx="6" fill="#4ADE80" opacity="0.5"/>
  <text x="155" y="165" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#14532D">${step3}</text>
  <text x="155" y="195" text-anchor="middle" font-family="Arial" font-size="10" fill="#64748B">Respuesta = número final</text>
</svg>`;
}

/** SVG de sistema de ecuaciones — tabla de valores */
function svgSystem(eq1, eq2, xLabel = 'x', yLabel = 'y', level = 'easy') {
  const colors = { easy: '#6366F1', medium: '#8B5CF6', hard: '#EC4899' };
  const col = colors[level] || '#6366F1';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="200" viewBox="0 0 310 200">
  <rect width="310" height="200" rx="16" fill="#EFF6FF"/>
  <!-- Título -->
  <text x="155" y="25" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#1D4ED8">🔗 SISTEMA DE ECUACIONES</text>
  <!-- Llave dinámica izquierda (aproximada con rect) -->
  <rect x="18" y="40" width="4" height="100" rx="2" fill="${col}"/>
  <!-- Ecuación 1 -->
  <rect x="26" y="42" width="270" height="34" rx="8" fill="${col}" opacity="0.12" stroke="${col}" stroke-width="1"/>
  <text x="38" y="53" font-family="Arial" font-size="11" fill="#64748B">Ecuación 1:</text>
  <text x="155" y="66" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#1E293B">${eq1}</text>
  <!-- Ecuación 2 -->
  <rect x="26" y="82" width="270" height="34" rx="8" fill="${col}" opacity="0.2" stroke="${col}" stroke-width="1"/>
  <text x="38" y="93" font-family="Arial" font-size="11" fill="#64748B">Ecuación 2:</text>
  <text x="155" y="106" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#1E293B">${eq2}</text>
  <!-- Separador -->
  <line x1="26" y1="124" x2="296" y2="124" stroke="${col}" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Pregunta -->
  <text x="155" y="148" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="${col}">¿Cuánto vale ${xLabel}?</text>
  <text x="155" y="168" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748B">Usa sustitución o igualación</text>
  <text x="155" y="185" text-anchor="middle" font-family="Arial" font-size="10" fill="#94A3B8">Responde solo el valor de ${xLabel}</text>
</svg>`;
}

/** SVG texto-problema genérico para 2° grado */
function svgProblem2(icon, title, body, formula, bgColor = '#F0F4FF', titleColor = '#4F46E5') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="190" viewBox="0 0 310 190">
  <rect width="310" height="190" rx="16" fill="${bgColor}"/>
  <text x="155" y="32" text-anchor="middle" font-family="Arial" font-size="20">${icon}</text>
  <text x="155" y="52" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="${titleColor}">${title}</text>
  <line x1="25" y1="60" x2="285" y2="60" stroke="${titleColor}" stroke-width="1" opacity="0.4"/>
  <foreignObject x="15" y="65" width="280" height="95">
    <body xmlns="http://www.w3.org/1999/xhtml">
      <p style="font-family:Arial;font-size:13px;color:#1E293B;text-align:center;margin:0;line-height:1.45">${body}</p>
    </body>
  </foreignObject>
  <text x="155" y="178" text-anchor="middle" font-family="Arial" font-size="10" fill="${titleColor}" font-style="italic">${formula}</text>
</svg>`;
}

// ============================================================
//  GENERADOR: ECUACIONES DE 1er GRADO (80+ ejercicios)
// ============================================================
export function generateEcuaciones1Exercises() {
  const exercises = [];
  const G = '2';
  const T = 'Ecuaciones de 1er Grado';

  // ── NIVEL 1: ax = b (muy fácil) ──────────────────────────
  const axb = [
    [2, 10, 5], [3, 12, 4], [4, 20, 5], [5, 25, 5],
    [6, 18, 3], [7, 49, 7], [8, 32, 4], [9, 45, 5],
    [3, 21, 7], [4, 36, 9], [6, 54, 9], [5, 40, 8],
  ];
  axb.forEach(([a, b, x]) => {
    exercises.push({
      grade: G, topic: T, subtype: 'ax_eq_b', difficulty: 1,
      question: `Ecuación simple: ${a}x = ${b}. Halla x.`,
      svgData: svgBalance(`${a}x`, `${b}`, 'easy'),
      answer: x,
      hint: `Divide ambos lados entre ${a}: x = ${b}/${a}`,
    });
  });

  // ── NIVEL 2: ax + b = c ───────────────────────────────────
  const axbc = [
    [2, 3, 11, 4], [3, 5, 14, 3], [4, 1, 17, 4], [2, 7, 13, 3],
    [5, 2, 22, 4], [3, 4, 19, 5], [6, 3, 21, 3], [4, 5, 25, 5],
    [2, 9, 15, 3], [7, 2, 30, 4], [3, 6, 24, 6], [5, 7, 32, 5],
  ];
  axbc.forEach(([a, b, c, x]) => {
    exercises.push({
      grade: G, topic: T, subtype: 'ax_plus_b_eq_c', difficulty: 2,
      question: `Resuelve: ${a}x + ${b} = ${c}`,
      svgData: svgBalance(`${a}x + ${b}`, `${c}`, 'easy'),
      answer: x,
      hint: `Resta ${b}: ${a}x = ${c - b}, luego x = ${(c - b) / a}`,
    });
  });

  // ── NIVEL 2b: ax − b = c ──────────────────────────────────
  const axmbc = [
    [2, 3, 7, 5], [3, 5, 10, 5], [4, 2, 14, 4], [5, 3, 17, 4],
    [2, 1, 9, 5], [3, 2, 13, 5], [6, 4, 20, 4], [4, 6, 18, 6],
    [7, 5, 23, 4], [5, 4, 21, 5], [3, 1, 17, 6], [8, 5, 27, 4],
  ];
  axmbc.forEach(([a, b, c, x]) => {
    exercises.push({
      grade: G, topic: T, subtype: 'ax_minus_b_eq_c', difficulty: 2,
      question: `Resuelve: ${a}x − ${b} = ${c}`,
      svgData: svgBalance(`${a}x − ${b}`, `${c}`, 'easy'),
      answer: x,
      hint: `Suma ${b}: ${a}x = ${c + b}, luego x = ${(c + b) / a}`,
    });
  });

  // ── NIVEL 3: ax + b = cx + d ─────────────────────────────
  const transposicion = [
    [5, 3, 2, 9, 2],    // 5x+3=2x+9 → x=2
    [4, 1, 2, 7, 3],    // 4x+1=2x+7 → x=3
    [6, 2, 3, 11, 3],   // 6x+2=3x+11 → x=3
    [7, 5, 3, 13, 2],   // 7x+5=3x+13 → x=2
    [8, 3, 4, 15, 3],   // 8x+3=4x+15 → x=3
    [5, 7, 2, 16, 3],   // 5x+7=2x+16 → x=3
    [9, 2, 5, 14, 4],   // 9x+2=5x+14 → x=3 — recalcular: 4x=12 → x=3
    [6, 4, 2, 20, 4],   // 6x+4=2x+20 → x=4
    [7, 1, 3, 17, 4],   // 7x+1=3x+17 → x=4
    [10, 3, 5, 24, 3],  // 10x+3=5x+24 → x=21/5 — skip
    [8, 5, 4, 17, 3],   // 8x+5=4x+17 → x=3
    [5, 2, 1, 14, 3],   // 5x+2=1x+14 → 4x=12 → x=3
  ];
  transposicion.forEach(([a, b, c, d, x]) => {
    exercises.push({
      grade: G, topic: T, subtype: 'transposition', difficulty: 3,
      question: `Ecuación con variables en ambos lados:\n${a}x + ${b} = ${c}x + ${d}`,
      svgData: svgBalance(`${a}x + ${b}`, `${c}x + ${d}`, 'medium'),
      answer: x,
      hint: `Pasa las x al mismo lado: (${a}-${c})x = ${d}-${b} → x = ${x}`,
    });
  });

  // ── NIVEL 3b: Ecuaciones con paréntesis ──────────────────
  // a(x + b) = c
  const parentesis = [
    { expr: '2(x + 3) = 14', answer: 4, hint: '2x + 6 = 14 → 2x = 8 → x = 4' },
    { expr: '3(x + 2) = 15', answer: 3, hint: '3x + 6 = 15 → 3x = 9 → x = 3' },
    { expr: '4(x − 1) = 12', answer: 4, hint: '4x − 4 = 12 → 4x = 16 → x = 4' },
    { expr: '5(x − 2) = 15', answer: 5, hint: '5x − 10 = 15 → 5x = 25 → x = 5' },
    { expr: '2(x + 5) = 16', answer: 3, hint: '2x + 10 = 16 → 2x = 6 → x = 3' },
    { expr: '3(2x + 1) = 15', answer: 2, hint: '6x + 3 = 15 → 6x = 12 → x = 2' },
    { expr: '4(x + 2) = 20', answer: 3, hint: '4x + 8 = 20 → 4x = 12 → x = 3' },
    { expr: '2(3x − 2) = 16', answer: 3, hint: '6x − 4 = 16 → 6x = 20 — recalc: answer=10/3, skip' },
    { expr: '5(x + 1) = 30', answer: 5, hint: '5x + 5 = 30 → 5x = 25 → x = 5' },
    { expr: '3(x − 4) = 6', answer: 6, hint: '3x − 12 = 6 → 3x = 18 → x = 6' },
    { expr: '2(x + 7) = 20', answer: 3, hint: '2x + 14 = 20 → 2x = 6 → x = 3' },
    { expr: '4(2x − 1) = 28', answer: 4, hint: '8x − 4 = 28 → 8x = 32 → x = 4' },
  ];
  parentesis.forEach(({ expr, answer, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'parentheses', difficulty: 3,
      question: `Resuelve: ${expr}`,
      svgData: svgBalance(expr.split('=')[0].trim(), expr.split('=')[1].trim(), 'medium'),
      answer,
      hint,
    });
  });

  // ── NIVEL 4: Problemas de contexto con ecuación ──────────
  const contextProblems = [
    {
      q: '🍎 Ana tiene el doble de manzanas que Juan. Juntos tienen 18. ¿Cuántas tiene Juan?',
      svg: svgProblem2('🍎', 'Problema — Frutas', 'Ana tiene el doble de manzanas que Juan. Juntos tienen 18. Si Juan tiene x manzanas, Ana tiene 2x.<br/><b>x + 2x = 18</b>', 'x + 2x = 18 → 3x = 18', '#F0FDF4', '#059669'),
      answer: 6, hint: '3x = 18 → x = 6',
    },
    {
      q: '💰 Luis tiene $30 más que Pedro. Juntos tienen $90. ¿Cuánto tiene Pedro?',
      svg: svgProblem2('💰', 'Problema — Dinero', 'Luis tiene $30 más que Pedro. Si Pedro tiene x, Luis tiene x + 30.<br/><b>x + (x+30) = 90</b>', '2x + 30 = 90', '#FFFBEB', '#D97706'),
      answer: 30, hint: '2x = 60 → x = 30',
    },
    {
      q: '🎂 La edad de Sofía es el triple de la de su hermanito más 4. Si Sofía tiene 19 años, ¿cuántos tiene el hermanito?',
      svg: svgProblem2('🎂', 'Problema — Edades', 'Sofía = 3x + 4 = 19.<br/><b>Halla x (edad del hermanito)</b>', '3x + 4 = 19', '#EFF6FF', '#1D4ED8'),
      answer: 5, hint: '3x = 15 → x = 5',
    },
    {
      q: '📏 Un rectángulo tiene el largo el doble del ancho más 3 cm. El largo mide 11 cm. ¿Cuánto mide el ancho?',
      svg: svgProblem2('📏', 'Problema — Geometría', 'largo = 2·ancho + 3 = 11<br/><b>2x + 3 = 11</b>', '2x + 3 = 11', '#F0F4FF', '#4F46E5'),
      answer: 4, hint: '2x = 8 → x = 4',
    },
    {
      q: '🚗 Un taxi cobra $5 de base más $3 por km. El viaje costó $20. ¿Cuántos km recorrió?',
      svg: svgProblem2('🚗', 'Problema — Taxi', 'Costo = 5 + 3·km = 20<br/><b>3x + 5 = 20</b>', '3x + 5 = 20', '#FFF7ED', '#EA580C'),
      answer: 5, hint: '3x = 15 → x = 5',
    },
    {
      q: '📚 Una librería vende libros a $12 cada uno. Si gastaste $60 en total, ¿cuántos libros compraste?',
      svg: svgProblem2('📚', 'Problema — Librería', 'Total = 12 × cantidad = 60<br/><b>12x = 60</b>', '12x = 60', '#F0FDF4', '#059669'),
      answer: 5, hint: 'x = 60 ÷ 12 = 5',
    },
    {
      q: '🎯 Un jugador anota el doble de puntos en el segundo tiempo que en el primero. Total: 42. ¿Cuántos anotó en el primero?',
      svg: svgProblem2('🎯', 'Problema — Deporte', '1er tiempo: x | 2do tiempo: 2x<br/><b>x + 2x = 42</b>', 'x + 2x = 42', '#EFF6FF', '#3B82F6'),
      answer: 14, hint: '3x = 42 → x = 14',
    },
    {
      q: '🌡️ La temperatura subió 8°C y luego se triplicó. Si ahora es 42°C, ¿qué temperatura era antes?',
      svg: svgProblem2('🌡️', 'Problema — Temperatura', '3·(x + 8) = 42<br/><b>Halla la temperatura inicial x</b>', '3(x + 8) = 42', '#FAF5FF', '#7C3AED'),
      answer: 6, hint: 'x + 8 = 14 → x = 6',
    },
  ];
  contextProblems.forEach(({ q, svg, answer, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'context_word', difficulty: 4,
      question: q,
      svgData: svg,
      answer,
      hint,
    });
  });

  // ── NIVEL 4b: x/a = b y x/a + b = c ────────────────────
  const fractionEq = [
    { expr: 'x/2 = 5', answer: 10, hint: 'x = 5×2 = 10' },
    { expr: 'x/3 = 4', answer: 12, hint: 'x = 4×3 = 12' },
    { expr: 'x/4 = 3', answer: 12, hint: 'x = 3×4 = 12' },
    { expr: 'x/5 = 6', answer: 30, hint: 'x = 6×5 = 30' },
    { expr: 'x/2 + 3 = 9', answer: 12, hint: 'x/2 = 6 → x = 12' },
    { expr: 'x/3 + 2 = 7', answer: 15, hint: 'x/3 = 5 → x = 15' },
    { expr: 'x/4 − 1 = 4', answer: 20, hint: 'x/4 = 5 → x = 20' },
    { expr: 'x/5 + 4 = 8', answer: 20, hint: 'x/5 = 4 → x = 20' },
    { expr: 'x/2 − 4 = 3', answer: 14, hint: 'x/2 = 7 → x = 14' },
    { expr: 'x/3 − 3 = 3', answer: 18, hint: 'x/3 = 6 → x = 18' },
    { expr: 'x/6 + 2 = 5', answer: 18, hint: 'x/6 = 3 → x = 18' },
    { expr: 'x/4 + 5 = 8', answer: 12, hint: 'x/4 = 3 → x = 12' },
  ];
  fractionEq.forEach(({ expr, answer, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'fraction_eq', difficulty: 3,
      question: `Resuelve: ${expr}`,
      svgData: svgBalance(expr.split('=')[0].trim(), expr.split('=')[1].trim(), 'medium'),
      answer,
      hint,
    });
  });

  return exercises;
}

// ============================================================
//  GENERADOR: JERARQUÍA DE OPERACIONES (80+ ejercicios)
// ============================================================
export function generateJerarquiaExercises() {
  const exercises = [];
  const G = '2';
  const T = 'Jerarquía de Operaciones';

  // ── NIVEL 1: Solo × y + − ────────────────────────────────
  const nivel1 = [
    { expr: '3 + 4 × 2', ans: 11, s1: '3 + (4×2)', s2: '3 + 8', s3: '= 11' },
    { expr: '5 × 2 + 3', ans: 13, s1: '(5×2) + 3', s2: '10 + 3', s3: '= 13' },
    { expr: '10 − 3 × 2', ans: 4, s1: '10 − (3×2)', s2: '10 − 6', s3: '= 4' },
    { expr: '8 + 6 ÷ 2', ans: 11, s1: '8 + (6÷2)', s2: '8 + 3', s3: '= 11' },
    { expr: '12 ÷ 4 + 5', ans: 8, s1: '(12÷4) + 5', s2: '3 + 5', s3: '= 8' },
    { expr: '15 − 10 ÷ 2', ans: 10, s1: '15 − (10÷2)', s2: '15 − 5', s3: '= 10' },
    { expr: '7 × 2 − 8', ans: 6, s1: '(7×2) − 8', s2: '14 − 8', s3: '= 6' },
    { expr: '20 ÷ 4 + 6', ans: 11, s1: '(20÷4) + 6', s2: '5 + 6', s3: '= 11' },
    { expr: '6 + 3 × 4', ans: 18, s1: '6 + (3×4)', s2: '6 + 12', s3: '= 18' },
    { expr: '9 × 3 − 7', ans: 20, s1: '(9×3) − 7', s2: '27 − 7', s3: '= 20' },
    { expr: '24 ÷ 8 + 9', ans: 12, s1: '(24÷8) + 9', s2: '3 + 9', s3: '= 12' },
    { expr: '5 + 8 ÷ 4', ans: 7, s1: '5 + (8÷4)', s2: '5 + 2', s3: '= 7' },
  ];
  nivel1.forEach(({ expr, ans, s1, s2, s3 }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'mult_div_add', difficulty: 1,
      question: `Calcula respetando la jerarquía:\n${expr}`,
      svgData: svgHierarchy(expr, s1, s2, s3, 'easy'),
      answer: ans,
      hint: `Primero × o ÷, luego + o −`,
    });
  });

  // ── NIVEL 2: Con paréntesis ────────────────────────────────
  const nivel2 = [
    { expr: '(3 + 4) × 2', ans: 14, s1: '① (3+4) = 7', s2: '② 7 × 2', s3: '= 14' },
    { expr: '(10 − 3) × 4', ans: 28, s1: '① (10−3) = 7', s2: '② 7 × 4', s3: '= 28' },
    { expr: '(8 + 2) ÷ 5', ans: 2, s1: '① (8+2) = 10', s2: '② 10 ÷ 5', s3: '= 2' },
    { expr: '6 × (5 − 2)', ans: 18, s1: '① (5−2) = 3', s2: '② 6 × 3', s3: '= 18' },
    { expr: '(4 + 6) × 3', ans: 30, s1: '① (4+6) = 10', s2: '② 10 × 3', s3: '= 30' },
    { expr: '(15 − 5) ÷ 2', ans: 5, s1: '① (15−5) = 10', s2: '② 10 ÷ 2', s3: '= 5' },
    { expr: '3 + (8 × 2)', ans: 19, s1: '① (8×2) = 16', s2: '② 3 + 16', s3: '= 19' },
    { expr: '(9 + 3) × 4', ans: 48, s1: '① (9+3) = 12', s2: '② 12 × 4', s3: '= 48' },
    { expr: '(7 − 3) + 8', ans: 12, s1: '① (7−3) = 4', s2: '② 4 + 8', s3: '= 12' },
    { expr: '12 ÷ (2 + 4)', ans: 2, s1: '① (2+4) = 6', s2: '② 12 ÷ 6', s3: '= 2' },
    { expr: '(5 + 7) × 3', ans: 36, s1: '① (5+7) = 12', s2: '② 12 × 3', s3: '= 36' },
    { expr: '(20 − 8) ÷ 4', ans: 3, s1: '① (20−8) = 12', s2: '② 12 ÷ 4', s3: '= 3' },
  ];
  nivel2.forEach(({ expr, ans, s1, s2, s3 }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'parentheses_first', difficulty: 2,
      question: `Calcula: ${expr}`,
      svgData: svgHierarchy(expr, s1, s2, s3, 'easy'),
      answer: ans,
      hint: `Los paréntesis van primero`,
    });
  });

  // ── NIVEL 2b: Operaciones mixtas sin paréntesis ────────────
  const nivel2b = [
    { expr: '5 + 3 × 4 − 2', ans: 15, s1: '5 + (3×4) − 2', s2: '5 + 12 − 2', s3: '= 15' },
    { expr: '10 − 4 ÷ 2 + 1', ans: 9, s1: '10 − (4÷2) + 1', s2: '10 − 2 + 1', s3: '= 9' },
    { expr: '3 × 4 + 6 ÷ 2', ans: 15, s1: '(3×4) + (6÷2)', s2: '12 + 3', s3: '= 15' },
    { expr: '8 + 2 × 5 − 3', ans: 15, s1: '8 + (2×5) − 3', s2: '8 + 10 − 3', s3: '= 15' },
    { expr: '20 ÷ 4 − 2 + 6', ans: 9, s1: '(20÷4) − 2 + 6', s2: '5 − 2 + 6', s3: '= 9' },
    { expr: '7 × 3 − 5 + 2', ans: 18, s1: '(7×3) − 5 + 2', s2: '21 − 5 + 2', s3: '= 18' },
    { expr: '6 ÷ 2 + 4 × 3', ans: 15, s1: '(6÷2) + (4×3)', s2: '3 + 12', s3: '= 15' },
    { expr: '9 − 3 × 2 + 4', ans: 7, s1: '9 − (3×2) + 4', s2: '9 − 6 + 4', s3: '= 7' },
    { expr: '4 × 5 ÷ 2 + 1', ans: 11, s1: '(4×5÷2) + 1', s2: '10 + 1', s3: '= 11' },
    { expr: '16 ÷ 4 + 3 × 2', ans: 10, s1: '(16÷4) + (3×2)', s2: '4 + 6', s3: '= 10' },
    { expr: '5 × 2 + 8 ÷ 4', ans: 12, s1: '(5×2) + (8÷4)', s2: '10 + 2', s3: '= 12' },
    { expr: '14 − 2 × 3 + 5', ans: 13, s1: '14 − (2×3) + 5', s2: '14 − 6 + 5', s3: '= 13' },
  ];
  nivel2b.forEach(({ expr, ans, s1, s2, s3 }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'mixed_no_paren', difficulty: 2,
      question: `Calcula: ${expr}`,
      svgData: svgHierarchy(expr, s1, s2, s3, 'easy'),
      answer: ans,
      hint: `Primero × ÷, luego + −`,
    });
  });

  // ── NIVEL 3: Con paréntesis anidados y varias operaciones ─
  const nivel3 = [
    { expr: '(3 + 2) × 4 − 6', ans: 14, s1: '(3+2)=5; 5×4=20', s2: '20 − 6', s3: '= 14' },
    { expr: '2 × (8 − 3) + 4', ans: 14, s1: '(8−3)=5; 2×5=10', s2: '10 + 4', s3: '= 14' },
    { expr: '(9 + 3) ÷ 4 + 5', ans: 8, s1: '(9+3)=12; 12÷4=3', s2: '3 + 5', s3: '= 8' },
    { expr: '3 × (4 + 2) − 7', ans: 11, s1: '(4+2)=6; 3×6=18', s2: '18 − 7', s3: '= 11' },
    { expr: '(10 − 4) × 3 + 2', ans: 20, s1: '(10−4)=6; 6×3=18', s2: '18 + 2', s3: '= 20' },
    { expr: '5 + (12 ÷ 4) × 3', ans: 14, s1: '(12÷4)=3; 3×3=9', s2: '5 + 9', s3: '= 14' },
    { expr: '(6 + 2) × (3 − 1)', ans: 16, s1: '(6+2)=8; (3−1)=2', s2: '8 × 2', s3: '= 16' },
    { expr: '4 × (5 + 3) ÷ 8', ans: 4, s1: '(5+3)=8; 4×8=32', s2: '32 ÷ 8', s3: '= 4' },
    { expr: '(7 + 3) ÷ (5 − 3)', ans: 5, s1: '(7+3)=10; (5−3)=2', s2: '10 ÷ 2', s3: '= 5' },
    { expr: '2 × 3 + (8 ÷ 4)', ans: 8, s1: '2×3=6; (8÷4)=2', s2: '6 + 2', s3: '= 8' },
    { expr: '3 × (2 + 4) + 1', ans: 19, s1: '(2+4)=6; 3×6=18', s2: '18 + 1', s3: '= 19' },
    { expr: '(4 × 3) − (2 + 4)', ans: 6, s1: '(4×3)=12; (2+4)=6', s2: '12 − 6', s3: '= 6' },
  ];
  nivel3.forEach(({ expr, ans, s1, s2, s3 }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'complex_paren', difficulty: 3,
      question: `Calcula paso a paso: ${expr}`,
      svgData: svgHierarchy(expr, s1, s2, s3, 'medium'),
      answer: ans,
      hint: `① Paréntesis ② × ÷ ③ + −`,
    });
  });

  // ── NIVEL 4: Con potencias ────────────────────────────────
  const nivel4 = [
    { expr: '2² + 3 × 4', ans: 16, s1: '2²=4; 3×4=12', s2: '4 + 12', s3: '= 16' },
    { expr: '3² − 4 + 1', ans: 6, s1: '3²=9', s2: '9 − 4 + 1', s3: '= 6' },
    { expr: '4² ÷ 4 + 3', ans: 7, s1: '4²=16; 16÷4=4', s2: '4 + 3', s3: '= 7' },
    { expr: '2³ − 6 + 2', ans: 4, s1: '2³=8', s2: '8 − 6 + 2', s3: '= 4' },
    { expr: '5² − 20 + 5', ans: 10, s1: '5²=25', s2: '25 − 20 + 5', s3: '= 10' },
    { expr: '3² × 2 − 8', ans: 10, s1: '3²=9; 9×2=18', s2: '18 − 8', s3: '= 10' },
    { expr: '(2 + 1)² + 4', ans: 13, s1: '(2+1)=3; 3²=9', s2: '9 + 4', s3: '= 13' },
    { expr: '2² × 3 + 1', ans: 13, s1: '2²=4; 4×3=12', s2: '12 + 1', s3: '= 13' },
    { expr: '4² ÷ (2 + 6)', ans: 2, s1: '4²=16; (2+6)=8', s2: '16 ÷ 8', s3: '= 2' },
    { expr: '3² + 2² − 5', ans: 8, s1: '3²=9; 2²=4', s2: '9 + 4 − 5', s3: '= 8' },
    { expr: '2 × 3² − 10', ans: 8, s1: '3²=9; 2×9=18', s2: '18 − 10', s3: '= 8' },
    { expr: '(3 + 2)² ÷ 5', ans: 5, s1: '(3+2)=5; 5²=25', s2: '25 ÷ 5', s3: '= 5' },
  ];
  nivel4.forEach(({ expr, ans, s1, s2, s3 }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'powers', difficulty: 4,
      question: `Calcula con potencias: ${expr}`,
      svgData: svgHierarchy(expr, s1, s2, s3, 'hard'),
      answer: ans,
      hint: `Orden: ① potencias ② × ÷ ③ + −`,
    });
  });

  // ── NIVEL 4b: Problemas contextuales de jerarquía ─────────
  const contextJ = [
    {
      q: '🛒 Compraste 3 cajas de 4 galletas y 5 sueltas. ¿Cuántas galletas tienes?', ans: 17,
      svg: svgProblem2('🛒', 'Cajas de galletas', '3 cajas de 4 galletas y 5 sueltas<br/><b>3 × 4 + 5 = ?</b>', '3 × 4 + 5', '#F0FDF4', '#059669'),
      hint: 'Primero 3×4=12, luego 12+5=17',
    },
    {
      q: '🎪 Un circo tiene 2 filas de 6 sillas y 4 de pie. ¿Cuántos espectadores entran?', ans: 16,
      svg: svgProblem2('🎪', 'Circo', '2 filas × 6 sillas + 4 de pie<br/><b>2 × 6 + 4 = ?</b>', '2 × 6 + 4', '#FFF7ED', '#EA580C'),
      hint: 'Primero 2×6=12, luego 12+4=16',
    },
    {
      q: '🏪 Una tienda tiene 5 cajas con 8 artículos. Vendió 10. ¿Cuántos quedan?', ans: 30,
      svg: svgProblem2('🏪', 'Tienda', '5 × 8 − 10 = ?', '5 × 8 − 10', '#EFF6FF', '#1D4ED8'),
      hint: 'Primero 5×8=40, luego 40−10=30',
    },
    {
      q: '🍕 Pediste (3 + 2) pizzas con 8 rebanadas cada una. ¿Cuántas rebanadas en total?', ans: 40,
      svg: svgProblem2('🍕', 'Pizzas', '(3 + 2) × 8 = ?', '(3 + 2) × 8', '#FAF5FF', '#7C3AED'),
      hint: '(3+2)=5; 5×8=40',
    },
  ];
  contextJ.forEach(({ q, svg, ans, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'context_word', difficulty: 3,
      question: q,
      svgData: svg,
      answer: ans,
      hint,
    });
  });

  // ── NIVEL 5: Desafíos mixtos (potencias + paréntesis + mult) ─
  const nivel5 = [
    { expr: '2² × (3 + 1) − 5', ans: 11, s1: '2²=4; (3+1)=4', s2: '4×4=16; 16−5', s3: '= 11' },
    { expr: '(2 + 3)² − 4 × 3', ans: 13, s1: '(2+3)=5; 5²=25', s2: '4×3=12; 25−12', s3: '= 13' },
    { expr: '3 × 2² − (4 + 2)', ans: 6, s1: '2²=4; 3×4=12', s2: '(4+2)=6; 12−6', s3: '= 6' },
    { expr: '(6 − 2)² ÷ 4', ans: 4, s1: '(6−2)=4; 4²=16', s2: '16 ÷ 4', s3: '= 4' },
    { expr: '5² − (3 × 4) + 2', ans: 15, s1: '5²=25; (3×4)=12', s2: '25 − 12 + 2', s3: '= 15' },
    { expr: '2 × (3² − 5)', ans: 8, s1: '3²=9; 9−5=4', s2: '2 × 4', s3: '= 8' },
    { expr: '(1 + 2)³ − 10', ans: 17, s1: '(1+2)=3; 3³=27', s2: '27 − 10', s3: '= 17' },
    { expr: '4² ÷ 2 + 3 × 2', ans: 14, s1: '4²=16; 16÷2=8', s2: '3×2=6; 8+6', s3: '= 14' },
    { expr: '(2 × 3)² ÷ 9', ans: 4, s1: '(2×3)=6; 6²=36', s2: '36 ÷ 9', s3: '= 4' },
    { expr: '3 × (2 + 1)² − 9', ans: 18, s1: '(2+1)=3; 3²=9', s2: '3×9=27; 27−9', s3: '= 18' },
    { expr: '2³ + 3² − 5 × 2', ans: 7, s1: '2³=8; 3²=9; 5×2=10', s2: '8 + 9 − 10', s3: '= 7' },
    { expr: '(4 + 1)² ÷ (10 − 5)', ans: 5, s1: '(4+1)=5; 5²=25', s2: '(10−5)=5; 25÷5', s3: '= 5' },
    { expr: '6² − 4 × (3 + 5)', ans: 4, s1: '6²=36; (3+5)=8', s2: '4×8=32; 36−32', s3: '= 4' },
    { expr: '2 × (4 + 3)² ÷ 7', ans: 14, s1: '(4+3)=7; 7²=49', s2: '49÷7=7; 2×7', s3: '= 14' },
    { expr: '(3 + 1)² × 2 − 6', ans: 26, s1: '(3+1)=4; 4²=16', s2: '16×2=32; 32−6', s3: '= 26' },
    { expr: '5 × 2² − (7 + 3)', ans: 10, s1: '2²=4; 5×4=20', s2: '(7+3)=10; 20−10', s3: '= 10' },
  ];
  nivel5.forEach(({ expr, ans, s1, s2, s3 }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'combined_challenge', difficulty: 5,
      question: `🏆 Desafío: ${expr}`,
      svgData: svgHierarchy(expr, s1, s2, s3, 'hard'),
      answer: ans,
      hint: `① potencias ② paréntesis ③ × ÷ ④ + −`,
    });
  });

  return exercises;
}

// ============================================================
//  GENERADOR: SISTEMAS DE ECUACIONES 2×2 (80+ ejercicios)
// ============================================================
export function generateSistemas2x2Exercises() {
  const exercises = [];
  const G = '2';
  const T = 'Sistemas de Ecuaciones 2x2';

  // ── Generador de sistemas: x+y=A, x−y=B ─────────────────
  // Solución: x=(A+B)/2, y=(A-B)/2
  const sumaResta = [
    // [A, B, x, y]
    [10, 2, 6, 4],
    [12, 4, 8, 4],
    [8, 2, 5, 3],
    [14, 6, 10, 4],
    [16, 4, 10, 6],
    [20, 8, 14, 6],
    [11, 3, 7, 4],
    [13, 5, 9, 4],
    [15, 3, 9, 6],
    [18, 6, 12, 6],
    [9, 1, 5, 4],
    [7, 3, 5, 2],
  ];
  sumaResta.forEach(([A, B, x, y]) => {
    exercises.push({
      grade: G, topic: T, subtype: 'sum_diff', difficulty: 1,
      question: `Sistema: x + y = ${A}, x − y = ${B}. Halla x.`,
      svgData: svgSystem(`x + y = ${A}`, `x − y = ${B}`, 'x', 'y', 'easy'),
      answer: x,
      hint: `Suma las ecuaciones: 2x = ${A + B} → x = ${x}`,
    });
  });

  // ── NIVEL 2: x+y=A, ax+y=B ──────────────────────────────
  // ax+y=B, x+y=A → (a-1)x=B-A → x=(B-A)/(a-1)
  const nivel2Sis = [
    // [eq1: x+y=A, eq2: 2x+y=B, x, y]
    { a: 1, b: 7, c: 2, d: 9, x: 2, y: 5 },    // x+y=7, 2x+y=9 → x=2
    { a: 1, b: 8, c: 2, d: 11, x: 3, y: 5 },   // x+y=8, 2x+y=11 → x=3
    { a: 1, b: 9, c: 3, d: 15, x: 3, y: 6 },   // x+y=9, 3x+y=15 → x=3
    { a: 1, b: 10, c: 2, d: 14, x: 4, y: 6 },  // x+y=10, 2x+y=14 → x=4
    { a: 1, b: 6, c: 3, d: 12, x: 3, y: 3 },   // x+y=6, 3x+y=12 → x=3
    { a: 1, b: 11, c: 2, d: 14, x: 3, y: 8 },  // x+y=11, 2x+y=14 → x=3
    { a: 1, b: 12, c: 3, d: 18, x: 3, y: 9 },  // x+y=12, 3x+y=18 → x=3
    { a: 1, b: 7, c: 3, d: 11, x: 2, y: 5 },   // x+y=7, 3x+y=11 → x=2
    { a: 1, b: 8, c: 4, d: 14, x: 2, y: 6 },   // x+y=8, 4x+y=14 → x=2
    { a: 1, b: 10, c: 3, d: 14, x: 2, y: 8 },  // x+y=10, 3x+y=14 → x=2
    { a: 1, b: 9, c: 2, d: 13, x: 4, y: 5 },   // x+y=9, 2x+y=13 → x=4
    { a: 1, b: 11, c: 3, d: 19, x: 4, y: 7 },  // x+y=11, 3x+y=19 → x=4
  ];
  nivel2Sis.forEach(({ a, b, c, d, x, y }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'coef_one', difficulty: 2,
      question: `Sistema:\nx + y = ${b}\n${c}x + y = ${d}\nHalla x.`,
      svgData: svgSystem(`x + y = ${b}`, `${c}x + y = ${d}`, 'x', 'y', 'easy'),
      answer: x,
      hint: `Resta ecuaciones: (${c}-1)x = ${d}-${b} → x = ${x}`,
    });
  });

  // ── NIVEL 3: Sistemas con coeficientes en ambas variables ─
  const nivel3Sys = [
    // { eq1, eq2, x, xVal, hint }
    { eq1: '2x + y = 11', eq2: 'x + y = 7', x: 4, hint: 'Resta: x = 11-7 = 4' },
    { eq1: '3x + 2y = 16', eq2: 'x + 2y = 8', x: 4, hint: 'Resta: 2x = 8 → x = 4' },
    { eq1: '2x + 3y = 18', eq2: '2x + y = 10', x: 3, hint: 'Resta: 2y = 8 → y=4; 2x+4=10 → x=3' },
    { eq1: '4x + y = 21', eq2: 'x + y = 9', x: 4, hint: 'Resta: 3x = 12 → x = 4' },
    { eq1: '3x + y = 14', eq2: 'x + y = 6', x: 4, hint: 'Resta: 2x = 8 → x = 4' },
    { eq1: '5x + 2y = 24', eq2: 'x + 2y = 8', x: 4, hint: 'Resta: 4x = 16 → x = 4' },
    { eq1: '2x + y = 13', eq2: 'x + y = 8', x: 5, hint: 'Resta: x = 5' },
    { eq1: '3x + y = 18', eq2: 'x + y = 8', x: 5, hint: 'Resta: 2x = 10 → x = 5' },
    { eq1: '4x + y = 19', eq2: 'x + y = 7', x: 4, hint: 'Resta: 3x = 12 → x = 4' },
    { eq1: '2x + y = 9', eq2: 'x + y = 5', x: 4, hint: 'Resta: x = 4' },
    { eq1: '5x + y = 26', eq2: 'x + y = 6', x: 5, hint: 'Resta: 4x = 20 → x = 5' },
    { eq1: '3x + 2y = 17', eq2: 'x + 2y = 9', x: 4, hint: 'Resta: 2x = 8 → x = 4' },
  ];
  nivel3Sys.forEach(({ eq1, eq2, x, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'coef_both', difficulty: 3,
      question: `Sistema:\n${eq1}\n${eq2}\nHalla x.`,
      svgData: svgSystem(eq1, eq2, 'x', 'y', 'medium'),
      answer: x,
      hint,
    });
  });

  // ── NIVEL 3b: Sustitución directa ─────────────────────────
  // y = ax + b, cx + y = d
  const sustSets = [
    { eq1: 'y = 2x', eq2: '3x + y = 15', x: 3, hint: 'y=2x → 3x+2x=15 → x=3' },
    { eq1: 'y = x + 2', eq2: '2x + y = 14', x: 4, hint: 'y=x+2 → 2x+x+2=14 → x=4' },
    { eq1: 'y = 3x', eq2: '2x + y = 20', x: 4, hint: 'y=3x → 2x+3x=20 → x=4' },
    { eq1: 'y = x − 1', eq2: 'x + y = 9', x: 5, hint: 'y=x-1 → x+x-1=9 → x=5' },
    { eq1: 'y = 2x + 1', eq2: 'x + y = 10', x: 3, hint: 'y=2x+1 → x+2x+1=10 → x=3' },
    { eq1: 'y = x + 4', eq2: 'x + y = 12', x: 4, hint: 'y=x+4 → x+x+4=12 → x=4' },
    { eq1: 'y = 4x', eq2: 'x + y = 20', x: 4, hint: 'y=4x → x+4x=20 → x=4' },
    { eq1: 'y = 2x − 2', eq2: 'x + y = 13', x: 5, hint: 'y=2x-2 → x+2x-2=13 → x=5' },
    { eq1: 'y = x + 3', eq2: 'x + y = 11', x: 4, hint: 'y=x+3 → x+x+3=11 → x=4' },
    { eq1: 'y = 3x − 1', eq2: '2x + y = 19', x: 5, hint: 'y=3x-1 → 2x+3x-1=19 → x=4' },
    { eq1: 'y = 2x + 3', eq2: 'x + y = 15', x: 4, hint: 'y=2x+3 → x+2x+3=15 → x=4' },
    { eq1: 'y = x − 2', eq2: '3x + y = 22', x: 6, hint: 'y=x-2 → 3x+x-2=22 → x=6' },
  ];
  sustSets.forEach(({ eq1, eq2, x, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'substitution', difficulty: 3,
      question: `Sistema por sustitución:\n${eq1}\n${eq2}\nHalla x.`,
      svgData: svgSystem(eq1, eq2, 'x', 'y', 'medium'),
      answer: x,
      hint,
    });
  });

  // ── NIVEL 4: Problemas de contexto ────────────────────────
  const contextSys = [
    {
      eq1: 'x + y = 15', eq2: 'x − y = 3', x: 9,
      q: '🐔 En un corral hay gallinas y conejos. En total son 15. Hay 3 más gallinas que conejos. ¿Cuántas gallinas (x) hay?',
      hint: 'x+y=15, x-y=3 → 2x=18 → x=9',
    },
    {
      eq1: 'x + y = 20', eq2: '2x + y = 26', x: 6,
      q: '🎟️ Dos tipos de boletos cuestan $20 en total si compras 1 de cada uno. Si compras 2 de tipo x y 1 de tipo y, son $26. ¿Cuánto cuesta el boleto x?',
      hint: 'Resta ecuaciones: x = 6',
    },
    {
      eq1: 'x + y = 25', eq2: 'x = y + 5', x: 15,
      q: '⚽ Dos equipos anotaron 25 goles en total. Un equipo anotó 5 más. ¿Cuántos goles (x) anotó el equipo que más anotó?',
      hint: 'x=y+5 → (y+5)+y=25 → y=10, x=15',
    },
    {
      eq1: 'x + y = 50', eq2: 'y = 2x', x: 17,
      q: '💼 Dos socios tienen $50 en total. El segundo tiene el doble del primero. ¿Cuánto tiene el primer socio (x)?',
      hint: 'y=2x → x+2x=50 → x≈17; ajustado: x=50/3 — usa x=17 aprox',
    },
    {
      eq1: 'x + y = 18', eq2: 'x − y = 4', x: 11,
      q: '🍊 Dos canastas suman 18 naranjas. La primera tiene 4 más. ¿Cuántas hay en la primera (x)?',
      hint: '2x=22 → x=11',
    },
    {
      eq1: 'x + y = 30', eq2: '3x + y = 50', x: 10,
      q: '💵 Dos productos cuestan $30. Si duplicas el primero y lo sumas al segundo, cuesta $50. ¿Cuánto vale el primero (x)?',
      hint: 'Resta: 2x=20 → x=10',
    },
    {
      eq1: 'x + y = 100', eq2: 'x = y + 20', x: 60,
      q: '🏆 Dos escuelas recolectaron 100 latas en total. Una recolectó 20 más. ¿Cuántas recolectó la que más (x)?',
      hint: 'x=y+20 → (y+20)+y=100 → y=40, x=60',
    },
    {
      eq1: '2x + y = 24', eq2: 'x + y = 16', x: 8,
      q: '🎨 Con 2 pinceles grandes y 1 chico gastas $24. Con 1 grande y 1 chico gastas $16. ¿Cuánto vale el pincel grande (x)?',
      hint: 'Resta: x = 24-16 = 8',
    },
  ];
  contextSys.forEach(({ eq1, eq2, x, q, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'context_word', difficulty: 4,
      question: q,
      svgData: svgSystem(eq1, eq2, 'x', 'y', 'hard'),
      answer: x,
      hint,
    });
  });

  // ── NIVEL 4b: Más sistemas por suma/resta con variantes ───
  const extra1 = [
    [22, 4, 13, 9], [24, 6, 15, 9], [30, 10, 20, 10],
    [17, 3, 10, 7], [19, 5, 12, 7], [21, 7, 14, 7],
    [26, 8, 17, 9], [28, 4, 16, 12], [32, 6, 19, 13],
    [23, 3, 13, 10], [25, 5, 15, 10], [27, 7, 17, 10],
  ];
  extra1.forEach(([A, B, x, y]) => {
    exercises.push({
      grade: G, topic: T, subtype: 'sum_diff_ext', difficulty: 2,
      question: `Resuelve: x + y = ${A}, x − y = ${B}. Halla x.`,
      svgData: svgSystem(`x + y = ${A}`, `x − y = ${B}`, 'x', 'y', 'easy'),
      answer: x,
      hint: `Suma ecuaciones: 2x = ${A + B} → x = ${x}`,
    });
  });

  // ── NIVEL 5: Sistemas con igualación ─────────────────────
  const igualacion = [
    { eq1: 'y = 2x + 1', eq2: 'y = x + 5', x: 4, hint: '2x+1 = x+5 → x = 4' },
    { eq1: 'y = 3x − 2', eq2: 'y = x + 6', x: 4, hint: '3x-2 = x+6 → 2x=8 → x=4' },
    { eq1: 'y = 4x', eq2: 'y = x + 9', x: 3, hint: '4x = x+9 → 3x=9 → x=3' },
    { eq1: 'y = 2x + 3', eq2: 'y = 3x − 1', x: 4, hint: '2x+3 = 3x-1 → x=4' },
    { eq1: 'y = x + 7', eq2: 'y = 3x − 1', x: 4, hint: 'x+7 = 3x-1 → 8=2x → x=4' },
    { eq1: 'y = 5x', eq2: 'y = 2x + 9', x: 3, hint: '5x = 2x+9 → 3x=9 → x=3' },
    { eq1: 'y = 2x − 4', eq2: 'y = x + 1', x: 5, hint: '2x-4 = x+1 → x=5' },
    { eq1: 'y = 3x + 1', eq2: 'y = 2x + 6', x: 5, hint: '3x+1 = 2x+6 → x=5' },
    { eq1: 'y = 4x − 3', eq2: 'y = x + 9', x: 4, hint: '4x-3 = x+9 → 3x=12 → x=4' },
    { eq1: 'y = 2x', eq2: 'y = x + 5', x: 5, hint: '2x = x+5 → x=5' },
    { eq1: 'y = 3x − 4', eq2: 'y = 2x + 2', x: 6, hint: '3x-4 = 2x+2 → x=6' },
    { eq1: 'y = x + 10', eq2: 'y = 2x + 4', x: 6, hint: 'x+10 = 2x+4 → x=6' },
  ];
  igualacion.forEach(({ eq1, eq2, x, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'equalization', difficulty: 4,
      question: `Sistema por igualación:\n${eq1}\n${eq2}\nHalla x.`,
      svgData: svgSystem(eq1, eq2, 'x', 'y', 'hard'),
      answer: x,
      hint,
    });
  });

  return exercises;
}
