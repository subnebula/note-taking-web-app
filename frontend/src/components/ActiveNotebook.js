const React = require('react');

class ActiveNotebook extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const onClickNote = (event) => {
      event.preventDefault();
      this.props.loadNote(this.props.note.id);
    };

    return (
      <NoteView
        notes={this.prop.notes}
        onClickNote={onClickNotebook}
      />
    );
  }
}

module.exports = ActiveNotebook;