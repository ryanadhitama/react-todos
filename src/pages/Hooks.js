import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar'

function Hooks (){

    const [todos, setTodos] = useState([]);
    const [key, setKey] = useState();
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({
        title       : "",
        description : ""
    }) 

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        if (localStorage.getItem('todos') != null){
            setTodos(JSON.parse(localStorage.getItem('todos')))
        }
        setEdit(false)
    }

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    }

    const resetState = () => {
        setForm({
            title : "",
            description : ""
        })
        setKey('')
        setEdit(false)
    }

    const save = () => { 
        var todos = form;
        if (localStorage.getItem('todos') == null){
            var data = [todos];
            localStorage.setItem('todos', JSON.stringify(data));
        } else {
            var storage = JSON.parse(localStorage.getItem('todos'));
            if(edit == false){
                storage.push(todos);
                localStorage.setItem('todos', JSON.stringify(storage));
            } else {
                storage[key].title = form.title;
                storage[key].description = form.description;
                localStorage.setItem('todos', JSON.stringify(storage));
            }  
        }
        init()
        resetState()
    }

    const editData = (key) => {
        var todos = JSON.parse(localStorage.getItem('todos'));
        setForm({
            title : todos[key].title,
            description : todos[key].description
        })
        setKey(key)
        setEdit(true)
    }

    const del = (key) => {
        var todos = JSON.parse(localStorage.getItem('todos'));
        todos.splice(key, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        init()
        resetState()
    }

    return (
      <div className="container mt-3">
        <Navbar/>
        <h3>Todo Hooks</h3>
        <hr/>
        <form className="form-inline">
          <div className="form-group">
            <input 
                  type="text" 
                  className="form-control" 
                  placeholder="title"
                  name="title"
                  onChange={e => handleChange("title", e.target.value)}
                  value={form.title}
            /> 
          </div>
          <div className="form-group">
            <input 
                  type="text" 
                  className="form-control ml-2 mr-2" 
                  placeholder="description"
                  name="description"
                  onChange={e => handleChange("description", e.target.value)}
                  value={form.description}
            /> 
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-success" onClick={save}>
              {
                (edit === true) ? 'save' : 'add'
              }
            </button>
          </div>
        </form>
        <hr/>
        {
          todos.map((item, index) => 
            <li key={index}>
              <strong>{item.title} </strong>
              -&nbsp;
              {item.description} <br/><br/>
              <button className="btn btn-sm btn-info ml-3 mb-2"  onClick={() => editData(index)}>edit</button>
              <button className="btn btn-sm btn-danger ml-1 mb-2" onClick={() => del(index)}>delete</button> <br/>
              
            </li>
          )
        }
      </div>
    );
  
}

export default Hooks;
