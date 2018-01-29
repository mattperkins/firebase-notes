import React from 'react'
import ReactDOM from 'react-dom'
// import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/database'

import { DB_CONFIG } from './config'
import Note from './Note'
import NoteForm from './NoteForm'

class App extends React.Component {

    constructor(props) {
    super(props)

        this.app = firebase.initializeApp(DB_CONFIG)
        this.database = this.app.database().ref().child('notes')

        this.state = {
            notes: [],
        }
    }

    componentWillMount(){
        const prevNotes = this.state.notes

        // DataSnapshot from firebase
        this.database.on('child_added', snap => {
            prevNotes.push({
                id: snap.key,
                noteContent: snap.val().noteContent,
            })

            this.setState({
                notes: prevNotes
            })
        })

        this.database.on('child_removed', snap => {
            for(var i=0; i<prevNotes.length; i++){
                if(prevNotes[i].id === snap.key){
                    prevNotes.splice(i, 1)
                }
            }

            this.setState({
                notes: prevNotes
            })  
        })
    }

    addNote = (note) => {
        this.database.push().set({
            noteContent: note
        })
    }

    removeNote = (noteId) => {
        this.database.child(noteId).remove()
    }

    render() {
        return (
            <div className="notesWrapper">
                
                <div className="notesHeader">
                    <div className="heading">Firebase Notes</div>
                </div>
                <div className="notesBody">
                { 
                    this.state.notes.map((note)=>{
                        return (
                            <Note
                                noteContent={note.noteContent} 
                                noteId={note.id} 
                                key={note.id}
                                removeNote={this.removeNote}
                            />
                            )
                     })
                }
                </div>

                <div className="notesFooter">
                    <NoteForm addNote={this.addNote}/>
                </div>  
            </div>
        )
    }
}


const render = document.getElementById('app')
ReactDOM.render(<App />, render)