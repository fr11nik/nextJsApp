import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import Link from 'next/Link';
import {Button} from '@material-ui/core'
export default function MainPage() {
  return (
    <MainLayout>
      <Link href='/auth'>
        <Button>Auth</Button>
      </Link>
      <Link href='/another'>
        <Button>Another page</Button>
      </Link>
    </MainLayout>
  );
}
