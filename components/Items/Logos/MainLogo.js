import React from 'react';
import Link from '@material-ui/core/Link';

export default function Logo(props) {
  const [openDialog, setDialog] = React.useState(false);

  return (
    <>
      <Link href='/' className='logo'>
        <div className='logo-wrapper'>
          <a className='mainlogo'>{props.text}</a>
        </div>
      </Link>
      
    </>
  );
}
