export default function MyError(props) {
  return (
    <>
      <div>Permission Error</div>
      <h3>{props.message}</h3>
    </>
  );
}
