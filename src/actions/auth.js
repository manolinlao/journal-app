import { googleAuthProvider } from '../firebase/firebaseConfig';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import Swal from 'sweetalert2';


import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPassword = (email,password) =>{
  return (dispatch)=>{
      dispatch( startLoading() );
      
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
          .then(async({user})=>{
              dispatch(login(user.uid,user.displayName));
              dispatch( finishLoading() );
          })
          .catch(e=>{
              console.log("Error signInWithEmailAndPassword = " + e);
              dispatch( finishLoading() );
              Swal.fire('Error',e.message,'error');
          })
  }
}


export const startRegisterWithEmailPasswordName = ( email, password, name ) =>{
  return (dispatch)=>{
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
          .then( async({user}) =>{

              await updateProfile(user,{displayName:name});
              console.log(user);

              dispatch(login(user.uid,user.displayName));
              
          })
          .catch(e=>{
              console.log("Error in startRegisterWithEmaILpasswordName = " + e);
              //Swal.fire('Error',e.message,'error');
          }) 
  }
}

export const login = ( uid, displayName ) => {
  return(
    {
      type: types.login,
      payload:{
        uid,
        displayName
      }
    }
  );
}

export const startLogout = () =>{
  return async ( dispatch ) => {
      const auth = getAuth();
      await signOut(auth);
      dispatch(logout());
  }
}

export const logout = () =>{    
  return(
      {
          type:types.logout
      }
  );
}
