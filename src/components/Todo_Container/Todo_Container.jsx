import Button from "../Button/Button";
import styles from "../Todo_Container/Todo_Container.module.css";
import React, { useState, useEffect } from "react";

function Todo_Container() {
	const [Todo, setTodo] = useState("");
	const [TodoList, setTodoList] = useState([]);
	const [editIndex, setEditIndex] = useState(null);
	const [search, setSearch] = useState("");

	// Load from localStorage on mount
	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem("todos"));
		if (savedTodos) setTodoList(savedTodos);
	}, []);

	// Save to localStorage on update
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(TodoList));
	}, [TodoList]);

	const handleInputChange = (e) => {
		setTodo(e.target.value);
	};

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	const AddTodo = () => {
		if (Todo.trim() === "") return;

		if (editIndex !== null) {
			const updatedList = [...TodoList];
			updatedList[editIndex].text = Todo;
			setTodoList(updatedList);
			setEditIndex(null);
		} else {
			setTodoList([...TodoList, { text: Todo, completed: false }]);
		}

		setTodo("");
	};

	const removeTodo = (index) => {
		const updatedList = TodoList.filter((_, i) => i !== index);
		setTodoList(updatedList);
	};

	const editTodo = (index) => {
		setTodo(TodoList[index].text);
		setEditIndex(index);
	};

	const toggleComplete = (index) => {
		const updatedList = [...TodoList];
		updatedList[index].completed = !updatedList[index].completed;
		setTodoList(updatedList);
	};

	const filteredTodos = TodoList.filter((item) =>
		item.text.toLowerCase().includes(search.toLowerCase())
	);

	const total = TodoList.length;
	const completed = TodoList.filter((t) => t.completed).length;

	return (
		<>
			<div className={styles.input_container}>
				<input
					type="text"
					placeholder="Add a todo"
					className={styles.input}
					value={Todo}
					onChange={handleInputChange}
				/>
				<Button
					text={editIndex !== null ? "Update Todo" : "Add Todo"}
					onClick={AddTodo}
				/>
			</div>

			<div className={styles.search_container}>
				<input
					type="text"
					placeholder="Search todos..."
					className={styles.input}
					value={search}
					onChange={handleSearchChange}
				/>
			</div>

			<div className={styles.stats}>
				<p>
					Total: {total} | Completed: {completed} | Pending: {total - completed}
				</p>
			</div>

			<div className={styles.content}>
				<ul>
					{filteredTodos.map((item, index) => (
						<div key={index} className={styles.itemContainer}>
							<li
								className={item.completed ? styles.completed : ""}
								onClick={() => toggleComplete(index)}
							>
								{item.text}
							</li>
							<Button text="Remove" onClick={() => removeTodo(index)} />
							<Button text="Edit" onClick={() => editTodo(index)} />
						</div>
					))}
				</ul>
			</div>
		</>
	);
}

export default Todo_Container;
