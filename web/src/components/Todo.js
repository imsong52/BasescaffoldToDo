import React, { Component } from 'react'
import {TransitionMotion,StaggeredMotion,spring,presets,Motion} from 'react-motion';

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     todos: [
       
        {key: 't1', data: {text: 'Board the plane', isDone: false}},
        {key: 't2', data: {text: 'Sleep', isDone: false}},
        {key: 't3', data: {text: 'Try to finish conference slides', isDone: false}},
        {key: 't4', data: {text: 'Eat cheese and drink wine', isDone: false}},
        {key: 't5', data: {text: 'Go around in Uber', isDone: false}},
        {key: 't6', data: {text: 'Talk with conf attendees', isDone: false}},
        {key: 't7', data: {text: 'Show Demo 1', isDone: false}},
        {key: 't8', data: {text: 'Show Demo 2', isDone: false}},
        {key: 't9', data: {text: 'Lament about the state of animation', isDone: false}},
        {key: 't10', data: {text: 'Show Secret Demo', isDone: false}},
        {key: 't11', data: {text: 'Go home', isDone: false}},
      ],
      value: '',
      selected: 'all',
      items: [{key: 'a', size: 10}, {key: 'b', size: 20}, {key: 'c', size: 30}],
    }
     this.handleChange = this.handleChange.bind(this);
      this.handleDestroy = this.handleDestroy.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
         this.getStyles = this.getStyles.bind(this);
  }
  componentWillMount() {
   // this.setState({value:'a'});
  }
  componentDidMount() {
    this.setState({
      items: [{key: 'a', size: 10}, {key: 'b', size: 20}], 
    });
  }
    willLeave() {
    
    return {width: spring(0), height: spring(0)};
  }
   willEnter(date) {
     return {
      height: 0,
      opacity: 1,
    };
  }
  getStyles (){
    const {todos, value} = this.state;
    return todos.filter(({data: {isDone, text}}) => {
      return text.toUpperCase().indexOf(value.toUpperCase()) >= 0 
       
    })
    .map((todo, i) => {
      
      return {
        key:todo.key,
        data:todo.data,
        index:i,
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle),
          
        }
      };
    });
  }

  // getTestVaule(){
  //   let temp= 
  //    console.log(temp);
  //       return temp;
  // }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleDestroy(key) {
    console.log(key);
     const {todos} = this.state;
   
     this.setState({todos: this.state.todos.filter((data) => data.key !== key)});
     console.log(this.state);
  }

handleSubmit(e) {
    e.preventDefault();
  
    const newItem = {
      key: 't' + Date.now(),
      data: {text: this.state.value, isDone: false},
    };
    // append at head
    this.setState({todos: [newItem].concat(this.state.todos)});
  }
  render() {
   const {todos, value} = this.state;
    return (
    <div className="rightcontent">
     <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus={true}
              className="new-todo"
              placeholder="What needs to be done?"
              value={value}
              onChange={this.handleChange}
            />
          </form>
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox"  />
            <TransitionMotion
        willLeave={this.willLeave}
        willEnter={this.willEnter}
       
       styles={
        this.getStyles
       }>
         {styles =>
         <ul className="todo-list">
            {styles.map(({key, style,data: {text}}) =>
                   
                  <li key={key} style={style} >
                     <div className="view">
                        
                        <label>{text}</label>
                        <button
                          className="destroy"
                          onClick={this.handleDestroy.bind(null, key)}
                        />
                      </div>
                  </li>
                )}
           </ul>
        }
            
              </TransitionMotion>
        </section>
   
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {Object.keys(todos).filter(key => !todos[key].isDone).length}
            </strong> item left
          </span>
        </footer>
      </section>
      </div>
    )
      
    
  }
}
export default Todo