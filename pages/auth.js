import MainLayout from '../components/Layouts/MainLayout';
import React, {useState} from 'react';
import {SignIn} from '../private/queries';
import LoginForm from '../components/FullComponents/LoginForm';


export default function Auth() {
  return (
    <MainLayout>
      <LoginForm/>
    </MainLayout>
  );
}

