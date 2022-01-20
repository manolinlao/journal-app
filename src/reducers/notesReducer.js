/*
  Tendremos un array de notes
  active: indicará la nota activa, si vale null es que no hay
  si hay nota, tendrá un id(ded firebase), title, body, imageUrl, fecha

  {
    notes: [],
    active: null,
    active: {
      id: '3434324324',
      title: '',
      body: '',
      imageUrl: '',
      date: 132343124
    }
  }

*/

import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null
}

export const notesReducer = ( state = initialState, action) => {
  switch( action.type ){
    case types.notesActive:
      return{
        ...state,
        active:{
          ...action.payload
        }
      }
    case types.notesLoad:
      return{
        ...state,
        notes: [ ...action.payload ]
      }
    case types.notesUpdated:
        return{
            ...state,
            notes: state.notes.map(
                note => note.id===action.payload.id
                    ? action.payload.note
                    : note
            )
        }
     case types.notesDelete:
          return{
              ...state,
              active:null,
              notes: state.notes.filter(note=>note.id!==action.payload)
          }
     case types.notesLogoutCleaning:
            return{
                ...state,
                active:null,
                notes:[]
            }

    default:
      return state;
  }
}