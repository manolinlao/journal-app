import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDeleting } from '../../actions/notes'

export const NoteScreen = () => {

    const {active:myNote} = useSelector(state=>state.notes);
    const [ formValues,handleInputChange,reset ] = useForm( myNote );
    const { body,title } = formValues;

    const activeId = useRef(myNote.id);
    
    const dispatch = useDispatch();
    
   
    
    useEffect(()=>{
        if(myNote.id!==activeId.current){
            reset(myNote);
            activeId.current=myNote.id;
        }
    },[myNote,reset]);

   
    useEffect(()=>{
        dispatch(activeNote(formValues.id,{...formValues}));
    },[formValues,dispatch]);


    const handleDelete = ()=>{
        dispatch( startDeleting(myNote.id));
    }
    
    return (
        <div className="notes__main-content">
            <NotesAppBar/>
            <div className="notes__content">
                
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    name = "title"
                    value = { title }
                    onChange = { handleInputChange }
                />
                
                <textarea
                    placeholder="what happened today?"
                    className="notes__textarea"
                    name="body"
                    value = { body }
                    onChange = { handleInputChange }
                ></textarea>
                {
                    (myNote.url)
                    &&
                    (
                        <div className="notes__image">
                            <img
                                src={myNote.url}
                                alt="imagen"                       
                            />
                        </div>
                    )
                }  
            </div>

            <button
                className="btn btn-danger"
                onClick = { handleDelete }
            >
                Delete
            </button>
        </div>
    )
}
