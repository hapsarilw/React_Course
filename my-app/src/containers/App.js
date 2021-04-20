import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
    this.state = {
      persons: [
        {id:'asfa1', name: 'Max', age: 28 },
        {id:'vasdf1', name: 'Manu', age: 29 },
        {id:'asdf11',  name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false
    }
  }


  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount(){
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }
  
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
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});

  
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;    
    this.setState({ showPersons: !doesShow });
  }

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />      
    }    
    
    return (
      <div className={classes.App}>  
        <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            persons={this.state.persons}  
            clicked={this.togglePersonHandler}/>        
           {persons}
      </div>           
           
    );
  }
}
export default App;