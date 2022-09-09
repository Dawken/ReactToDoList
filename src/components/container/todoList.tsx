import * as React from 'react'
import TaskContainer from "./createContainer";
import {useAppSelector} from "../redux/store";


const TodoList = () => {

    const todos = useAppSelector((state) => state.todos);
    return (
            <div className="container">
                <div className="tasksContainers">
                    <div className="top">
                        <h1 id='topTodo'>To do</h1>
                    </div>
                    {todos.todo.map((todo) => (
                        <TaskContainer
                            text={todo.text}
                            id={todo.id}
                            key={todo.id}
                            taskStatus="todo"
                        />
                    ))}
                </div>

                <div className="tasksContainers">
                    <div className="top">
                        <h1 id='topDuring'>During</h1>
                    </div>
                    {todos.during.map((during) => (
                        <TaskContainer
                            text={during.text}
                            id={during.id}
                            key={during.id}
                            taskStatus="during"
                        />
                    ))}
                </div>

                <div className="tasksContainers">
                    <div className="top">
                        <h1 id='topDone'>Done</h1>
                    </div>
                    {todos.done.map((done) => (
                        <TaskContainer
                            text={done.text}
                            id={done.id}
                            key={done.id}
                            taskStatus="done"
                        />
                    ))}
                </div>
            </div>
    )
}
export default TodoList
