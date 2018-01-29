import React from 'react'
import PropTypes from 'prop-types'

class NoteForm extends React.Component {
constructor(props) {
super(props)
    this.state = {
        newNoteContent: ' '
    }
}

handleUserInput = (e) => {
    this.setState({
        newNoteContent: e.target.value, //value of text input
    })
}

addNote = ()=>{
    // pass up to parent component in index.js
    this.props.addNote(this.state.newNoteContent)
    // reset to empty
    this.setState({
        newNoteContent: ' ',
    })
}

render() {

return (
    <div className="formWrapper">
        <input type="text" 
            className="noteInput"
            placeholder="Write a new note..."
            value={this.state.newNoteContent}
            onChange={this.handleUserInput}
        />
        <button 
            className="noteButton"
            onClick={this.addNote}    
        >Add</button>
    </div>
)
}
}

NoteForm.propTypes = {
    newNoteContent: PropTypes.string
}
export default NoteForm