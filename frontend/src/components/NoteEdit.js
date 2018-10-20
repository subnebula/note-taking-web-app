const React = require('react');

const MarkdownEditior = require('./MarkdownEditor')

class NoteEdit extends React.Component {
constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: ''
    };
  }

  render() {
    // Function to cancel note creation
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    // Fucntion to save notebook
    const submitAndStopEditing = (event) => {

      //sent title and content to NoteNew
      this.props.onSave({
        title: this.state.title,
        content: this.state.content
      });
    };

    // Function to set state.title to content of input field
    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    // Function to set state.content to content of input field
    const onContentChange = (event) => {
      this.setState({ content: event.target.value });
    };

    return(
      <div>
        {/* Title field */}
        <input className="form-control" value={this.state.title}
          placeholder="Notebook title..." onChange={onTitleChange}
        />
        {/* Markdown editor for note content*/}
        <MarkdownEditior
          value={this.state.content}
          onChange={onContentChange}
        />
        <span>
        {/* Save button */}
        <button className="btn btn-success" onClick={submitAndStopEditing}>
          <i className="fa fa-check"/>
        </button>

        {/* Cancel button */}
        <button className="btn btn-default"
          style={{ marginRight: '12px' }}
          onClick={revertAndStopEditing}>
          Cancel
       </button>
       </span>
      </div>
    )
  }
}

module.exports = NoteEdit;