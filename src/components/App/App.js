import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ankifyWords from '../../utils/ankifyWords/ankifyWords';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

export default class App extends React.Component {
  state = {
    inputValue: '',
    wordData: ''
  }

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    ankifyWords(this.state.inputValue)
      .then(result => this.setState({
        wordData: result
      }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='App'>
        <form
          onSubmit={this.handleSubmit}
        >
          <TextField
            hintText="example, bear, mouse"
            floatingLabelText="Type some words, you want to learn"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <RaisedButton
            label="Compose cards"
            primary
            type='submit'
          />
        </form>

        <TextField
          multiLine
          fullWidth
          value={this.state.wordData}
          rowsMax={10}
        />
        <CopyToClipboard text={this.state.wordData}>
          <RaisedButton
            label="Copy to clipboard"
            primary
          />
        </CopyToClipboard>
      </div>
    );
  }
}
