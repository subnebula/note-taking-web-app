/**
 * A markdown editor component. Markdown is a very simple language for
 * formatting text that can be converted into HTML.
 *
 * This component is used for providing a nice editor for note content.
 */

const React = require('react');

const MarkdownEditor = React.createClass({
  // Display name (useful for debugging)
  displayName: 'MarkdownEditor',

  // Validate props to make sure that the component is used correctly
  propTypes: {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    const SimpleMDE = require('simplemde');

    // Turn our plain old text area into a beautiful markdown editor
    this.simpleMDE = new SimpleMDE({
      indentWithTabs: false,
      status: false,
      autoDownloadFontAwesome: false,
      element: this.textarea
    });

    // Put initial text in the editor
    this.simpleMDE.value(this.props.value);

    // Listen for changes and fire a callback
    this.simpleMDE.codemirror.on('change', () => {
      const newText = this.simpleMDE.value();
      if(newText !== this.props.value) {
        this.props.onChange(newText);
      }
    });
  },

  componentDidUpdate: function() {
    // Replace the text in the editor, preserving the cursor position and
    // selection info
    const selections = this.simpleMDE.codemirror.listSelections();
    this.simpleMDE.value(this.props.value);
    this.simpleMDE.codemirror.setSelections(selections);
  },

  // Describe how to render the component
  render: function() {
    const ref = element => { this.textarea = element; };
    return (
      <textarea ref={ref} />
    );
  }
});

// Export the component so that it can be required
module.exports = MarkdownEditor;
