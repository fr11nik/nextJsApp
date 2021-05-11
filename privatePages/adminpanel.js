import dynamic from 'next/dynamic';
import {useState} from 'react';
import AdminMenuController from '../components/Items/Menus/AdminMenuController';
import MenuLayout from '../components/Layouts/MenuLayout';

import TabLayout from '../components/Layouts/TabLayout';

export default function AdminPanel(props) {
  const [Page, setPage] = useState(null);
  const loadComponent = module => {
    setPage(
      dynamic(() =>
        module.catch(err => {
          return () => <div>Error Not Found</div>;
        }),
      ),
    );
  
  };
  return (
    <div>
      <div className='pageAdmin'>       
        <MenuLayout {...props}>
          <AdminMenuController loadComponent={loadComponent}></AdminMenuController>
        </MenuLayout>
        <TabLayout>{Page && <Page />}</TabLayout>
      </div>
    </div>
  );
}
AdminPanel.getInitialProps;
