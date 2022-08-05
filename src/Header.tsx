import * as React from 'react'
import './Background'
export default function Header () {
  return (
        <div className="input">
            <input type="text" id="task-input" placeholder="What are we doin today?"/>
            <button id="submit">Add task</button>
        </div>
  )
}
