import * as React from 'react'

export default function CreateContainer ({text,id,tasks,task,deleteTask,todos,setTodos,durings,setDurings,dones,setDones,taskStatus}) {
  const [options, setOptions] = React.useState<boolean>(false)
  const handleClick = () => {
    setOptions(prevState => !prevState)
  }

    const deleteButton = () => {
      deleteTask(tasks.filter((el) => el.id !== task.id))
    }
    const pushTodo = () => {
      setTodos([
          ...todos,
          {text: text, id: id}
      ])
        deleteButton()
    }
    const pushDuring = () => {
        setDurings([
            ...durings,
            {text: text, id: id}
        ])
        deleteButton()
    }
    const pushDone = () => {
        setDones([
            ...dones,
            {text: text, id:id}
        ])
        deleteButton()
    }
    return (
        <div className="taskContainer animation">
          <div id="todofirst">{text}
            <button className="trash" onClick={handleClick}>
                <icon className="gg-trash"></icon>
            </button>
          </div>
          <div className={options ? 'options animation' : 'options'}>
            <button id="delete" onClick={deleteButton}>Delete</button>
            {taskStatus !== "todo" ? <button id="todo" onClick={pushTodo}>To do</button> : null}
            {taskStatus !== "during" ? <button id="during" onClick={pushDuring}>During</button> : null}
            {taskStatus !== "done" ? <button id="done" onClick={pushDone}>Done</button> : null}
          </div>
        </div>
  )
}
