const React = require('react');

const NotebookView = (props) => {
  return (
    <div className="blog-post">
      <a href="#" onClick={props.onClickNotebook}>
        {props.notebook.title}
      </a>
    </div>
  );
};

module.exports = NotebookView;