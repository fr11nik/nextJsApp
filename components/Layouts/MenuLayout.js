import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

export default function MenuLayout({children, firstname, lastname, show}) {
  if (show != undefined) {
    var displayType = show ? 'block' : 'none';
  }
  return (
    <>
      <div className='menuContainer' style={{display: displayType}}>
        <Paper className='paperHeader' variant='outlined'>
          <div className='menuHeader'>
            <Avatar className='avatarUser' alt={firstname} src='../img/404.png' />
            <h5>
              {firstname} {lastname}
            </h5>
          </div>
          <Divider />
          <div className='menuHeader'>{children}</div>
        </Paper>
      </div>
    </>
  );
}
