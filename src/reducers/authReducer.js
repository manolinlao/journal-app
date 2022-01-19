/*
  todo reducer recibe un state y un action
  cuando el usuario NO esté autenticado el state estará vacío
  cuando el usuario SÍ esté autenticado tendrá un objeto con un id y un nombre
    { uid:'adadsfas', name:'fasdfdas' }
*/

import { types } from '../types/types';

/*
  {
    uid: 'adfdasfadf',
    name: 'fadsfasdf'
  }
*/

export const authReducer = ( state = {}, action ) => {
  switch( action.type ){
    case types.login:
      return{
        uid: action.payload.uid,
        name: action.payload.displayName
      }
    case types.logout:
      return {};
    default:
      return state;
  }
}