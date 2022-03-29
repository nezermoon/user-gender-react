import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import './App.css';

class App extends React.Component { 
  constructor(props) { 
    super(props);
    this.state = {value: '', gender: ''}; 
    this.handleValueChange = this.handleValueChange.bind(this); 
    this.handleGenderChange = this.handleGenderChange.bind(this); 
  } 
  handleValueChange() { 
    this.setState({value: event.target.value}); 
    console.log(this.state.value); 
  }
  handleGenderChange(name) {
    this.setState({gender: name});
    console.log(this.state.gender);
  }
  render() { 
    const inputValue = this.state.value; 
    const gender = this.state.gender;
    console.log(this.state)
    return( 
      <div> 
        <Input value = {inputValue} 
        onValueChange = {this.handleValueChange}
        gender = {gender}
        onGenderChange = {this.handleGenderChange}/> 
        <Output gender = {gender}
        name = {inputValue}/> 
      </div> 
    ); 
  } 
} 

class Input extends React.Component { 
  constructor(props) { 
    super(props); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this); 
    this.sendRequest = this.sendRequest.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
  } 
  handleChange(e) {
    this.props.onValueChange(e.target.value); 
  }
  async sendRequest() {
    const response = await fetch('https://api.genderize.io?name=' + this.props.value);
    const json = await response.json();
    console.log(json.gender);
    const result = json.gender;
    this.props.onGenderChange(result);
    return result;
  }
  render() { 
    const value = this.props.value; 
    const gender = this.props.gender;
    return ( 
    <form onClick = {this.handleSubmit}> 
      <label> 
        Name: 
        <input type="text" name="name" value={value} onChange={this.handleChange}/> 
        <input type="submit" value="Request" onClick = {this.sendRequest}/> 
      </label>
    </form> 
    );
  }
}
    
class Output extends React.Component {
  constructor(props) { 
    super(props); 
  }
  render() { 
    return( 
      <div> 
        {this.props.gender}
      </div> 
    ); 
  } 
} 

ReactDOM.render( 
  <App />, 
  document.getElementById('root') 
);