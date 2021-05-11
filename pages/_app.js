import App from 'next/app';

import '../styles/MainLogo.css';
import '../styles/Header.css';
import '../styles/globals.css';
import '../styles/Auth.css';
import '../styles/ErrorPage.css';
import '../styles/Menu.css';
import '../styles/WorkTable.css';
import MainLayout from '../components/Layouts/MainLayout';

export default App;
function MyApp({Component, pageProps}) {
  return (
    <MainLayout>
      <Component {...pageProps}></Component>
    </MainLayout>
  );
}
