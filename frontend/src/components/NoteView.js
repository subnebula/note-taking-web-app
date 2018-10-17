const React = require('react');

const NoteView = (props) => {
  return (
  <li class='note'>
    <a href="#" onClick={props.onClickNote}>
      {props.note.title}
    </a>
  </li>
    );
}

module.exports = NoteView;