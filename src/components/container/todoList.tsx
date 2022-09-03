import * as React from 'react'
import CreateContainer from "./createContainer";
import {type_alias} from "../customTypings";

type PropsTodoList = {
    todos: type_alias[],
    durings: type_alias[],
    dones: type_alias[],
    deleteTask: (id:number, taskStatus:string) => void,
    flipTask:(taskStatus:string,text:string, id:number) => void,
}

const TodoList = ({todos,durings,dones,deleteTask,flipTask}:PropsTodoList) => {


    return (
            <div className="container">
                <div className="todo">
                    <div id="top">
                        <h1 id='topTodo'>To do</h1>
                    </div>
                    {todos?.map((todo) => (
                        <CreateContainer
                            text={todo.text}
                            id={todo.id}
                            key={todo.id}
                            taskStatus="todo"
                            deleteTask={deleteTask}
                            flipTask={flipTask}
                        />
                    ))}
                </div>

                <div className="during">
                    <div id="top">
                        <h1 id='topDuring'>During</h1>
                    </div>
                    {durings?.map((during) => (
                        <CreateContainer
                            text={during.text}
                            id={during.id}
                            key={during.id}
                            taskStatus="during"
                            deleteTask={deleteTask}
                            flipTask={flipTask}
                        />
                    ))}
                </div>

                <div className="done">
                    <div id="top">
                        <h1 id='topDone'>Done</h1>
                    </div>
                    {dones?.map((done) => (
                        <CreateContainer
                            text={done.text}
                            id={done.id}
                            key={done.id}
                            taskStatus="done"
                            deleteTask={deleteTask}
                            flipTask={flipTask}
                        />
                    ))}
                </div>
            </div>
    )
}
export default TodoList
