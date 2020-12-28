export default function BasicTitle(props) {
  return (
    <div style={{fontSize: props.fontSize, fontWeight: props.fontWeight ,opacity:props.opacity}}>
      {props.text}
    </div>
  );
}
