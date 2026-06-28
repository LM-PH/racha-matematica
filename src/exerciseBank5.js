// ============================================================
//  BANCO DE EJERCICIOS GRADO 2 Y 3 (PARTE 5)
//  Medidas de Tendencia Central | Introducción al álgebra (Grado 2)
//  Lenguaje algebraico 2x2 | Funciones (Grado 3)
// ============================================================

// ---------- HELPERS SVG ----------

/** Genera una tarjeta visual para mostrar datos de tendencia central */
function svgCentralTendency(title, numbers) {
  const pills = numbers.map((n, i) => {
    const colors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#14B8A6'];
    const color = colors[i % colors.length];
    return `
      <g transform="translate(${25 + i * 38}, 70)">
        <rect width="32" height="42" rx="8" fill="${color}" opacity="0.15" stroke="${color}" stroke-width="2"/>
        <text x="16" y="27" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#1E293B">${n}</text>
      </g>
    `;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="200" viewBox="0 0 310 200">
    <rect width="310" height="200" rx="16" fill="#F8FAFC"/>
    <text x="155" y="32" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#4F46E5" letter-spacing="1">TENDENCIA CENTRAL</text>
    <text x="155" y="52" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#1E293B">${title}</text>
    <g>${pills}</g>
    <line x1="20" y1="140" x2="290" y2="140" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="4,3"/>
    <text x="155" y="165" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748B" font-weight="bold">Calcula el resultado numérico</text>
    <text x="155" y="182" text-anchor="middle" font-family="Arial" font-size="10" fill="#94A3B8">Escribe un entero o decimal (ej. 5.5)</text>
  </svg>`;
}

/** Genera un pizarrón de fondo oscuro para simplificación algebraica */
function svgAlgebraIntro(type, expression) {
  const typeIcons = { suma: '➕', resta: '➖', multiplicacion: '✖️' };
  const icon = typeIcons[type] || '📝';
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="200" viewBox="0 0 310 200">
    <rect width="310" height="200" rx="16" fill="#F3F4F6"/>
    <text x="155" y="30" text-anchor="middle" font-family="Arial" font-size="20">${icon}</text>
    <text x="155" y="48" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#4B5563" letter-spacing="1">INTRODUCCIÓN AL ÁLGEBRA</text>
    <line x1="25" y1="56" x2="285" y2="56" stroke="#D1D5DB" stroke-width="1.5"/>
    <rect x="20" y="68" width="270" height="60" rx="10" fill="#1F2937" stroke="#4B5563" stroke-width="2"/>
    <text x="155" y="104" text-anchor="middle" font-family="Courier New, monospace" font-size="16" font-weight="bold" fill="#10B981">${expression}</text>
    <line x1="20" y1="145" x2="290" y2="145" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="4,3"/>
    <text x="155" y="168" text-anchor="middle" font-family="Arial" font-size="11" fill="#6B7280" font-weight="bold">Simplifica la expresión algebraica</text>
    <text x="155" y="184" text-anchor="middle" font-family="Arial" font-size="9" fill="#9CA3AF">Elige la opción correcta abajo</text>
  </svg>`;
}

/** Genera una hoja de cuaderno para traducción algebraica de problemas 2x2 */
function svgAlgebraicTranslation(problemText) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="200" viewBox="0 0 310 200">
    <rect width="310" height="200" rx="16" fill="#FDF8F5"/>
    <text x="155" y="32" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#D97706" letter-spacing="1">LENGUAJE ALGEBRAICO 2x2</text>
    <line x1="25" y1="40" x2="285" y2="40" stroke="#FDE68A" stroke-width="2"/>
    <rect x="20" y="50" width="270" height="95" rx="8" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.5"/>
    <foreignObject x="30" y="56" width="250" height="82">
      <body xmlns="http://www.w3.org/1999/xhtml">
        <p style="font-family:'Courier New', monospace;font-size:12px;color:#1F2937;margin:0;line-height:1.45;font-weight:bold">${problemText}</p>
      </body>
    </foreignObject>
    <line x1="20" y1="158" x2="290" y2="158" stroke="#F3F4F6" stroke-width="1" stroke-dasharray="4,3"/>
    <text x="155" y="176" text-anchor="middle" font-family="Arial" font-size="11" fill="#78350F" font-weight="bold">Traduce a un sistema de ecuaciones</text>
    <text x="155" y="190" text-anchor="middle" font-family="Arial" font-size="9" fill="#92400E">Elige la opción correcta abajo</text>
  </svg>`;
}

/** Dibuja gráficas matemáticas sobre un plano cartesiano */
function svgFunctionsGraph(type, equation = '') {
  let graphPath = '';
  let color = '#4F46E5';
  let typeLabel = '';

  if (type === 'lineal') {
    graphPath = '<line x1="50" y1="150" x2="260" y2="50" stroke="#4F46E5" stroke-width="3"/>';
    typeLabel = 'Línea recta (Grado 1)';
  } else if (type === 'cuadratica') {
    graphPath = '<path d="M 50,55 Q 155,185 260,55" stroke="#10B981" stroke-width="3" fill="none"/>';
    color = '#10B981';
    typeLabel = 'Parábola (Grado 2)';
  } else if (type === 'cubica') {
    graphPath = '<path d="M 60,150 C 110,180 110,40 155,95 C 200,150 200,10 250,40" stroke="#EC4899" stroke-width="3" fill="none"/>';
    color = '#EC4899';
    typeLabel = 'Curva cúbica (Grado 3)';
  } else if (type === 'constante') {
    graphPath = '<line x1="40" y1="100" x2="270" y2="100" stroke="#F59E0B" stroke-width="3"/>';
    color = '#F59E0B';
    typeLabel = 'Línea horizontal (Grado 0)';
  }

  const eqText = equation ? `<text x="155" y="186" text-anchor="middle" font-family="Courier New" font-size="14" font-weight="bold" fill="${color}">${equation}</text>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="200" viewBox="0 0 310 200">
    <rect width="310" height="200" rx="16" fill="#F0FDF4"/>
    <text x="155" y="28" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#15803D" letter-spacing="1">IDENTIFICAR GRÁFICA</text>
    
    <!-- Plano Cartesiano de Fondo -->
    <g stroke="#DCFCE7" stroke-width="1">
      <line x1="30" y1="95" x2="280" y2="95" stroke="#86EFAC" stroke-width="1.5"/>
      <line x1="155" y1="40" x2="155" y2="150" stroke="#86EFAC" stroke-width="1.5"/>
      <line x1="90" y1="40" x2="90" y2="150"/>
      <line x1="220" y1="40" x2="220" y2="150"/>
      <line x1="30" y1="65" x2="280" y2="65"/>
      <line x1="30" y1="125" x2="280" y2="125"/>
    </g>
    
    <!-- Ejes con flechas -->
    <path d="M 280,95 L 275,91 M 280,95 L 275,99" stroke="#86EFAC" stroke-width="1.5"/>
    <path d="M 155,40 L 151,45 M 155,40 L 159,45" stroke="#86EFAC" stroke-width="1.5"/>

    <!-- Trazado de función -->
    ${graphPath}

    <line x1="20" y1="165" x2="290" y2="165" stroke="#DCFCE7" stroke-width="1.5" stroke-dasharray="4,3"/>
    
    ${eqText ? eqText : `<text x="155" y="185" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#15803D">${typeLabel}</text>`}
  </svg>`;
}

// ============================================================
//  GENERADORES DE EJERCICIOS
// ============================================================

/** Genera 40 ejercicios de Medidas de Tendencia Central */
export function generateMedidasTendenciaCentralExercises() {
  const exercises = [];
  const G = '2';
  const T = 'Medidas de tendencia central';

  // --- 10 ejercicios de Media ---
  const mediaData = [
    { list: [3, 5, 7, 9, 11], ans: 7, hint: 'Suma de datos = 35. Divide entre 5: 35 / 5 = 7.' },
    { list: [4, 8, 12, 16], ans: 10, hint: 'Suma de datos = 40. Divide entre 4: 40 / 4 = 10.' },
    { list: [5, 5, 10, 10, 20], ans: 10, hint: 'Suma de datos = 50. Divide entre 5: 50 / 5 = 10.' },
    { list: [2, 3, 5, 8, 12], ans: 6, hint: 'Suma de datos = 30. Divide entre 5: 30 / 5 = 6.' },
    { list: [10, 15, 20, 25, 30], ans: 20, hint: 'Suma de datos = 100. Divide entre 5: 100 / 5 = 20.' },
    { list: [1, 2, 3, 4, 5, 6, 7], ans: 4, hint: 'Suma de datos = 28. Divide entre 7: 28 / 7 = 4.' },
    { list: [6, 7, 8, 9, 10], ans: 8, hint: 'Suma de datos = 40. Divide entre 5: 40 / 5 = 8.' },
    { list: [8, 12, 15, 17, 23], ans: 15, hint: 'Suma de datos = 75. Divide entre 5: 75 / 5 = 15.' },
    { list: [4, 5, 6, 7], ans: 5.5, hint: 'Suma de datos = 22. Divide entre 4: 22 / 4 = 5.5.' },
    { list: [9, 11, 13, 15], ans: 12, hint: 'Suma de datos = 48. Divide entre 4: 48 / 4 = 12.' }
  ];

  mediaData.forEach(({ list, ans, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'media',
      question: `Calcula la MEDIA (promedio) del siguiente conjunto de datos.`,
      svgData: svgCentralTendency('CALCULA LA MEDIA', list),
      answer: ans,
      hint: hint
    });
  });

  // --- 10 ejercicios de Mediana ---
  const medianaData = [
    { list: [12, 5, 8, 3, 19], ans: 8, hint: 'Ordena los datos: 3, 5, 8, 12, 19. El valor central es 8.' },
    { list: [7, 2, 15, 9, 11], ans: 9, hint: 'Ordena los datos: 2, 7, 9, 11, 15. El valor central es 9.' },
    { list: [20, 10, 30, 40, 50], ans: 30, hint: 'Ordena los datos: 10, 20, 30, 40, 50. El valor central es 30.' },
    { list: [4, 1, 9, 6, 12, 8, 15], ans: 8, hint: 'Ordena los datos: 1, 4, 6, 8, 9, 12, 15. El valor central es 8.' },
    { list: [3, 8, 5, 12], ans: 6.5, hint: 'Ordena los datos: 3, 5, 8, 12. Saca el promedio de los dos del centro (5 + 8) / 2 = 6.5.' },
    { list: [14, 10, 18, 16], ans: 15, hint: 'Ordena los datos: 10, 14, 16, 18. Saca el promedio de los dos del centro (14 + 16) / 2 = 15.' },
    { list: [2, 9, 4, 7, 5, 11, 8], ans: 7, hint: 'Ordena los datos: 2, 4, 5, 7, 8, 9, 11. El valor central es 7.' },
    { list: [25, 15, 35, 45], ans: 30, hint: 'Ordena los datos: 15, 25, 35, 45. Promedio de centrales: (25 + 35) / 2 = 30.' },
    { list: [6, 1, 9, 4, 10], ans: 6, hint: 'Ordena los datos: 1, 4, 6, 9, 10. El valor central es 6.' },
    { list: [3, 10, 5, 8], ans: 6.5, hint: 'Ordena los datos: 3, 5, 8, 10. Promedio de centrales: (5 + 8) / 2 = 6.5.' }
  ];

  medianaData.forEach(({ list, ans, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'mediana',
      question: `Calcula la MEDIANA (el número del centro al ordenar) del conjunto de datos.`,
      svgData: svgCentralTendency('CALCULA LA MEDIANA', list),
      answer: ans,
      hint: hint
    });
  });

  // --- 10 ejercicios de Moda ---
  const modaData = [
    { list: [3, 5, 5, 8, 9, 5], ans: 5, hint: 'El número 5 se repite 3 veces. Es el que más aparece.' },
    { list: [4, 4, 7, 8, 10, 4, 12], ans: 4, hint: 'El número 4 se repite 3 veces. Es la moda.' },
    { list: [10, 20, 20, 30, 40], ans: 20, hint: 'El número 20 aparece 2 veces, los demás sólo 1.' },
    { list: [1, 2, 2, 3, 3, 3, 4], ans: 3, hint: 'El número 3 se repite 3 veces. Es la moda.' },
    { list: [8, 12, 8, 15, 8, 20], ans: 8, hint: 'El número 8 aparece 3 veces. Es la moda.' },
    { list: [5, 9, 9, 12, 15, 9], ans: 9, hint: 'El número 9 aparece 3 veces. Es la moda.' },
    { list: [11, 14, 11, 16, 11, 18], ans: 11, hint: 'El número 11 aparece 3 veces. Es la moda.' },
    { list: [6, 6, 8, 10, 6, 12], ans: 6, hint: 'El número 6 aparece 3 veces. Es la moda.' },
    { list: [15, 25, 25, 35, 45], ans: 25, hint: 'El número 25 aparece 2 veces. Es la moda.' },
    { list: [7, 7, 7, 9, 12], ans: 7, hint: 'El número 7 aparece 3 veces. Es la moda.' }
  ];

  modaData.forEach(({ list, ans, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'moda',
      question: `Calcula la MODA (el dato que más se repite) de este conjunto.`,
      svgData: svgCentralTendency('CALCULA LA MODA', list),
      answer: ans,
      hint: hint
    });
  });

  // --- 10 ejercicios de Rango ---
  const rangoData = [
    { list: [3, 5, 8, 12, 19], ans: 16, hint: 'Mayor valor = 19, Menor = 3. Rango = 19 - 3 = 16.' },
    { list: [10, 4, 25, 15, 30], ans: 26, hint: 'Mayor valor = 30, Menor = 4. Rango = 30 - 4 = 26.' },
    { list: [8, 2, 14, 7, 9], ans: 12, hint: 'Mayor valor = 14, Menor = 2. Rango = 14 - 2 = 12.' },
    { list: [45, 12, 33, 28], ans: 33, hint: 'Mayor valor = 45, Menor = 12. Rango = 45 - 12 = 33.' },
    { list: [5, 5, 5, 5], ans: 0, hint: 'Mayor valor = 5, Menor = 5. Rango = 5 - 5 = 0.' },
    { list: [100, 20, 80, 50], ans: 80, hint: 'Mayor valor = 100, Menor = 20. Rango = 100 - 20 = 80.' },
    { list: [9, 18, 27, 36], ans: 27, hint: 'Mayor valor = 36, Menor = 9. Rango = 36 - 9 = 27.' },
    { list: [15, 42, 23, 8], ans: 34, hint: 'Mayor valor = 42, Menor = 8. Rango = 42 - 8 = 34.' },
    { list: [60, 10, 90, 40], ans: 80, hint: 'Mayor valor = 90, Menor = 10. Rango = 90 - 10 = 80.' },
    { list: [14, 7, 21, 28], ans: 21, hint: 'Mayor valor = 28, Menor = 7. Rango = 28 - 7 = 21.' }
  ];

  rangoData.forEach(({ list, ans, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'rango',
      question: `Calcula el RANGO (diferencia entre el valor máximo y el mínimo).`,
      svgData: svgCentralTendency('CALCULA EL RANGO', list),
      answer: ans,
      hint: hint
    });
  });

  return exercises;
}

/** Genera 40 ejercicios de Introducción al álgebra */
export function generateIntroduccionAlgebraExercises() {
  const exercises = [];
  const G = '2';
  const T = 'Introducción al álgebra';

  const list = [
    // --- SUMAS ---
    { expr: '(3x + 5) + (2x + 1)', ans: '5x + 6', opts: ['5x + 6', '5x + 4', '6x + 5', '5x - 6'], type: 'suma', hint: 'Suma términos semejantes: 3x+2x = 5x y 5+1 = 6. Resultado: 5x + 6.' },
    { expr: '(4a - 2) + (a + 5)', ans: '5a + 3', opts: ['5a + 3', '5a - 3', '4a + 3', '5a + 7'], type: 'suma', hint: 'Suma: 4a+a = 5a y -2+5 = 3. Resultado: 5a + 3.' },
    { expr: '(2y + 7) + (3y - 4)', ans: '5y + 3', opts: ['5y + 3', '5y + 11', '6y + 3', '5y - 3'], type: 'suma', hint: 'Suma semejantes: 2y+3y = 5y y 7-4 = 3. Resultado: 5y + 3.' },
    { expr: '(x² + 2x) + (2x² + 3x)', ans: '3x² + 5x', opts: ['3x² + 5x', '2x² + 5x', '3x² + 6x', '3x + 5x'], type: 'suma', hint: 'Suma términos semejantes: x²+2x² = 3x² y 2x+3x = 5x. Resultado: 3x² + 5x.' },
    { expr: '(-2x + 4) + (5x - 1)', ans: '3x + 3', opts: ['3x + 3', '7x + 3', '3x + 5', '-3x + 3'], type: 'suma', hint: 'Suma semejantes: -2x+5x = 3x y 4-1 = 3.' },
    { expr: '(5b - 3) + (-2b + 8)', ans: '3b + 5', opts: ['3b + 5', '7b + 5', '3b - 11', '3b + 11'], type: 'suma', hint: 'Suma semejantes: 5b-2b = 3b y -3+8 = 5.' },
    { expr: '(3x² + 4) + (x² - 2)', ans: '4x² + 2', opts: ['4x² + 2', '4x² - 2', '3x² + 2', '4x + 2'], type: 'suma', hint: 'Suma: 3x²+x² = 4x² y 4-2 = 2.' },
    { expr: '(2x + y) + (x - 2y)', ans: '3x - y', opts: ['3x - y', '3x + y', '3x - 2y', '2x - y'], type: 'suma', hint: 'Suma semejantes: 2x+x = 3x y y-2y = -y.' },
    { expr: '(7m - 3) + (2m - 5)', ans: '9m - 8', opts: ['9m - 8', '9m + 8', '5m - 8', '9m - 2'], type: 'suma', hint: 'Suma: 7m+2m = 9m y -3-5 = -8.' },
    { expr: '(a² + 3a + 2) + (2a² - a + 4)', ans: '3a² + 2a + 6', opts: ['3a² + 2a + 6', '3a² + 4a + 6', '2a² + 2a + 6', '3a² + 2a + 2'], type: 'suma', hint: 'Agrupa: a²+2a² = 3a², 3a-a = 2a, y 2+4 = 6.' },
    { expr: '(4x - 6) + (3x + 8)', ans: '7x + 2', opts: ['7x + 2', '7x - 14', '7x + 14', 'x + 2'], type: 'suma', hint: 'Suma semejantes: 4x+3x = 7x y -6+8 = 2.' },
    { expr: '(5x² - 2x) + (-3x² + 6x)', ans: '2x² + 4x', opts: ['2x² + 4x', '8x² + 4x', '2x² - 8x', '2x² + 8x'], type: 'suma', hint: 'Suma: 5x²-3x² = 2x² y -2x+6x = 4x.' },
    { expr: '(3x + 2y) + (2x - 5y)', ans: '5x - 3y', opts: ['5x - 3y', '5x + 3y', '6x - 3y', '5x - 7y'], type: 'suma', hint: 'Suma semejantes: 3x+2x = 5x y 2y-5y = -3y.' },
    { expr: '(m² - m) + (2m² + 3m)', ans: '3m² + 2m', opts: ['3m² + 2m', '3m² - 4m', '2m² + 2m', '3m² + 4m'], type: 'suma', hint: 'Suma semejantes: m²+2m² = 3m² y -m+3m = 2m.' },

    // --- RESTAS ---
    { expr: '(5x + 7) - (2x + 3)', ans: '3x + 4', opts: ['3x + 4', '3x + 10', '7x + 4', '3x - 4'], type: 'resta', hint: 'Resta términos: (5x-2x) = 3x y (7-3) = 4. Resultado: 3x + 4.' },
    { expr: '(3a - 1) - (a - 4)', ans: '2a + 3', opts: ['2a + 3', '2a - 5', '2a - 3', '3a + 3'], type: 'resta', hint: 'Cambia signos: 3a - 1 - a + 4 = 2a + 3.' },
    { expr: '(4y + 5) - (2y - 2)', ans: '2y + 7', opts: ['2y + 7', '2y + 3', '6y + 7', '2y - 7'], type: 'resta', hint: 'Opera: 4y + 5 - 2y + 2 = 2y + 7.' },
    { expr: '(3x² + 5x) - (x² + 2x)', ans: '2x² + 3x', opts: ['2x² + 3x', '2x² + 7x', '4x² + 3x', '2x² - 3x'], type: 'resta', hint: 'Resta semejantes: 3x²-x² = 2x² y 5x-2x = 3x.' },
    { expr: '(2x - 3) - (5x - 1)', ans: '-3x - 2', opts: ['-3x - 2', '-3x - 4', '3x - 2', '-3x + 2'], type: 'resta', hint: 'Opera: 2x - 3 - 5x + 1 = -3x - 2.' },
    { expr: '(6b + 2) - (-2b + 5)', ans: '8b - 3', opts: ['8b - 3', '4b - 3', '8b + 7', '8b - 7'], type: 'resta', hint: 'Opera: 6b + 2 + 2b - 5 = 8b - 3.' },
    { expr: '(4x² - 3) - (2x² - 7)', ans: '2x² + 4', opts: ['2x² + 4', '2x² - 10', '2x² - 4', '6x² + 4'], type: 'resta', hint: 'Opera: 4x² - 3 - 2x² + 7 = 2x² + 4.' },
    { expr: '(3x + 2y) - (x - y)', ans: '2x + 3y', opts: ['2x + 3y', '2x + y', '2x - 3y', '4x + 3y'], type: 'resta', hint: 'Opera: 3x + 2y - x + y = 2x + 3y.' },
    { expr: '(8m - 2) - (3m - 7)', ans: '5m + 5', opts: ['5m + 5', '5m - 9', '5m - 5', '11m + 5'], type: 'resta', hint: 'Opera: 8m - 2 - 3m + 7 = 5m + 5.' },
    { expr: '(2x² + 4x - 3) - (x² - 2x + 1)', ans: 'x² + 6x - 4', opts: ['x² + 6x - 4', 'x² + 2x - 4', 'x² + 6x - 2', '2x² + 6x - 4'], type: 'resta', hint: 'Opera: 2x² + 4x - 3 - x² + 2x - 1 = x² + 6x - 4.' },
    { expr: '(5x - 4) - (2x + 2)', ans: '3x - 6', opts: ['3x - 6', '3x - 2', '7x - 6', '3x + 6'], type: 'resta', hint: 'Opera: 5x - 4 - 2x - 2 = 3x - 6.' },
    { expr: '(3x² - 5x) - (-x² + 2x)', ans: '4x² - 7x', opts: ['4x² - 7x', '2x² - 7x', '4x² - 3x', '4x² + 7x'], type: 'resta', hint: 'Opera: 3x² - 5x + x² - 2x = 4x² - 7x.' },
    { expr: '(4x + 3y) - (2x - 2y)', ans: '2x + 5y', opts: ['2x + 5y', '2x + y', '6x + 5y', '2x - y'], type: 'resta', hint: 'Opera: 4x + 3y - 2x + 2y = 2x + 5y.' },

    // --- MULTIPLICACIONES ---
    { expr: '3 * (2x + 4)', ans: '6x + 12', opts: ['6x + 12', '6x + 4', '5x + 12', '6x + 7'], type: 'multiplicacion', hint: 'Distribuye el 3 multiplicando a cada término: 3*2x = 6x y 3*4 = 12. Resultado: 6x + 12.' },
    { expr: 'x * (x + 5)', ans: 'x² + 5x', opts: ['x² + 5x', '2x + 5x', 'x² + 5', 'x² + 5x²'], type: 'multiplicacion', hint: 'Distribuye la x: x*x = x² y x*5 = 5x. Resultado: x² + 5x.' },
    { expr: '2x * (3x - 2)', ans: '6x² - 4x', opts: ['6x² - 4x', '6x - 4x', '5x² - 4x', '6x² - 2'], type: 'multiplicacion', hint: 'Distribuye: 2x*3x = 6x² y 2x*(-2) = -4x. Resultado: 6x² - 4x.' },
    { expr: '(x + 2) * (x + 3)', ans: 'x² + 5x + 6', opts: ['x² + 5x + 6', 'x² + 6x + 5', 'x² + 5x + 5', 'x² + 6'], type: 'multiplicacion', hint: 'Multiplica términos (FOIL): x*x + 3*x + 2*x + 2*3 = x² + 5x + 6.' },
    { expr: '-2 * (4x - 3)', ans: '-8x + 6', opts: ['-8x + 6', '-8x - 6', '-8x + 3', '8x + 6'], type: 'multiplicacion', hint: 'Multiplica por -2 respetando signos: -2*4x = -8x y -2*(-3) = 6.' },
    { expr: '3x * (2x² + 4)', ans: '6x³ + 12x', opts: ['6x³ + 12x', '6x² + 12x', '6x³ + 4', '5x³ + 12x'], type: 'multiplicacion', hint: 'Distribuye: 3x*2x² = 6x³ y 3x*4 = 12x.' },
    { expr: '(x - 1) * (x + 4)', ans: 'x² + 3x - 4', opts: ['x² + 3x - 4', 'x² + 5x - 4', 'x² + 3x + 4', 'x² - 4'], type: 'multiplicacion', hint: 'Opera: x*x + 4x - x - 4 = x² + 3x - 4.' },
    { expr: '(x - 2) * (x - 3)', ans: 'x² - 5x + 6', opts: ['x² - 5x + 6', 'x² - 5x - 6', 'x² + 5x + 6', 'x² + 6'], type: 'multiplicacion', hint: 'Opera: x*x - 3x - 2x + 6 = x² - 5x + 6.' },
    { expr: '4a * (2a + 3b)', ans: '8a² + 12ab', opts: ['8a² + 12ab', '8a + 12ab', '6a² + 12ab', '8a² + 3b'], type: 'multiplicacion', hint: 'Distribuye: 4a*2a = 8a² y 4a*3b = 12ab.' },
    { expr: '(2x + 1) * (x + 2)', ans: '2x² + 5x + 2', opts: ['2x² + 5x + 2', '2x² + 4x + 2', '2x² + 5x + 3', '3x² + 5x + 2'], type: 'multiplicacion', hint: 'Opera: 2x*x + 2x*2 + 1*x + 1*2 = 2x² + 5x + 2.' },
    { expr: '5x² * (x - 3)', ans: '5x³ - 15x²', opts: ['5x³ - 15x²', '5x² - 15x', '5x³ - 3', '5x³ - 15x'], type: 'multiplicacion', hint: 'Distribuye: 5x²*x = 5x³ y 5x²*(-3) = -15x².' },
    { expr: '(x + 5) * (x - 5)', ans: 'x² - 25', opts: ['x² - 25', 'x² + 25', 'x² - 10x - 25', 'x² - 5'], type: 'multiplicacion', hint: 'Es una diferencia de cuadrados: x² - 5² = x² - 25.' },
    { expr: '-3x * (x² - 2x + 1)', ans: '-3x³ + 6x² - 3x', opts: ['-3x³ + 6x² - 3x', '-3x³ - 6x² - 3x', '-3x³ + 6x² + 3x', '-3x³ + 2x - 3x'], type: 'multiplicacion', hint: 'Distribuye: -3x*x² = -3x³, -3x*(-2x) = 6x², y -3x*1 = -3x.' }
  ];

  list.forEach(({ expr, ans, opts, type, hint }) => {
    // Barajar opciones
    const shuffledOpts = [...opts].sort(() => Math.random() - 0.5);

    exercises.push({
      grade: G, topic: T, subtype: type,
      question: `Simplifica la expresión algebraica mostrada en la pantalla.`,
      svgData: svgAlgebraIntro(type, expr),
      answer: ans,
      options: shuffledOpts,
      hint: hint
    });
  });

  return exercises;
}

/** Genera 40 ejercicios de Lenguaje algebraico para ecuaciones 2x2 */
export function generateLenguajeAlgebraico2x2Exercises() {
  const exercises = [];
  const G = '3';
  const T = 'Lenguaje algebraico para ecuaciones 2x2';

  const probs = [
    { q: 'La suma de dos números es 15 y su diferencia es 3.', ans: 'x + y = 15, x - y = 3', opts: ['x + y = 15, x - y = 3', 'x - y = 15, x + y = 3', 'x + y = 15, 2x - y = 3', 'x + y = 18, x - y = 3'] },
    { q: 'En un corral hay 20 cabezas y 50 patas entre gallinas (x) y conejos (y).', ans: 'x + y = 20, 2x + 4y = 50', opts: ['x + y = 20, 2x + 4y = 50', 'x + y = 20, 4x + 2y = 50', 'x + y = 50, 2x + 4y = 20', 'x - y = 20, 2x + 4y = 50'] },
    { q: 'Un padre tiene el triple de la edad de su hijo (y). La suma de sus edades es 48.', ans: 'x = 3y, x + y = 48', opts: ['x = 3y, x + y = 48', 'y = 3x, x + y = 48', 'x = y + 3, x + y = 48', 'x = 3y, x - y = 48'] },
    { q: 'Compré 3 refrescos (x) y 2 papas (y) por $60. Mi amigo compró 1 refresco y 4 papas por $70.', ans: '3x + 2y = 60, x + 4y = 70', opts: ['3x + 2y = 60, x + 4y = 70', '2x + 3y = 60, 4x + y = 70', '3x + 2y = 70, x + 4y = 60', '3x - 2y = 60, x - 4y = 70'] },
    { q: 'Un boleto de adulto (x) cuesta $50 y uno de niño (y) $30. Se vendieron 100 boletos por $4200.', ans: 'x + y = 100, 50x + 30y = 4200', opts: ['x + y = 100, 50x + 30y = 4200', 'x + y = 100, 30x + 50y = 4200', 'x + y = 4200, 50x + 30y = 100', 'x - y = 100, 50x + 30y = 4200'] },
    { q: 'El largo (x) de un terreno es el doble del ancho (y). Su perímetro es de 60 metros.', ans: 'x = 2y, 2x + 2y = 60', opts: ['x = 2y, 2x + 2y = 60', 'x = 2y, x + y = 60', 'y = 2x, 2x + 2y = 60', 'x = 2y, 2x - 2y = 60'] },
    { q: 'En un examen de 20 preguntas, cada acierto (x) suma 5 puntos y cada error (y) resta 2. Obtuve 72 puntos.', ans: 'x + y = 20, 5x - 2y = 72', opts: ['x + y = 20, 5x - 2y = 72', 'x + y = 20, 5x + 2y = 72', 'x - y = 20, 5x - 2y = 72', 'x + y = 72, 5x - 2y = 20'] },
    { q: 'La suma de dos números es 35. El doble del primero (x) más el segundo (y) es 50.', ans: 'x + y = 35, 2x + y = 50', opts: ['x + y = 35, 2x + y = 50', 'x + y = 35, x + 2y = 50', 'x - y = 35, 2x + y = 50', 'x + y = 50, 2x + y = 35'] },
    { q: 'Compré un pantalón (x) y una playera (y) por $500. El pantalón costó $150 más que la playera.', ans: 'x + y = 500, x = y + 150', opts: ['x + y = 500, x = y + 150', 'x + y = 500, y = x + 150', 'x + y = 150, x = y + 500', 'x - y = 500, x = y + 150'] },
    { q: 'En un estacionamiento hay 30 vehículos entre autos (x) y motos (y). Hay 96 llantas en total.', ans: 'x + y = 30, 4x + 2y = 96', opts: ['x + y = 30, 4x + 2y = 96', 'x + y = 30, 2x + 4y = 96', 'x + y = 96, 4x + 2y = 30', 'x - y = 30, 4x + 2y = 96'] },
    { q: 'La suma de dos ángulos es 90° y su diferencia es 20°.', ans: 'x + y = 90, x - y = 20', opts: ['x + y = 90, x - y = 20', 'x + y = 90, x + y = 20', 'x - y = 90, x + y = 20', 'x + y = 20, x - y = 90'] },
    { q: 'Un número (x) es 5 unidades mayor que otro (y). Su suma es 25.', ans: 'x = y + 5, x + y = 25', opts: ['x = y + 5, x + y = 25', 'y = x + 5, x + y = 25', 'x = y - 5, x + y = 25', 'x = y + 5, x - y = 25'] },
    { q: 'En una alcancía hay 40 monedas de $5 (x) y $10 (y). En total hay $275.', ans: 'x + y = 40, 5x + 10y = 275', opts: ['x + y = 40, 5x + 10y = 275', 'x + y = 40, 10x + 5y = 275', 'x + y = 275, 5x + 10y = 40', 'x - y = 40, 5x + 10y = 275'] },
    { q: 'El triple de un número (x) más el doble de otro (y) es 25. La diferencia de los números es 5.', ans: '3x + 2y = 25, x - y = 5', opts: ['3x + 2y = 25, x - y = 5', '2x + 3y = 25, x - y = 5', '3x + 2y = 25, x + y = 5', '3x - 2y = 25, x - y = 5'] },
    { q: 'Un viaje costó $120. Compramos boletos de primera clase (x) a $30 y de segunda (y) a $15. Compramos 6 boletos.', ans: 'x + y = 6, 30x + 15y = 120', opts: ['x + y = 6, 30x + 15y = 120', 'x + y = 6, 15x + 30y = 120', 'x + y = 120, 30x + 15y = 6', 'x - y = 6, 30x + 15y = 120'] },
    { q: 'El perímetro de un rectángulo es 40 cm. La base (x) es 4 cm más larga que la altura (y).', ans: '2x + 2y = 40, x = y + 4', opts: ['2x + 2y = 40, x = y + 4', 'x + y = 40, x = y + 4', '2x + 2y = 40, y = x + 4', '2x - 2y = 40, x = y + 4'] },
    { q: 'En una cafetería, 2 cafés (x) y 3 panes (y) cuestan $85. 4 cafés y 1 pan cuestan $105.', ans: '2x + 3y = 85, 4x + y = 105', opts: ['2x + 3y = 85, 4x + y = 105', '3x + 2y = 85, x + 4y = 105', '2x + 3y = 105, 4x + y = 85', '2x - 3y = 85, 4x - y = 105'] },
    { q: 'Un grupo de 15 personas fue al cine y pagó $1200. La entrada general (x) vale $90 y la preferencial (y) $120.', ans: 'x + y = 15, 90x + 120y = 1200', opts: ['x + y = 15, 90x + 120y = 1200', 'x + y = 15, 120x + 90y = 1200', 'x + y = 1200, 90x + 120y = 15', 'x - y = 15, 90x + 120y = 1200'] },
    { q: 'La diferencia de dos números es 8. El primero (x) es el triple del segundo (y).', ans: 'x - y = 8, x = 3y', opts: ['x - y = 8, x = 3y', 'x + y = 8, x = 3y', 'x - y = 8, y = 3x', 'y - x = 8, x = 3y'] },
    { q: 'Tengo billetes de $50 (x) y $100 (y). En total son 12 billetes que suman $800.', ans: 'x + y = 12, 50x + 100y = 800', opts: ['x + y = 12, 50x + 100y = 800', 'x + y = 12, 100x + 50y = 800', 'x + y = 800, 50x + 100y = 12', 'x - y = 12, 50x + 100y = 800'] },
    { q: 'El doble de la edad de Ana (x) más la de Beto (y) es 32. La diferencia de sus edades es 4.', ans: '2x + y = 32, x - y = 4', opts: ['2x + y = 32, x - y = 4', 'x + 2y = 32, x - y = 4', '2x + y = 32, x + y = 4', '2x - y = 32, x - y = 4'] },
    { q: 'Por 5 manzanas (x) y 3 plátanos (y) pagué $38. Por 2 manzanas y 4 plátanos pagué $26.', ans: '5x + 3y = 38, 2x + 4y = 26', opts: ['5x + 3y = 38, 2x + 4y = 26', '3x + 5y = 38, 4x + 2y = 26', '5x + 3y = 26, 2x + 4y = 38', '5x - 3y = 38, 2x - 4y = 26'] },
    { q: 'La suma de dos números es 100. El triple del menor (y) es igual al mayor (x).', ans: 'x + y = 100, x = 3y', opts: ['x + y = 100, x = 3y', 'x + y = 100, y = 3x', 'x - y = 100, x = 3y', 'x + y = 3, x = 100y'] },
    { q: 'En una granja hay patos (x) y cerdos (y). Hay 45 animales y 120 patas.', ans: 'x + y = 45, 2x + 4y = 120', opts: ['x + y = 45, 2x + 4y = 120', 'x + y = 45, 4x + 2y = 120', 'x + y = 120, 2x + 4y = 45', 'x - y = 45, 2x + 4y = 120'] },
    { q: 'Compramos 8 camisas (x) y 5 pantalones (y) por $2100. Luego compramos 4 camisas y 6 pantalones por $1800.', ans: '8x + 5y = 2100, 4x + 6y = 1800', opts: ['8x + 5y = 2100, 4x + 6y = 1800', '5x + 8y = 2100, 6x + 4y = 1800', '8x + 5y = 1800, 4x + 6y = 2100', '8x - 5y = 2100, 4x - 6y = 1800'] },
    { q: 'La suma de dos números es 60. El primero (x) es el cuádruple del segundo (y).', ans: 'x + y = 60, x = 4y', opts: ['x + y = 60, x = 4y', 'x + y = 60, y = 4x', 'x - y = 60, x = 4y', 'x + y = 4, x = 60y'] },
    { q: 'En un almacén hay cajas grandes (x) y chicas (y). Total: 80 cajas. El volumen total es 240 m³. Las grandes miden 4 m³ y las chicas 2 m³.', ans: 'x + y = 80, 4x + 2y = 240', opts: ['x + y = 80, 4x + 2y = 240', 'x + y = 80, 2x + 4y = 240', 'x + y = 240, 4x + 2y = 80', 'x - y = 80, 4x + 2y = 240'] },
    { q: 'Dos números suman 45. La mitad del primero (x) más el triple del segundo (y) es 35.', ans: 'x + y = 45, 0.5x + 3y = 35', opts: ['x + y = 45, 0.5x + 3y = 35', 'x + y = 45, 3x + 0.5y = 35', 'x - y = 45, 0.5x + 3y = 35', 'x + y = 35, 0.5x + 3y = 45'] },
    { q: 'La suma de las edades de María (x) y Juan (y) es 30. María tiene 6 años más que Juan.', ans: 'x + y = 30, x = y + 6', opts: ['x + y = 30, x = y + 6', 'x + y = 30, y = x + 6', 'x - y = 30, x = y + 6', 'x + y = 6, x = y + 30'] },
    { q: 'Compramos 2 pasteles (x) y 5 gelatinas (y) por $190. Luego compramos 3 pasteles y 2 gelatinas por $175.', ans: '2x + 5y = 190, 3x + 2y = 175', opts: ['2x + 5y = 190, 3x + 2y = 175', '5x + 2y = 190, 2x + 3y = 175', '2x + 5y = 175, 3x + 2y = 190', '2x - 5y = 190, 3x - 2y = 175'] },
    { q: 'Un hotel tiene habitaciones dobles (x) e individuales (y). Hay 50 habitaciones y 85 camas.', ans: 'x + y = 50, 2x + y = 85', opts: ['x + y = 50, 2x + y = 85', 'x + y = 50, x + 2y = 85', 'x + y = 85, 2x + y = 50', 'x - y = 50, 2x + y = 85'] },
    { q: 'El triple de un número (x) más el cuádruple de otro (y) es 50. La suma de ambos es 15.', ans: '3x + 4y = 50, x + y = 15', opts: ['3x + 4y = 50, x + y = 15', '4x + 3y = 50, x + y = 15', '3x + 4y = 15, x + y = 50', '3x - 4y = 50, x + y = 15'] },
    { q: 'En una caja hay 18 fichas rojas (x) y azules (y). Las rojas valen 10 puntos y las azules 5. Total de puntos: 130.', ans: 'x + y = 18, 10x + 5y = 130', opts: ['x + y = 18, 10x + 5y = 130', 'x + y = 18, 5x + 10y = 130', 'x + y = 130, 10x + 5y = 18', 'x - y = 18, 10x + 5y = 130'] },
    { q: 'La diferencia de dos números es 15. El doble del mayor (x) es el triple del menor (y).', ans: 'x - y = 15, 2x = 3y', opts: ['x - y = 15, 2x = 3y', 'x - y = 15, 3x = 2y', 'x + y = 15, 2x = 3y', 'x - y = 3, 2x = 15y'] },
    { q: 'Un teatro vendió 200 entradas en total. Las de galería (x) a $40 y las de palco (y) a $100. Total recaudado: $14,000.', ans: 'x + y = 200, 40x + 100y = 14000', opts: ['x + y = 200, 40x + 100y = 14000', 'x + y = 200, 100x + 40y = 14000', 'x + y = 14000, 40x + 100y = 200', 'x - y = 200, 40x + 100y = 14000'] },
    { q: 'El perímetro de un triángulo isósceles es 32 cm. El lado desigual (y) es 2 cm menor que los lados iguales (x).', ans: '2x + y = 32, y = x - 2', opts: ['2x + y = 32, y = x - 2', '2x + y = 32, x = y - 2', 'x + 2y = 32, y = x - 2', '2x - y = 32, y = x - 2'] },
    { q: 'Compramos 4 paletas (x) y 6 chocolates (y) por $64. Otro cliente compró 2 paletas y 8 chocolates por $52.', ans: '4x + 6y = 64, 2x + 8y = 52', opts: ['4x + 6y = 64, 2x + 8y = 52', '6x + 4y = 64, 8x + 2y = 52', '4x + 6y = 52, 2x + 8y = 64', '4x - 6y = 64, 2x - 8y = 52'] },
    { q: 'La suma de las edades de dos hermanos es 22. El mayor (x) tiene el doble de edad que el menor (y).', ans: 'x + y = 22, x = 2y', opts: ['x + y = 22, x = 2y', 'x + y = 22, y = 2x', 'x - y = 22, x = 2y', 'x + y = 2, x = 22y'] },
    { q: 'En una frutería, 3 kg de naranjas (x) y 2 kg de manzanas (y) cuestan $80. 1 kg de naranjas y 4 kg de manzanas cuestan $110.', ans: '3x + 2y = 80, x + 4y = 110', opts: ['3x + 2y = 80, x + 4y = 110', '2x + 3y = 80, 4x + y = 110', '3x + 2y = 110, x + 4y = 80', '3x - 2y = 80, x - 4y = 110'] },
    { q: 'Dos números están en relación 3 a 2 (el doble del primero es el triple del segundo). Su suma es 25.', ans: '2x = 3y, x + y = 25', opts: ['2x = 3y, x + y = 25', '3x = 2y, x + y = 25', '2x = 3y, x - y = 25', 'x = 3y, x + y = 25'] }
  ];

  probs.forEach(({ q, ans, opts }) => {
    // Barajar opciones
    const shuffledOpts = [...opts].sort(() => Math.random() - 0.5);

    exercises.push({
      grade: G, topic: T, subtype: 'trad_problema',
      question: q,
      svgData: svgAlgebraicTranslation(q),
      answer: ans,
      options: shuffledOpts,
      hint: `Busca los datos de suma, total, o multiplicadores para relacionar x e y.`
    });
  });

  return exercises;
}

/** Genera 40 ejercicios del tema de funciones (identificar tipo de gráfica) */
export function generateFuncionesExercises() {
  const exercises = [];
  const G = '3';
  const T = 'Funciones';

  // Opciones estándar para todos los ejercicios
  const standardOpts = [
    'Línea recta (Grado 1)',
    'Parábola (Grado 2)',
    'Curva cúbica (Grado 3)',
    'Línea horizontal (Grado 0)'
  ];

  // --- 20 ejercicios basados en la Fórmula ---
  const formulas = [
    { eq: 'f(x) = 3x - 4', ans: 'Línea recta (Grado 1)', type: 'lineal', hint: 'Tiene la forma y = mx + b (x con exponente 1). Es una línea recta.' },
    { eq: 'y = -2x + 7', ans: 'Línea recta (Grado 1)', type: 'lineal', hint: 'Función afín de grado 1. Representa una línea recta.' },
    { eq: 'f(x) = x² + 2x - 3', ans: 'Parábola (Grado 2)', type: 'cuadratica', hint: 'El exponente máximo de x es 2 (cuadrática). Su gráfica es una parábola.' },
    { eq: 'y = -3x² + 5', ans: 'Parábola (Grado 2)', type: 'cuadratica', hint: 'Contiene un término cuadrático x². Corresponde a una parábola.' },
    { eq: 'f(x) = x³ - x', ans: 'Curva cúbica (Grado 3)', type: 'cubica', hint: 'El exponente máximo de la variable x es 3. Genera una curva cúbica.' },
    { eq: 'y = 2x³ + 4x² - 1', ans: 'Curva cúbica (Grado 3)', type: 'cubica', hint: 'Función polinomial de tercer grado. Su gráfica es una curva cúbica en forma de S.' },
    { eq: 'f(x) = 5', ans: 'Línea horizontal (Grado 0)', type: 'constante', hint: 'Es una función constante. El valor de y no cambia, dibujando una línea horizontal.' },
    { eq: 'y = -8', ans: 'Línea horizontal (Grado 0)', type: 'constante', hint: 'Al ser constante (independiente de x), produce una línea recta horizontal.' },
    { eq: 'f(x) = 0.5x', ans: 'Línea recta (Grado 1)', type: 'lineal', hint: 'Función lineal de primer grado. Es una línea recta que pasa por el origen.' },
    { eq: 'y = x² - 9', ans: 'Parábola (Grado 2)', type: 'cuadratica', hint: 'Término cuadrático x². La gráfica es una parábola abierta hacia arriba.' },
    { eq: 'f(x) = -x³ + 2x', ans: 'Curva cúbica (Grado 3)', type: 'cubica', hint: 'Variable elevada a la tercera potencia. Su gráfica es una curva cúbica.' },
    { eq: 'y = 0', ans: 'Línea horizontal (Grado 0)', type: 'constante', hint: 'Función constante y = 0 (el propio eje x). Es una línea horizontal.' },
    { eq: 'f(x) = 10x - 1', ans: 'Línea recta (Grado 1)', type: 'lineal', hint: 'Función lineal (grado 1). Produce una línea recta.' },
    { eq: 'y = 5x² - 2x + 1', ans: 'Parábola (Grado 2)', type: 'cuadratica', hint: 'Grado 2, es una parábola.' },
    { eq: 'f(x) = 4 - x²', ans: 'Parábola (Grado 2)', type: 'cuadratica', hint: 'Término cuadrático con coeficiente negativo. Es una parábola hacia abajo.' },
    { eq: 'y = x³', ans: 'Curva cúbica (Grado 3)', type: 'cubica', hint: 'La función cúbica más elemental. Representa una curva cúbica.' },
    { eq: 'f(x) = -0.25x + 3', ans: 'Línea recta (Grado 1)', type: 'lineal', hint: 'Grado 1. Representa una línea recta.' },
    { eq: 'y = 12', ans: 'Línea horizontal (Grado 0)', type: 'constante', hint: 'y constante. Línea horizontal.' },
    { eq: 'f(x) = 2x³ - 5x', ans: 'Curva cúbica (Grado 3)', type: 'cubica', hint: 'Grado 3. Representa una curva cúbica.' },
    { eq: 'y = -x² - 3x', ans: 'Parábola (Grado 2)', type: 'cuadratica', hint: 'Grado 2. Su gráfica es una parábola.' }
  ];

  formulas.forEach(({ eq, ans, type, hint }) => {
    exercises.push({
      grade: G, topic: T, subtype: 'formula_identify',
      question: `¿Qué tipo de gráfica representa la función: ${eq}?`,
      svgData: svgFunctionsGraph(type, eq),
      answer: ans,
      options: [...standardOpts],
      hint: hint
    });
  });

  // --- 20 ejercicios basados en la Gráfica Visual ---
  const graphs = [
    { type: 'lineal', ans: 'Línea recta (Grado 1)', hint: 'La gráfica es una línea recta inclinada. Representa una función de grado 1.' },
    { type: 'cuadratica', ans: 'Parábola (Grado 2)', hint: 'La curva mostrada tiene forma de U (o campana). Es una parábola, representativa del grado 2.' },
    { type: 'cubica', ans: 'Curva cúbica (Grado 3)', hint: 'La curva sube, cambia de dirección y vuelve a subir (forma de S). Corresponde al grado 3.' },
    { type: 'constante', ans: 'Línea horizontal (Grado 0)', hint: 'Es una línea completamente plana y paralela al eje horizontal. Es de grado 0.' }
  ];

  for (let i = 0; i < 20; i++) {
    const item = graphs[i % graphs.length];
    exercises.push({
      grade: G, topic: T, subtype: 'graph_identify',
      question: `Observa la gráfica. ¿A qué tipo de función corresponde esta curva según su grado?`,
      svgData: svgFunctionsGraph(item.type),
      answer: item.ans,
      options: [...standardOpts],
      hint: item.hint
    });
  }

  return exercises;
}
