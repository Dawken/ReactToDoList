import * as React from 'react'
import CreateContainer from "./createContainer";
import {type_alias} from "../customTypings";

type PropsTodoList = {
    todos: type_alias[],
    durings: type_alias[],
    setTodos: React.Dispatch<type_alias[]>,
    setDurings: React.Dispatch<type_alias[]>,
    dones: type_alias[],
    setDones:React.Dispatch<type_alias[]>,
}

const TodoList = ({todos,setTodos,durings,setDurings,dones,setDones}:PropsTodoList) => {

    return (
        <main>
            <div className="container">
            <div className="todo">
                <div id="top">
                    <h1>To do</h1>
                </div>
                {todos?.map((todo) => (
                    <CreateContainer
                        text={todo.text}
                        id={todo.id}
                        key={todo.id}
                        tasks={todos}
                        task={todo}
                        deleteTask={setTodos}
                        todos={todos}
                        setTodos={setTodos}
                        durings={durings}
                        setDurings={setDurings}
                        dones={dones}
                        setDones={setDones}
                        taskStatus="todo"
                    />
                ))}
            </div>

            <div className="during">
                <div id="top">
                    <h1>During</h1>
                </div>
                {durings?.map((during) => (
                    <CreateContainer
                        text={during.text}
                        id={during.id}
                        key={during.id}
                        tasks={durings}
                        task={during}
                        todos={todos}
                        setTodos={setTodos}
                        durings={durings}
                        deleteTask={setDurings}
                        dones={dones}
                        setDones={setDones}
                        taskStatus="during"
                        setDurings={setDurings}
                    />
                ))}
            </div>

            <div className="done">
                <div id="top">
                    <h1>Done</h1>
                </div>
                {dones?.map((done) => (
                    <CreateContainer
                        text={done.text}
                        id={done.id}
                        key={done.id}
                        tasks={dones}
                        task={done}
                        todos={todos}
                        setTodos={setTodos}
                        durings={durings}
                        deleteTask={setDones}
                        setDurings={setDurings}
                        taskStatus="done"
                        dones={dones}
                        setDones={setDones}
                    />
                ))}
            </div>
        </div>
</main>
  )
}
export default TodoList
