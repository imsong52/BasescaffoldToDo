import React, { Component } from 'react'
import {TransitionMotion,StaggeredMotion,spring,presets,Motion} from 'react-motion';

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       todos: {
        // key is creation date
        't1': {text: 'Board the plane'},
        't2': {text: 'Sleep'},
        't3': {text: 'Try to finish coneference slides'},
        't4': {text: 'Eat cheese and drink wine'},
        't5': {text: 'Go around in Uber'},
        't6': {text: 'Talk with conf attendees'},
        't7': {text: 'Show Demo 1'},
        't8': {text: 'Show Demo 2'},
        't9': {text: 'Lament about the state of animation'},
        't10': {text: 'Show Secret Demo'},
        't11': {text: 'Go home'},
      },
      value: '',
       items: [{key: 'a', size: 10}, {key: 'b', size: 20}, {key: 'c', size: 30}],
    }
     this.handleChange = this.handleChange.bind(this);
      this.handleDestroy = this.handleDestroy.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
   // this.setState({value:'a'});
  }
  componentDidMount() {
    this.setState({
      items: [{key: 'a', size: 10}, {key: 'b', size: 20}], // remove c.
    });
  }
    willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return {width: spring(0), height: spring(0)};
  }
   willEnter(date) {
    return {
      height: spring(0),
      opacity: spring(2),
      data: this.state.todos[date],
    };
  }
  //   getDefaultValue() {
  //   const {todos} = this.state;
  //   return Object.keys(todos)
  //     .reduce((configs, date) => {
  //       configs[date] = {
  //         height: spring(0),
  //         opacity: spring(1),
  //         data: todos[date],
  //       };
  //       return configs;
  //     }, {});
  // }

   getEndValue() {
    const {todos, value} = this.state;
   let temp=Object.keys(todos)
      .filter(date => {
        const todo = todos[date];
        return todo.text.toUpperCase().indexOf(value.toUpperCase()) >= 0
      })
      .reduce((configs, date) => {
        configs[date] = {
          // height: spring(60, presets.wobbly),
          // opacity: spring(1, presets.wobbly),
         styles: {width: spring(60), opacity: spring(1)},
          data: todos[date],
          key:date
        };
        return configs;
      }, {});
      console.log(temp)
    return temp;
  }
  // getTestVaule(){
  //   let temp= 
  //    console.log(temp);
  //       return temp;
  // }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleDestroy(index) {
   
     const {todos} = this.state;
    delete todos[index];
    this.forceUpdate();
    console.log(this.state);
  }

handleSubmit(e) {
    e.preventDefault();
    const {todos, value} = this.state;
   
    let tmp=todos.push(value);
     console.log(tmp);
    this.setState({
         
    });
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
          Object.keys(this.state.todos)
      .filter(date => {
        const todo = todos[date];
        return todo.text.toUpperCase().indexOf(value.toUpperCase()) >= 0
      })
      .reduce((configs, date) => {
        configs[date] = {
          height: spring(60, presets.wobbly),
          opacity: spring(1, presets.wobbly),
          data: todos[date],
        }
        })
       }>
         {configs =>
         <ul className="todo-list">
            {/*{
              this.state.todos.map((text,index)=>{
                   return(
                    <li key={index}>
                         <div className="view">
                        
                        <label>{text}</label>
                        <button
                          className="destroy"
                         onClick={this.handleDestroy.bind(null, index)}
                        />
                      </div>
                    </li>
                   )
            })}*/}
           </ul>
        }
            
              </TransitionMotion>
        </section>
    <TransitionMotion
        willLeave={this.willLeave}
        styles={
         this.state.items.map(item => ({
          key: item.key,
          style: {width: item.size, height: item.size},
        }))
        }>
        {interpolatedStyles =>
          // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
          <div>
            {interpolatedStyles.map(config => {
              console.log(config.style);
              return <div key={config.key} style={{width:config.style.width,height:config.style.height, border: '1px solid'}} />
            })}
          </div>
        }
      </TransitionMotion>
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