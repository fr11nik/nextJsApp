import React from 'react';
import Link from 'next/Link';

export default function Logo(props) {
  const preventDefault = event => event.preventDefault();
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
