const React = require('react');

class ActiveNotebook extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <ActiveNotebookView
        notebook={this.props.notebook}
        notes={this.prop.notes}
      />
    );
  }
}

module.exports = ActiveNotebook;