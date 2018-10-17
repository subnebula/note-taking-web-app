const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notesActionCreators = require('../reducers/notes');

const Note = require('./Note')

class NoteList extends React.Component {
  render() {
    const createNoteListItem = (note) => {
      return (
        <Note
          key = {note.id}
          note = {note}
          loadNote = {this.props.loadNote}
        />
      );
    }

    if(this.props.activeNotebookId !== undefined){
      return (
        <div>
          <h2>Notes</h2>
          <ul>
            {this.props.notes.map(createNoteListItem)}
          </ul>
        </div>
      );
    }
    return null;
  }
}

const NoteListContainer = ReactRedux.connect(
  state => ({
    notes: state.notes,
    activeNoteId: state.activeNoteId,
    note: state.note
  }),
  createActionDispatchers(notesActionCreators)
)(NoteList);

module.exports = NoteListContainer;