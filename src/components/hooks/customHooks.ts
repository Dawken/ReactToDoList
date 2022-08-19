import {TaskStatus} from "../customTypings";
import {useEffect, useState} from "react";

export const useCustom = (prop:TaskStatus) => {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem(prop) || '[]'))
    useEffect(() => {
        return localStorage.setItem(prop, JSON.stringify(tasks))
    }, [tasks])
    return [tasks, setTasks]
}
