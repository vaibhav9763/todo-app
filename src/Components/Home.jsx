import "./home.css";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [complete, setIncomplete] = useState([]);
  const [input, setInput] = useState([]);
  const [toogle, setToogle] = useState(true);
  const [editValue, setEditValue] = useState(null);

  const totoalQuentity = todos.length;
  const inprogressTask = inprogress.length;
  const completeTask = complete.length;

  const addTodo = () => {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      text: input,
    };
    if (input && !toogle) {
      setTodos(
        todos.map((element) => {
          if (element.id === editValue) {
            return { ...element, text: input };
          }
          return element;
        })
      );
      setToogle(true);
      setInput(" ");
      setEditValue(null);
    } else {
      setTodos([todo, ...todos]);
      setInput(" ");
      console.log(todo);
    }
  };
  const editTodo = (id) => {
    let edit = todos.find((elm) => {
      return elm.id === id;
    });
    console.log(edit);
    setToogle(false);
    setInput(edit.text);
    setEditValue(id);
  };

  const addProgress = (id) => {
    const item = todos.find((x) => x.id === id);
    setInprogress([item, ...inprogress]);
    const filterArray = todos.filter((x) => x.id !== id);
    setTodos(filterArray);
    console.log(item);
  };
  const deleteTodo = (id) => {
    const filterArray = todos.filter((x) => x.id !== id);
    setTodos(filterArray);
  };

  const addToComplete = (id) => {
    const item = inprogress.find((x) => x.id === id);
    setIncomplete([item, ...complete]);
    const filterArray = inprogress.filter((x) => x.id !== id);
    setInprogress(filterArray);
  };
  useEffect(() => {}, [todos, inprogress]);
  return (
    <div className="app">
      <div className="container">
        <h2 className="title">Todo App </h2>
        <form className="form-todo">
          <input
            placeholder="Enter Task"
            className="form-control"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          {toogle ? (
            <button type="button" onClick={() => addTodo()} className="btn">
              Add Task <RiAddFill size={23} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => addTodo()}
              // swal.fire
              className="btn-edit"
            >
              Save <TbEdit size={22} />
            </button>
          )}
        </form>
        <div className="todo-wrapper">
          <div className="todo-list">
            <h3 className="todo-title">Total Task ({totoalQuentity})</h3>
            {todos.map((item, index) => (
              <div className="todo-card" key={index}>
                <p className="card-text">{item.text}</p>
                <TbEdit
                  title="edit"
                  className="icon-edit-todo icon-space"
                  onClick={() => editTodo(item.id)}
                />
                <BsCheckCircleFill
                  title="click to start"
                  onClick={() => addProgress(item.id)}
                  className="icon-check-todo icon-space"
                />
                <FaTrashAlt
                  title="delete"
                  onClick={() => deleteTodo(item.id)}
                  className="icon-trash-todo icon-space"
                />
              </div>
            ))}
          </div>

          <div className="todo-list">
            <h3 className="todo-title">Pending Task ({inprogressTask})</h3>
            {inprogress.map((item, index) => (
              <div className="progress-card" key={index}>
                <p className="card-text ">{item.text}</p>
                <BsCheckCircleFill
                  onClick={() => addToComplete(item.id)}
                  className="icon-progress-todo"
                />
              </div>
            ))}
          </div>
          <div className="todo-list">
            <h3 className="todo-title">Completed Task ({completeTask})</h3>
            {complete.map((item, index) => (
              <div className="complete-card" key={index}>
                <p className="card-text card-complete">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
