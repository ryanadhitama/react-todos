import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar'
import firebase from '../util/firebase';

function Firebase (){

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
        const todoRef = firebase.database().ref('Todo');
        todoRef.on('value', (snapshot) => {
            const todos = snapshot.val();
            const todoList = [];
            for (let id in todos) {
                todoList.push({ id, ...todos[id] });
            }
            setTodos(todoList);
        });

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
        const todo = form;
        if(edit == false){
            const todoRef = firebase.database().ref('Todo');
            todoRef.push(todo);
        } else {
            const todoRef = firebase.database().ref('Todo').child(key);
            todoRef.update(todo);
        }
        
        init()
        resetState()
    }

    const editData = (key) => {
        const todoRef = firebase.database().ref('Todo').child(key);

        todoRef.on('value', (snapshot) => {
            const todos = snapshot.val();
            setForm(todos)
        });
    
        setKey(key)
        setEdit(true)
    }

    const del = (key) => {
        const todoRef = firebase.database().ref('Todo').child(key);
        todoRef.remove();

        init()
        resetState()
    }

    return (
      <div className="container mt-3">
        <Navbar/>
        <h3>Todo Firebase</h3>
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
              <button className="btn btn-sm btn-info ml-3 mb-2"  onClick={() => editData(item.id)}>edit</button>
              <button className="btn btn-sm btn-danger ml-1 mb-2" onClick={() => del(item.id)}>delete</button> <br/>
              
            </li>
          )
        }
      </div>
    );
  
}

export default Firebase;
