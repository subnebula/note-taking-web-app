const React = require('react');

const NotebookView = require('./NotebookView')

class Notebook extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const onClickNotebook = (event) => {
      event.preventDefault();
      this.props.loadNotes(this.props.notebook.id);
    };

    return (
      <NotebookView
        notebook={this.props.notebook}
        onClickNotebook={onClickNotebook}
      />
    );
  }
}

module.exports = Notebook;