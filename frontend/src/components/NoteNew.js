const React = require('react');
const _ = require('lodash');

const NoteEdit = require('./NoteEdit')

class NoteNew extends React.Component {
constructor(props) {
    super(props);
    this.state = {editing: false};
  }

  render() {
    const openEdit = () => {
      this.setState({editing: true});
    };

    const closeEdit = () => {
      this.setState({editing: false});
    };

    const createNote = (newNote) => {
      this.props.createNote(
        _.assign({}, newNote, {notebookId: this.props.notebookId})
      )

      closeEdit();
    };

    if(this.state.editing) {
      return (
        <NoteEdit
          note={this.props.note}
          onSave={createNote}
          onCancel={closeEdit}
        />
      );
    }

    return (
      <button className="btn btn-primary"
        onClick={openEdit}>
        <i className="fa fa-plus"/>
        &nbsp;New Note
      </button>
    )
  }
}

module.exports = NoteNew;