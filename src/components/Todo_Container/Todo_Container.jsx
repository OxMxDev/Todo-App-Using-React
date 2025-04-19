import Button from '../Button/Button';
import styles from '../Todo_Container/Todo_Container.module.css'
import React,{useState} from 'react'
function Todo_Container(){
    const [Todo,setTodo] = useState("")
    const [TodoList,setTodoList] = useState([])
    const handleInputChange = (e) =>{
        setTodo(e.target.value)
    }

    const AddTodo = () => {
			if (Todo.trim() !== "") {
				setTodoList([...TodoList, Todo]);
				setTodo("");
			}
		};

    const removeTodo = (index) => {
			const updatedList = TodoList.filter((_,i)=>i!=index)
            setTodoList(updatedList)
		};
    return(
        <>
            <div className={styles.input_container}>
                <input type="text" className={styles.input} value={Todo} onChange={handleInputChange}/>
                <Button text={"Add Todo"} todo={Todo} setTodo={setTodo} setTodoList={setTodoList} todoList = {TodoList} onClick={AddTodo}/>
            </div>

            <div className={styles.content}>
                <ul>
                    {TodoList.map((item,index)=>{
                        return(
                        <div className={styles.itemContainer}>
                        <li key={encodeURI(index)}>{item}</li>
                        <Button text={"Remove Todo"} onClick={()=>removeTodo(index)}/>
                        </div>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default Todo_Container