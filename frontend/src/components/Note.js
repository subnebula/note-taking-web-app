const React = require('react');

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showContent: false}
  }

  render () {
    const toggleContent = (event) => {
      this.setState({showContent: !this.state.showContent});
    };

    const deleteNote = () => {
      this.props.deleteNote(this.props.note.id)
    }

    var content;
    if(this.state.showContent) {
      content = <span> --- {this.props.note.content} </span>
    }
    return (
      <li>
        <button className="btn btn-danger btn-xs" onClick={deleteNote}>
        <i className="fa fa-remove"/>
      </button>
        <a onClick={toggleContent} role="button">
          {this.props.note.title}
        </a>
        {content}
      </li>
    );
  }
}

module.exports = Note;