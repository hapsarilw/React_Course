import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id:'asfa1', name: 'Max', age: 28 },
      {id:'vasdf1', name: 'Manu', age: 29 },
      {id:'asdf11',  name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  deletePersonHandler = (personIndex) => {
    //Update state in immutable fashion:

    //1.Create copy
    const persons = [...this.state.persons];
    //2.Change
    persons.splice(personIndex, 1);
    //Update State
    this.setState({persons: persons})
  }

  nameChangedHandler = (event, id ) => {
    const personIndex = this.state.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    this.setState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 27 }, 
        { name: 'Stephanie', age: 27 }
      ]
    });
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div >
            {this.state.persons.map( (person, index) => {
              return <Person 
              click={() => this.deletePersonHandler(index) }
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
            })}          
        </div>
      );
    }
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonHandler}>Toggle Persons</button>
        { persons }
      </div>
    );
  }
}

export default App;
