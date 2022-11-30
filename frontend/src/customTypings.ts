export type ContainerProps = {
    text: string,
    id:string,
    date: string,
    description: string,
    taskStatus:string
}
export type TaskStatus = 'todo' | 'during' | 'done'
