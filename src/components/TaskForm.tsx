import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';

//CSS
import styles from './TaskForm.module.css'

// Interface
import {ITask} from '../interfaces/Task'

interface Props {
    btnText: string;
    taskList: ITask[];
    //Adiciona um estado a uma lista
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
    task?: ITask | null;
    handleUpdate?(id: number, title:string, difficulty:number):void
}

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}:Props) => {
    //Criação de variáveis
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);

    useEffect(()=>{
        if(task){
            setId(task.id)
            setTitle(task.title)
            setDifficulty(task.difficulty)
        }
    },[task])

    //Adicionar uma tarefa no sistema
    const addTaskHandler = (e: FormEvent<HTMLFormElement>) =>{
        //Envia sem fazer reload    
        e.preventDefault();

       if(handleUpdate){
            handleUpdate(id,title,difficulty)
       }else{
        const id = Math.floor(Math.random() * 1000);

        const newTask: ITask = {id, title, difficulty}

        //criar em props
        setTaskList!([...taskList,newTask])

        setTitle("")
        setDifficulty(0)
       }

        
    }

    //Mudança de estado
    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        if(e.target.name === "title"){
            setTitle(e.target.value)
        }else{
            setDifficulty(parseInt(e.target.value))
        }
        
    }

        //Atrelando função ao formulário
  return <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
          <label htmlFor="title">Título:</label>                       
          <input type="text" name="title" placeholder="Título da Tarefa" onChange={handleChange} value={title}/>
      </div>
      <div className={styles.input_container}>
          <label htmlFor="difficulty">Dificuldade:</label>
          <input type="text" name="difficulty" placeholder="Dificuldade da Tarefa" onChange={handleChange} value={difficulty}/>
      </div>
      <input type="submit" value={btnText} />
  </form>
}

export default TaskForm;