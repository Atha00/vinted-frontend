import "./index.css";

const Button = (props) => {
  return props.active ? (
    <button className={props.className} onClick={props.active}>
      {props.text}
    </button>
  ) : (
    <button className={props.className} disabled={props.disabled}>
      {props.text}
    </button>
  );
};

export default Button;
