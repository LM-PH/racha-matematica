// seed_exercises.js — Ejecutar una sola vez para poblar Firebase
// USO: coloca este archivo en src/ y llámalo desde App.jsx al cargar,
// o ejecútalo desde la consola del navegador.

import { db } from './firebase.js';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { generatePythagorasExercises, generateThalesExercises } from './exerciseBank.js';

const COLLECTION = 'ejercicios_v3';

export async function seedGrade3Exercises(force = false) {
  // Verificar si ya existen ejercicios
  const q3pit = query(collection(db, COLLECTION),
    where('grade', '==', '3'),
    where('topic', '==', 'Teorema de Pitágoras')
  );
  const q3tal = query(collection(db, COLLECTION),
    where('grade', '==', '3'),
    where('topic', '==', 'Teorema de Tales')
  );

  const [snapPit, snapTal] = await Promise.all([getDocs(q3pit), getDocs(q3tal)]);

  if (!force && snapPit.size >= 30 && snapTal.size >= 30) {
    console.log(`✅ Ejercicios ya existen: ${snapPit.size} Pitágoras, ${snapTal.size} Tales`);
    return { pitagoras: snapPit.size, tales: snapTal.size };
  }

  if (force) {
    console.log('🗑️ Borrando ejercicios anteriores de grado 3...');
    const allQ = query(collection(db, COLLECTION), where('grade', '==', '3'));
    const allSnap = await getDocs(allQ);
    for (const d of allSnap.docs) {
      await deleteDoc(doc(db, COLLECTION, d.id));
    }
    console.log(`🗑️ Eliminados ${allSnap.size} ejercicios.`);
  }

  // Generar ejercicios
  const pitExercises = generatePythagorasExercises();
  const talesExercises = generateThalesExercises();

  console.log(`📚 Generados: ${pitExercises.length} Pitágoras, ${talesExercises.length} Tales`);

  // Guardar en Firebase
  let pitCount = 0, talesCount = 0;

  for (const ex of pitExercises) {
    try {
      await addDoc(collection(db, COLLECTION), {
        ...ex,
        createdAt: new Date(),
      });
      pitCount++;
    } catch (err) {
      console.warn('Error guardando ejercicio Pitágoras:', err);
    }
  }

  for (const ex of talesExercises) {
    try {
      await addDoc(collection(db, COLLECTION), {
        ...ex,
        createdAt: new Date(),
      });
      talesCount++;
    } catch (err) {
      console.warn('Error guardando ejercicio Tales:', err);
    }
  }

  console.log(`✅ Guardados: ${pitCount} Pitágoras, ${talesCount} Tales en '${COLLECTION}'`);
  return { pitagoras: pitCount, tales: talesCount };
}
