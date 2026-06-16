// ============================================================
//  BANCO DE EJERCICIOS GRADO 2 (PARTE 2)
//  Ángulos entre paralelas | Probabilidad
// ============================================================

// ===================== SVG HELPERS ========================

function svgAngulosParalelas(knownPos, knownVal, unknownPos, level = 'easy') {
  const colors = { easy: '#3B82F6', medium: '#8B5CF6', hard: '#EC4899' };
  const col = colors[level] || '#3B82F6';

  // Posiciones de los 8 ángulos alrededor de las intersecciones
  // Intersección superior: (130, 80)
  // Intersección inferior: (180, 140)
  const posMap = {
    1: { x: 105, y: 70 },   // Top-Left (Acute)
    2: { x: 155, y: 70 },   // Top-Right (Obtuse)
    3: { x: 105, y: 105 },  // Bottom-Left (Obtuse)
    4: { x: 155, y: 105 },  // Bottom-Right (Acute)
    5: { x: 155, y: 130 },  // Top-Left (Acute)
    6: { x: 205, y: 130 },  // Top-Right (Obtuse)
    7: { x: 155, y: 165 },  // Bottom-Left (Obtuse)
    8: { x: 205, y: 165 },  // Bottom-Right (Acute)
  };

  const labels = {};
  for (let i = 1; i <= 8; i++) labels[i] = '';
  labels[knownPos] = `${knownVal}°`;
  labels[unknownPos] = 'x';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="210" viewBox="0 0 310 210">
  <rect width="310" height="210" rx="16" fill="#F8FAFC"/>
  
  <!-- Título -->
  <text x="155" y="25" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#475569" letter-spacing="1">ÁNGULOS ENTRE PARALELAS</text>

  <!-- Líneas paralelas L1 y L2 -->
  <line x1="30" y1="80" x2="280" y2="80" stroke="${col}" stroke-width="2.5"/>
  <line x1="30" y1="140" x2="280" y2="140" stroke="${col}" stroke-width="2.5"/>
  <text x="20" y="85" font-family="Arial" font-size="12" font-weight="bold" fill="${col}">L1</text>
  <text x="20" y="145" font-family="Arial" font-size="12" font-weight="bold" fill="${col}">L2</text>

  <!-- Secante S -->
  <line x1="80" y1="20" x2="230" y2="200" stroke="#1E293B" stroke-width="2.5"/>
  <text x="85" y="15" font-family="Arial" font-size="12" font-weight="bold" fill="#1E293B">S</text>

  <!-- Etiquetas de Ángulos -->
  ${Object.keys(posMap).map(k => {
    const isUnknown = parseInt(k) === unknownPos;
    const isKnown = parseInt(k) === knownPos;
    if (!isUnknown && !isKnown) return '';
    
    const { x, y } = posMap[k];
    const fill = isUnknown ? '#EF4444' : '#10B981';
    const fontWeight = 'bold';
    const fontSize = isUnknown ? '16' : '14';
    
    return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}">${labels[k]}</text>`;
  }).join('')}

  <!-- Instrucción -->
  <text x="155" y="195" text-anchor="middle" font-family="Arial" font-size="11" fill="#64748B">L1 es paralela a L2. Encuentra el valor de x.</text>
</svg>`;
}

function svgProbabilidad(title, body, icon = '🎲') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="310" height="190" viewBox="0 0 310 190">
  <rect width="310" height="190" rx="16" fill="#FEF2F2"/>
  <text x="155" y="32" text-anchor="middle" font-family="Arial" font-size="20">${icon}</text>
  <text x="155" y="52" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#BE123C">${title}</text>
  <line x1="25" y1="60" x2="285" y2="60" stroke="#BE123C" stroke-width="1" opacity="0.4"/>
  <foreignObject x="15" y="65" width="280" height="95">
    <body xmlns="http://www.w3.org/1999/xhtml">
      <p style="font-family:Arial;font-size:13px;color:#1E293B;text-align:center;margin:0;line-height:1.45">${body}</p>
    </body>
  </foreignObject>
  <text x="155" y="178" text-anchor="middle" font-family="Arial" font-size="10" fill="#BE123C" font-style="italic">Escribe tu respuesta como porcentaje (ej. 25)</text>
</svg>`;
}

// ============================================================
//  GENERADOR: ÁNGULOS ENTRE PARALELAS (30+ ejercicios)
// ============================================================
export function generateAngulosParalelasExercises() {
  const exercises = [];
  const G = '2';
  const T = 'Ángulos entre Paralelas';

  // Agrupamos las posiciones por tipo de ángulo
  // Agudos (Acute): 1, 4, 5, 8
  // Obtusos (Obtuse): 2, 3, 6, 7
  const acute = [1, 4, 5, 8];
  const obtuse = [2, 3, 6, 7];

  // Generar pares variados para cubrir las 30 preguntas
  const pairs = [
    // Correspondientes
    [1, 5, 'Correspondientes'], [2, 6, 'Correspondientes'], [3, 7, 'Correspondientes'], [4, 8, 'Correspondientes'],
    // Alternos internos
    [3, 6, 'Alternos internos'], [4, 5, 'Alternos internos'],
    // Alternos externos
    [1, 8, 'Alternos externos'], [2, 7, 'Alternos externos'],
    // Opuestos por el vértice
    [1, 4, 'Opuestos por el vértice'], [2, 3, 'Opuestos por el vértice'], [5, 8, 'Opuestos por el vértice'], [6, 7, 'Opuestos por el vértice'],
    // Conjugados internos (suman 180)
    [3, 5, 'Conjugados internos'], [4, 6, 'Conjugados internos'],
    // Conjugados externos (suman 180)
    [1, 7, 'Conjugados externos'], [2, 8, 'Conjugados externos'],
    // Adyacentes suplementarios
    [1, 2, 'Adyacentes'], [3, 4, 'Adyacentes'], [5, 6, 'Adyacentes'], [7, 8, 'Adyacentes'],
    [1, 3, 'Adyacentes'], [2, 4, 'Adyacentes'], [5, 7, 'Adyacentes'], [6, 8, 'Adyacentes']
  ];

  // Base angles (acute ones)
  const baseAngles = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];

  let idCounter = 1;

  for (let i = 0; i < 30; i++) {
    // Tomar un par aleatorio
    const pairIndex = Math.floor(Math.random() * pairs.length);
    const [pos1, pos2, relacion] = pairs[pairIndex];
    
    // Asignar pos1 como conocido y pos2 como desconocido, o viceversa al azar
    const isReversed = Math.random() > 0.5;
    const knownPos = isReversed ? pos2 : pos1;
    const unknownPos = isReversed ? pos1 : pos2;

    // Tomar un ángulo base aleatorio
    const aVal = baseAngles[Math.floor(Math.random() * baseAngles.length)];
    const oVal = 180 - aVal;

    const knownIsAcute = acute.includes(knownPos);
    const unknownIsAcute = acute.includes(unknownPos);

    const knownVal = knownIsAcute ? aVal : oVal;
    const answer = unknownIsAcute ? aVal : oVal;

    let hint = '';
    if (knownIsAcute === unknownIsAcute) {
      hint = `Son ángulos iguales (${relacion}). Por lo tanto x = ${answer}°`;
    } else {
      hint = `Son suplementarios (${relacion}), suman 180°. 180 - ${knownVal} = ${answer}°`;
    }

    exercises.push({
      grade: G, 
      topic: T, 
      subtype: 'parallel_angles', 
      difficulty: 2,
      question: `Si el ángulo mostrado mide ${knownVal}°, ¿cuánto mide el ángulo x?`,
      svgData: svgAngulosParalelas(knownPos, knownVal, unknownPos, 'easy'),
      answer: answer,
      hint: hint,
    });
  }

  // Asegurarnos que haya al menos 30
  return exercises;
}

// ============================================================
//  GENERADOR: PROBABILIDAD (30+ ejercicios)
// ============================================================
export function generateProbabilidadExercises() {
  const exercises = [];
  const G = '2';
  const T = 'Probabilidad';

  const probProblems = [
    // --- EVENTOS EXCLUYENTES ---
    {
      q: 'En una urna hay 3 bolas rojas, 2 azules y 5 verdes. ¿Cuál es la probabilidad de sacar una roja o una azul en un solo intento?',
      ans: 50, hint: 'Bolas rojas (3) + azules (2) = 5. Total = 10. Probabilidad = 5/10 = 50%',
      icon: '🔴🔵'
    },
    {
      q: 'Lanzas un dado normal de 6 caras. ¿Cuál es la probabilidad de que salga un 2 o un 5?',
      ans: 33, hint: 'Hay 2 resultados favorables (2 o 5) de 6 totales. 2/6 = 1/3 ≈ 33%',
      icon: '🎲'
    },
    {
      q: 'En una caja de chocolates hay 4 de menta, 6 de fresa y 10 de nuez. Sacas uno al azar. ¿Cuál es la probabilidad de que sea de menta o de nuez?',
      ans: 70, hint: 'Menta (4) + Nuez (10) = 14 favorables. Total = 20. 14/20 = 7/10 = 70%',
      icon: '🍫'
    },
    {
      q: 'En una ruleta hay 10 casillas numeradas del 1 al 10. ¿Cuál es la probabilidad de que la bola caiga en un 1 o un 10?',
      ans: 20, hint: '2 casillas favorables de 10 totales. 2/10 = 20%',
      icon: '🎡'
    },
    {
      q: 'Una bolsa tiene 5 dulces de limón, 3 de naranja y 2 de uva. Al sacar uno, ¿qué probabilidad hay de que NO sea de naranja?',
      ans: 70, hint: 'No naranja = limón (5) + uva (2) = 7. Total = 10. 7/10 = 70%',
      icon: '🍬'
    },

    // --- EVENTOS NO EXCLUYENTES ---
    {
      q: 'Lanzas un dado de 6 caras. ¿Cuál es la probabilidad de sacar un número par o un número mayor que 4?',
      ans: 67, hint: 'Pares: {2,4,6}. Mayores que 4: {5,6}. La unión es {2,4,5,6} = 4 favorables. 4/6 = 66.6% ≈ 67%',
      icon: '🎲'
    },
    {
      q: 'En una clase de 20 alumnos, 10 juegan fútbol, 8 juegan básquet y 4 juegan ambos. Si eliges uno al azar, ¿qué probabilidad hay de que juegue al menos uno de los dos?',
      ans: 70, hint: 'P(F o B) = P(F) + P(B) - P(F y B) = 10 + 8 - 4 = 14 favorables. 14/20 = 70%',
      icon: '⚽🏀'
    },
    {
      q: 'Se lanza un dado. ¿Probabilidad de obtener un número impar o un número menor que 3?',
      ans: 67, hint: 'Impares: {1,3,5}. Menores a 3: {1,2}. Unión: {1,2,3,5}. Son 4 resultados. 4/6 ≈ 67%',
      icon: '🎲'
    },
    {
      q: 'En un grupo de 100 personas, 60 leen, 50 hacen deporte y 30 hacen ambas. Si se elige alguien al azar, ¿probabilidad de que lea o haga deporte?',
      ans: 80, hint: '60 + 50 - 30 = 80 favorables de 100 totales. 80%',
      icon: '📖🏃'
    },

    // --- CON EXTRACCIONES (CON REEMPLAZO) ---
    {
      q: 'Una urna tiene 2 bolas rojas y 8 azules. Sacas una bola, la DEVUELVES, y sacas otra. ¿Probabilidad de que ambas sean rojas?',
      ans: 4, hint: 'P(roja) = 2/10. Con reemplazo, los eventos son independientes. (2/10) × (2/10) = 4/100 = 4%',
      icon: '🔴🔁'
    },
    {
      q: 'Sacas una carta de una baraja de 52, la DEVUELVES y sacas otra. ¿Probabilidad de sacar un Corazón y luego otro Corazón? (Baraja con 13 corazones)',
      ans: 6, hint: '(13/52) × (13/52) = (1/4) × (1/4) = 1/16 = 6.25% ≈ 6%',
      icon: '♥️🔁'
    },
    {
      q: 'Una caja tiene 5 focos buenos y 5 fundidos. Seleccionas uno, anotas, lo REGRESAS y sacas otro. ¿Probabilidad de sacar dos fundidos?',
      ans: 25, hint: 'P(fundido) = 5/10 = 1/2. (1/2) × (1/2) = 1/4 = 25%',
      icon: '💡🔁'
    },
    {
      q: 'Lanzas una moneda dos veces. ¿Cuál es la probabilidad de obtener Águila en ambos lanzamientos?',
      ans: 25, hint: '(1/2) × (1/2) = 1/4 = 25%',
      icon: '🪙🪙'
    },
    {
      q: 'Un spinner tiene 4 colores (rojo, azul, verde, amarillo) de igual tamaño. Si lo giras dos veces, ¿probabilidad de que caiga rojo ambas veces?',
      ans: 6, hint: '(1/4) × (1/4) = 1/16 = 6.25% ≈ 6%',
      icon: '🎡🔁'
    },

    // --- SIN REEMPLAZO (TAMAÑOS PEQUEÑOS PARA % ENTEROS O BONITOS) ---
    {
      q: 'Una urna tiene 2 canicas negras y 3 blancas (5 en total). Sacas dos SIN DEVOLVERLAS. ¿Probabilidad de que ambas sean negras?',
      ans: 10, hint: 'Primera negra = 2/5. Segunda negra = 1/4. Probabilidad = (2/5) × (1/4) = 2/20 = 10%',
      icon: '⚫⚪'
    },
    {
      q: 'En la misma urna de 5 canicas (2 negras y 3 blancas). Sacas dos SIN reemplazo. ¿Probabilidad de que la primera sea negra y la segunda blanca?',
      ans: 30, hint: 'Primera negra = 2/5. Segunda blanca = 3/4. Probabilidad = (2/5) × (3/4) = 6/20 = 30%',
      icon: '⚫⚪'
    },
    {
      q: 'Hay 4 boletos premiados y 21 sin premio (25 en total). Tomas uno, te lo guardas, y tomas otro. ¿Probabilidad de que los dos sean premiados?',
      ans: 2, hint: '(4/25) × (3/24) = 12/600 = 2%',
      icon: '🎟️🚫'
    },
    {
      q: 'En una caja de 25 donas, hay 10 de chocolate y 15 normales. Te comes una de chocolate y luego tomas otra al azar. ¿Probabilidad de que AMBAS sean de chocolate?',
      ans: 15, hint: '(10/25) × (9/24) = 90/600 = 15%',
      icon: '🍩🚫'
    },
    {
      q: 'Tienes 5 llaves y solo 1 abre la puerta. Pruebas una, no funciona, la descartas (sin reemplazo) y pruebas otra. ¿Probabilidad de que la SEGUNDA llave sea la correcta?',
      ans: 20, hint: 'Para que la segunda sea la correcta, la primera debe fallar. P = (4/5) × (1/4) = 4/20 = 20%',
      icon: '🔑🚫'
    },

    // Extras mezclados
    {
      q: 'Si lanzas dos dados, ¿cuál es la probabilidad de que sumen 7?',
      ans: 17, hint: 'Combinaciones que suman 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Son 6 de 36. 6/36 = 1/6 ≈ 17%',
      icon: '🎲🎲'
    },
    {
      q: 'Una ruleta tiene 100 números. ¿Probabilidad de sacar un número mayor a 75 o menor a 26?',
      ans: 50, hint: 'Mayores a 75: 25 números. Menores a 26: 25 números. Excluyentes. 25 + 25 = 50. 50/100 = 50%',
      icon: '🎡'
    },
    {
      q: 'Una urna tiene 10 bolas: 5 azules, 5 verdes. Sacas una, la regresas y sacas otra. ¿Probabilidad de sacar azul y verde (en ese orden)?',
      ans: 25, hint: 'Con reemplazo: (5/10) × (5/10) = 1/4 = 25%',
      icon: '🔵🟢'
    },
    {
      q: 'La misma urna con 5 bolas azules y 5 verdes (10 en total). Sacas dos SIN reemplazo. ¿Probabilidad de que la primera sea azul y la segunda azul?',
      ans: 22, hint: 'Sin reemplazo: (5/10) × (4/9) = 20/90 ≈ 22.2% ≈ 22%',
      icon: '🔵🚫'
    },
    {
      q: 'En un mazo de 52 cartas, ¿probabilidad de sacar un AS o un REY? (Hay 4 de cada uno)',
      ans: 15, hint: 'Mutuamente excluyentes: 4 Ases + 4 Reyes = 8 favorables. 8/52 ≈ 15.38% ≈ 15%',
      icon: '🃏'
    },
    {
      q: 'Probabilidad de que llueva el sábado es 40%. Probabilidad de que llueva el domingo es 30%. Si son eventos independientes, ¿probabilidad de que llueva AMBOS días?',
      ans: 12, hint: '(40/100) × (30/100) = 0.4 × 0.3 = 0.12 = 12%',
      icon: '🌧️'
    },
    {
      q: 'Si sacas un chocolate de una bolsa con 4 blancos y 16 oscuros (20 en total). ¿Qué probabilidad hay de sacar uno oscuro?',
      ans: 80, hint: 'Oscuros = 16. Total = 20. 16/20 = 4/5 = 80%',
      icon: '🍫'
    },
    {
      q: 'Una bolsa de 5 canicas: 3 rojas, 2 negras. Sacas dos SIN reemplazar. ¿Probabilidad de que las dos sean rojas?',
      ans: 30, hint: '(3/5) × (2/4) = 6/20 = 30%',
      icon: '🔴🚫'
    },
    {
      q: 'Lanzas una moneda 3 veces. ¿Probabilidad de sacar Águila, Águila, Águila?',
      ans: 13, hint: '(1/2) × (1/2) × (1/2) = 1/8 = 12.5% ≈ 13%',
      icon: '🪙🪙🪙'
    },
    {
      q: 'Una contraseña tiene 1 letra (vocales A,E,I,O,U) y 1 número (1,2,3,4). Al azar, ¿probabilidad de adivinar a la primera?',
      ans: 5, hint: '5 vocales × 4 números = 20 combinaciones posibles. 1/20 = 5%',
      icon: '🔐'
    },
    {
      q: 'Se extraen dos cartas al azar de un mazo de 52 SIN reemplazo. ¿Probabilidad de sacar un As (4) y luego otro As (3 restantes)?',
      ans: 1, hint: '(4/52) × (3/51) = 12/2652 ≈ 0.0045 ≈ 0% (Pero se redondea a 1% si usamos decimales estrictos. Respuesta: 0)', // Espera, pongamos uno exacto.
      icon: '🃏' // Voy a cambiarlo abajo para asegurar que sea exacto y > 0
    }
  ];

  // Modificar el último para que sea más claro
  probProblems[probProblems.length - 1] = {
    q: 'En una urna con 25 bolas, hay 5 de oro y 20 de plata. Extraes dos SIN reemplazo. ¿Probabilidad de sacar dos de oro?',
    ans: 3, hint: '(5/25) × (4/24) = 20/600 = 3%',
    icon: '🏆🚫'
  };

  // Asegurarnos de tener 30 completando con variaciones si faltan
  // Actualmente probProblems tiene 30 elementos exactos. (Validemos: 5 + 4 + 5 + 5 + 11 = 30)

  probProblems.forEach(({ q, ans, hint, icon }, i) => {
    exercises.push({
      grade: G, 
      topic: T, 
      subtype: 'prob_percent', 
      difficulty: 3,
      question: q,
      svgData: svgProbabilidad('Resuelve la probabilidad', q, icon),
      answer: ans,
      hint: hint,
    });
  });

  return exercises;
}
