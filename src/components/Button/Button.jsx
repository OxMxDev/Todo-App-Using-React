import styles from "../Button/Button.module.css";

function Button(props) {
	return (
		<>
			<button className={styles.button_style} onClick={props.onClick}>
				{props.text}
			</button>
		</>
	);
}

export default Button;
