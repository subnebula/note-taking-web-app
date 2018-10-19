const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes')

const Notebook = require('./Notebook')
const NoteList = require('./NoteList')
const NotebookNew = require('./NotebookNew')


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
        <div>
        <NotebookNew/>
        <Notebook
          key = {notebook.id}
          notebook = {notebook}
          loadNotes = {this.props.loadNotes}
          deleteNotebook = {this.props.deleteNotebook}/>
        </div>
      );
    };

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
  }),
  createActionDispatchers(notebooksActionCreators, notesActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
