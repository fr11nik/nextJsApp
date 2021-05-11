import React from 'react';
import Button from '@material-ui/core/Button';
import MainLayout from '../components/Layouts/MainLayout';
import Link from 'next/Link';

export default function Home({PersonalData}) {
  return (
    <MainLayout>
      <Link>Статистика</Link>
      <Link>Рабочие</Link>
      <Link>Добавить пользователя</Link>
    </MainLayout>
  );
}
