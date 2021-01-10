import React, {useState} from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import {nanoid} from "nanoid"
import {Route, Link} from "react-router-dom"

// var globalRet = null;
function App(props) {

  const [tasks, setTasks] = useState(props.tasks)
  const [viewCriteria, setViewCriteria] = useState(props.criteria)
  
  function toggleTaskComplete(id) {
    console.log(`toggleTaskCompleted() being run on id: ${id}`) 
    console.log(id)
    console.log(tasks)
    const newTasks = tasks.map(task => {
      if (id === task.id) {
        console.log(`switching complete from ${task.completed} to ${!task.completed} for id: ${task.id}`)
        return {...task, completed: !task.completed}
      } else {
        return task
      }
    })
    console.log(newTasks)
    setTasks( newTasks)
  }

  const taskList = tasks.map(task => (
    <Todo
      completed={task.completed}
      name={task.name}
      key={task.id}
      id={task.id}
      checkFunc={toggleTaskComplete}
      delFunc={delTask}
      editFunc={editTask}
      criteria={viewCriteria}
      >
    </Todo>)
    )

  
  function addTask(name) {
    const tmp = {id: nanoid(), name: name, completed: false}
    setTasks([...tasks, tmp])
  }

  function delTask(id) {
    const tmp = tasks.filter(task => task.id !== id)
    setTasks(tmp)
  }

  function editTask(id, newName="my edit") {
    
    let ids = tasks.map(task => task.id)
    let index = ids.indexOf(id)
    
    let edit = tasks[index]
    edit.name = newName
    console.log('in editTask')
    const newTasks = [...tasks.slice(0,index), edit, ...tasks.slice(index+1, tasks.length)]
    setTasks(newTasks)
    
  }

  function selectCriteria(txt) {
    
    let newViewCriteria = {}
    for (let k in Object.keys(viewCriteria)) { newViewCriteria[k] = false }
    newViewCriteria[txt] = true

    setViewCriteria(newViewCriteria)
  }
  

  return (
    <div className="todoapp stack-large">
      <h3>TodoMatic</h3>
      
      <Form onSubmit={addTask}/>
      
      <div className="filters btn-group stack-exception">
      
        {/* TODO - Make this a map */}
        <FilterButton txt="All"         criteria={viewCriteria}  passCriteria={selectCriteria} />
        <FilterButton txt="Incomplete"  criteria={viewCriteria}  passCriteria={selectCriteria} />
        <FilterButton txt="Complete"    criteria={viewCriteria}  passCriteria={selectCriteria} />
      
      </div>
      <h2 id="list-heading">
        {taskList.length} tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
        {/* <Todo name="Eat" completed={true} id="todo-0"/>
        <Todo name="Sleep" completed={false} id="todo-1" />
        <Todo name="Repeat" completed={false} id="todo-2"/> */}

      </ul>
      <footer> 
        <h3>My footer</h3>
        <Link to="/">
          <img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" alt="/" height="100px"/>
          <h5>Bitcoin Prices</h5>
        </Link>
        {/* <Route path="/"
          component={Todo}
        /> */}
      </footer>
    </div>
    
   
  );
}

export default App;
