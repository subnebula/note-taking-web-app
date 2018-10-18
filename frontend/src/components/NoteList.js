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
        />
      );
    }

    return (
    	<li>
         {this.props.notebook.title}
         <ol>
           {this.props.notes.map(createNoteListItem)}
         </ol>
      </li>
    );
  }
}

const NoteListContainer = ReactRedux.connect(
  state => ({
    activeNoteId: state.activeNoteId,
    note: state.note
  }),
  createActionDispatchers(notesActionCreators)
)(NoteList);

module.exports = NoteListContainer;