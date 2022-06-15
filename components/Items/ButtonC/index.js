export default function ButtonC(props) {
  const color = props.color == '' ? 'Primary' : props.color;
  return (
    <button
      class={
        'MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-text' + color
      }
      tabindex='0'
      type='button'
      value={props.value}
      name={props.name}
    >
      {props.children}
    </button>
  );
}
