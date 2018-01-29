import React from 'react'
import PropTypes from 'prop-types'

class Note extends React.Component {
constructor(props) {
super(props)
    this.noteContent = props.noteContent
    this.noteId = props.noteId
    // this.handleRemoveNote = this.handleRemoveNote.bind(this)
}

handleRemoveNote = (id) => {
    this.props.removeNote(id)
}

render() {
return (
    <div className="note fade-in">
        <div 
            className="closeBtn" 
            onClick={ () => this.handleRemoveNote(this.noteId) }
        >
            <p className="noteContent">{ this.noteContent }</p>  
        </div>  
    </div>
)
}
}

Note.propTypes = {
    noteContent: PropTypes.string
}
export default Note