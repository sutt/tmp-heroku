import React from 'react'

function whichCriteria(viewCriteria) {
  return Object.entries(viewCriteria).filter(kv => kv[1])[0][0]
}

export default function Todo(props) {
  
  const criterion = whichCriteria(props.criteria)
  
  if ((criterion === 'Incomplete' &&  props.completed) ||
      (criterion === 'Complete'   && !props.completed)   ) {
        return null
  }

  return (
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
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Eat</span>
            </button>
            <button 
              type="button" 
              className="btn btn__danger" 
              onClick={props.delFunc}>
              Delete <span className="visually-hidden">Eat</span>
            </button>
          </div>
        </li>
    )
}