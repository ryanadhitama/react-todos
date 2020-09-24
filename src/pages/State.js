import React from 'react';
import Navbar from '../components/Navbar'

class State extends React.Component {

  constructor(){
    super();
    this.state = {
      todos       : [],
      title       : '',
      description : '',
      data_key    : '',
      edit        : false
    }
  }

  componentDidMount(){
    this.init()
  }

  init(){
    if (localStorage.getItem('todos') != null){
      this.setState({
        todos : JSON.parse(localStorage.getItem('todos'))
      })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  resetState () {
    this.setState ({
      title       : '',
      description : '',
      edit        : false,
      data_key    : ''
    })
  }

  edit = event => {
    
    let index = event.target.getAttribute('data-key');
    var todos = JSON.parse(localStorage.getItem('todos'));
  
    this.setState ({
      title       : todos[index].title,
      description : todos[index].description,
      edit        : true,
      data_key    : index
    })

  }

  save () {
    var todos = {
      'title'       : this.state.title,
      'description' : this.state.description
    }
    if (localStorage.getItem('todos') == null){
      var data = [todos];
      localStorage.setItem('todos', JSON.stringify(data));
    } else {
      var storage = JSON.parse(localStorage.getItem('todos'));
      if(this.state.edit == false){
        storage.push(todos);
        localStorage.setItem('todos', JSON.stringify(storage));
      } else {
        storage[this.state.data_key].title = this.state.title;
        storage[this.state.data_key].description = this.state.description;
        localStorage.setItem('todos', JSON.stringify(storage));
      }
      
    }
    
    this.init()
    this.resetState()
  }

  delete = event => {
    let index = event.target.getAttribute('data-key');
    var todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.init()
    this.resetState()
  }

  render(){
    return (
      <div className="container mt-3">
        <Navbar/>
        <h3>Todo</h3>
        <hr/>
        <form className="form-inline">
          <div className="form-group">
            <input 
                  type="text" 
                  className="form-control" 
                  placeholder="title"
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title}
            /> 
          </div>
          <div className="form-group">
            <input 
                  type="text" 
                  className="form-control ml-2 mr-2" 
                  placeholder="description"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.description}
            /> 
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-success" onClick={this.save.bind(this)}>
              {
                (this.state.edit === true) ? 'save' : 'add'
              }
            </button>
          </div>
        </form>
        <hr/>
        {
          this.state.todos.map((item, index) => 
            <li key={index}>
              <strong>{item.title} </strong>
              -&nbsp; 
              {item.description} <br/><br/>
              <button className="btn btn-sm btn-info ml-3 mb-2" data-key={index} onClick={this.edit.bind(this)}>edit</button>
              <button className="btn btn-sm btn-danger ml-1 mb-2" data-key={index} onClick={this.delete.bind(this)}>delete</button> <br/>
              
            </li>
          )
        }
      </div>
    );
  }
}

export default State;
