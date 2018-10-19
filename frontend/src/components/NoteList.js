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
          deleteNote = {this.props.deleteNote}
        />
      );
    }

    if (this.props.notes.notebookId === -1) {
      return null;
    }

    return (
      <div>
        <h2>Notes</h2>
        <ul>
          {this.props.notes.data.map(createNoteListItem)}
        </ul>
      </div>
    );
  }
}

const NoteListContainer = ReactRedux.connect(
  state => ({
    notes: state.notes
  }),
  createActionDispatchers(notesActionCreators)
)(NoteList);

module.exports = NoteListContainer;