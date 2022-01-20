import { getAuth, onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { loadNotes } from '../helpers/loadNotes'
import { startLoadingNotes } from '../actions/notes'

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking,setChecking ] = useState(true);
    const [ isLoggedIn,setIsLoggedIn ] = useState(false);

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            if(user?.uid){
                dispatch(login(user.uid,user.displayName));
                setIsLoggedIn(true);

                dispatch( startLoadingNotes( user.uid ) );
            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);
        })        
    },[ dispatch, setChecking, setIsLoggedIn ]);

    if(checking){
        return(
            <h1>Espere...</h1>
        )
    }

    return (
       <Router>
           <div>
               <Switch>
                    <PublicRoute isAuthenticated={isLoggedIn} path="/auth" component={AuthRouter}/>
                    <PrivateRoute exact isAuthenticated={isLoggedIn} path="/" component={JournalScreen}/> 
                </Switch>
           </div>
       </Router>
    )
}
