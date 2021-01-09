import React, {useState} from "react";

function Form(props) {

    const [name, setName] = useState('')
    
    function handleSubmit(e) {
        
        e.preventDefault()
        // alert('from being submitted')
        console.log('submitting')
        props.onSubmit(name)
        setName("")
    }

    function handleChange(e) {
        // console.log(`Typing: ${e.target.value}`)
        setName(e.target.value)
        
    }

    return (
        <form >
        <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
            </label>
        </h2>
        <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            onChange={handleChange}
        />
        <button 
            type="submit" 
            className="btn btn__primary btn__lg"
            onClick={handleSubmit}
            >
            Add
        </button>
        </form>
    );
    }

export default Form;