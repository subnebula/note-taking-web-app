const React = require('react');

const NoteView = (props) => {
return (
      <ol>
        {props.notes.map(note =>
          <li key={note.id}>
            {note.title}
          </li>)}
      </ol>
    );
}

module.exports = NoteView;