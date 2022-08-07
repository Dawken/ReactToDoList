import * as React from 'react'

export default function CreateContainer ({text}) {
  const [options, setOptions] = React.useState<boolean>(false)
  const handleClick = () => {
    setOptions(prevState => !prevState)
  }
    return (
        <div className="taskContainer animation">
          <div id="todofirst">{text}
            <button className="trash" onClick={handleClick}>
                <icon className="gg-trash"></icon>
            </button>
          </div>
          <div className={options ? 'options animation' : 'options'}>
            <button id="delete">Delete</button>
            <button id="during">During</button>
            <button id="done">Done</button>
          </div>
        </div>
  )
}
