import { db } from './firebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export async function deleteAllUsers() {
  console.log('⏳ Iniciando eliminación de todos los participantes...');
  try {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    const total = querySnapshot.size;
    
    if (total === 0) {
      console.log('✅ No hay usuarios registrados para eliminar.');
      return 0;
    }

    let deletedCount = 0;
    const deletePromises = querySnapshot.docs.map(async (document) => {
      await deleteDoc(doc(db, 'usuarios', document.id));
      deletedCount++;
      console.log(`🗑️ Eliminado (${deletedCount}/${total}): ${document.data().nickname || document.id}`);
    });

    await Promise.all(deletePromises);
    console.log(`✨ ¡Éxito! Se eliminaron ${deletedCount} participantes.`);
    return deletedCount;
  } catch (error) {
    console.error('❌ Error al eliminar usuarios:', error);
    throw error;
  }
}
