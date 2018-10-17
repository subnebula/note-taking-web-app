const React = require('react');

const NoteView = (props) => {
  return (
  <li class='note'>
    <a href="#" onClick={props.onClickNote}>
      {props.note.title}
    </a>
  </li>
      <ol>
        {props.notes.map(note =>
          <li key={note.id}>
            {note.title}
          </li>)}
      </ol>
    );
}

module.exports = NoteView;