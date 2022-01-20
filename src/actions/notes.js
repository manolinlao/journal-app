import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

/**
  cuando retornamos el callback en la función asíncrona, podemos recibir
  un segundo argumento con una función que nos proporciona el state, 
  en nuestro caso la llamo getState, es muy similar al useSelector
 */

export const startNewNote = () => {
  return async ( dispatch, getState ) => {

    const state = getState();
    const { uid } = state.auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    // graba el documento con un id determinado
    const docRef = await addDoc( collection( db, `${ uid }`, 'journal/notes'), newNote );

    console.log(docRef.id);

    dispatch( activeNote( docRef.id, newNote ) );

  }
}

export const activeNote = ( id, note ) => ({
  type: types.notesActive,
  payload:{
    id,
    ...note
  }
})

export const startLoadingNotes = ( uid ) => {
  return async (dispatch) => {
    const notes = await loadNotes( uid );
    dispatch( setNotes( notes ) );
  }
}

export const setNotes = ( notes ) => ({
  type: types.notesLoad,
  payload: notes
})

export const startSaveNote = ( note ) =>{
  return async (dispatch,getState) => {
      const { uid } = getState().auth; 

      if(!note.url){
          delete note.url;
      }
      
      const noteToFirestore  = {...note};
      delete noteToFirestore.id;

      const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)

      console.log("noteRef");
      console.log(noteRef);
      await updateDoc(noteRef,noteToFirestore);

      dispatch( refreshNote(note.id,noteToFirestore));
      Swal.fire( 'Saved', note.title, 'success' );

  }
}


export const refreshNote = (id,note) =>({
  type: types.notesUpdated,
  payload: {
      id,
      note:{
          id,
          ...note
      }
  }
})

export const startUploading = (file)=>{
  return async(dispatch,getState)=>{
      const {active:activeNote} = getState().notes;

      Swal.fire({
          title: 'Uploading...',
          text: 'Please wait...',            
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: ()=>{
              Swal.showLoading();                
          }
      });
      
      const fileUrl = await fileUpload(file);
      activeNote.url = fileUrl;
      dispatch( startSaveNote(activeNote) );

      console.log(fileUrl);

      Swal.close();

  }
}


export const startDeleting = (id)=>{
  return async(dispatch,getState)=>{
     const uid = getState().auth.id; //es lo mismo que const {uid} = getState().auth

     const noteRef = doc(db, `${uid}/journal/notes/${id}`)
     await deleteDoc(noteRef);

     dispatch(deleteNote(id));
 }
}

export const deleteNote = (id)=>({
  type:types.notesDelete,
  payload:id
})


export const noteLogout = ()=>({
  type:types.notesLogoutCleaning
})

