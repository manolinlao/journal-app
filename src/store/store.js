import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

/**
 * Tareas como el login no son síncronas, por tanto hay que aplicar un middleware
 * Este middleware hará esa tarea asíncrona, espera que se resuelva y una vez
 * resuelta llama al dispatch de una nueva acción que será síncrona, la cual
 * retornará un nuevo state
 */

const reducers = combineReducers(
    {
        auth: authReducer,
        ui: uiReducer,
        notes: notesReducer
    }
)

export const store = createStore(
  reducers,
  composeWithDevTools( applyMiddleware( thunk ) )
);
