const React = require('react');

class Note extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const toggleContent = (event) => {
      this.setState({showContent: !this.state.showContent});
    };

    return (
      <li class='note'>
        <a onClick={toggleContent}>
          {this.props.note.title}
        </a>
      </li>
    );
  }
}

module.exports = Note;