import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const loadNotes = async ( uid ) => {
  
  const notesSnap = await getDocs( query( collection( db,`${ uid }`,"journal/notes" ) ) );

  const notes = [];

  notesSnap.forEach( snapHijo => {    
    console.log( snapHijo.id );
    notes.push({
      id:snapHijo.id,
      ...snapHijo.data()
    })
  })

  return notes;
}