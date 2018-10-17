const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');

const Notebook = require('./Notebook')

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/

class NotebookList extends React.Component {

  render() {
    const createNotebookListItem = (notebook) => {
      return (
        <Notebook
          key = {notebook.id}
          notebook = {notebook}
          loadNotes = {this.props.loadNotes}
        />
      );
    };

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
      return(
        <div>
          <h2>Notebooks</h2>
          <ul>
            {this.props.notebooks.data.map(createNotebookListItem)}
          </ul>
          <h2>Notes</h2>
          <ul>
            {this.props.notes.map(createNoteListItem)}
          </ul>
        </div>
      );
    }
    return (
      <div>
        <h2>Notebooks</h2>
        <ul>
          {this.props.notebooks.data.map(createNotebookListItem)}
        </ul>
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks,
    activeNotebookId: state.activeNotebookId,
    notes: state.notes
  }),
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
