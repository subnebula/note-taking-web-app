const React = require('react');

class Note extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const onClickNote = (event) => {
      event.preventDefault();
      this.props.loadNote(this.props.note.id);
    };

    return (
      <li class='note'>
        <a href="#" onClick={onClickNote}>
          {this.props.note.title}
        </a>
      </li>
    );
  }
}

module.exports = Note;