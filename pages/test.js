import Button from '@material-ui/core/Button';
export default function test() {
  return (
    <>
      <Button onClick={() => alert('a')}>Абоба</Button>
      <a href='#' onClick={() => alert('a')}>
        F,jfd
      </a>
    </>
  );
}
