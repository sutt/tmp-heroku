import React, {useState} from 'react'

function whichCriteria(viewCriteria) {
  return Object.entries(viewCriteria).filter(kv => kv[1])[0][0]
}

export default function Todo(props) {

  const [isEditing, setEditing] = useState(false)

  const updateEditing = () => setEditing(!isEditing)

  const [newName, setNewName] = useState('')
    
    function handleSubmit(e, id) {
        e.preventDefault()
        console.log("in handleSubmit")
        props.editFunc(id, newName)
        setNewName("")
        updateEditing()

    }

    function handleChange(e) {
        setNewName(e.target.value)
        console.log(newName)
    }
  
  const criterion = whichCriteria(props.criteria)
  
  if ((criterion === 'Incomplete' &&  props.completed) ||
      (criterion === 'Complete'   && !props.completed)   ) {
        return null
  }

  const editingTemplate = (
    <li className="todo stack-small">
    <form 
      className="stack-small" 
      // onSubmit={(e) => handleSubmit(e, props.id)}
      >
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input 
          id={props.id} 
          className="todo-text" 
          type="text" 
          onChange={(e) => handleChange(e)}
          />
      </div>
      <div className="btn-group">
        <button 
          type="button" 
          className="btn todo-cancel"
          >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button 
          // type="submit" 
          className="btn btn__primary todo-edit"
          // onClick = {(e) => {handleSubmit(props.id, e); updateEditing()}}
          // onClick= {() => alert('clicked')}
          >
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
    </li>
  );

  const viewingTemplate = (
        <li className="todo stack-small">
          <div className="c-cb">
            <input 
              id={props.id} 
              type="checkbox" 
              defaultChecked={props?.completed} 
              onChange={() => props.checkFunc(props.id)}   
              />
            <label className="todo-label" htmlFor={props.id}>
                {props?.name}
            </label>
          </div>
          <div className="btn-group">
            <button 
              type="button" 
              className="btn"
              // onClick={() => props.editFunc(props.id)}
              onClick={updateEditing}
              >
              Edit 
            </button>
            <button 
              type="button" 
              className="btn btn__danger" 
              onClick={() => props.delFunc(props.id)}
              >
              Delete 
            </button>
          </div>
        </li>
    )

    return isEditing ? editingTemplate : viewingTemplate
}