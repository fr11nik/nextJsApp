import Paper from '@material-ui/core/Paper';
export default function PaperWrap(props) {
  var flexType = props.flex;
  flexType = !props.flex ? 'inline-block ' : 'flex';

  return (
    <div className='css133133'>
      <Paper>
        <div className='css133133__inner'>
          <p>{props.title}</p>
          <div className='block2' style={{display: flexType}}>
            <div className='proper12334'>{props.children}</div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
