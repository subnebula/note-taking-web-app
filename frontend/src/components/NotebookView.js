const React = require('react');

const NotebookView = (props) => {
  return (
    <li className="notebook">
      <a href="#" onClick={props.onClickNotebook}>
        {props.notebook.title}
      </a>
    </li>
  );
};

module.exports = NotebookView;