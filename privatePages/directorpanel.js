import dynamic from 'next/dynamic';
import {useState} from 'react';
import DirectorMenuController from '../components/Items/Menus/DirectorMenuController';
import MenuLayout from '../components/Layouts/MenuLayout';
import TabLayout from '../components/Layouts/TabLayout';
import GetTaskNames from '../private/handles/getTaskNames';
import GetWorkTypeAndUnitsNames from '../private/handles/getUnitsAndWorkTypeNames';

export default function DirectorPanel(props) {
  const [Page, setPage] = useState(null);

  if (sessionStorage.getItem('tasksList') == null) {
    GetTaskNames().then(tasksList => {
      sessionStorage.setItem('tasksList', JSON.stringify(tasksList));
    });
    GetWorkTypeAndUnitsNames().then(workTypeAndUnits => {
      console.log(workTypeAndUnits);
      sessionStorage.setItem(
        'workTypeList',
        JSON.stringify(workTypeAndUnits.workTypes),
      );
      sessionStorage.setItem('unitsList', JSON.stringify(workTypeAndUnits.units));
    });
  }
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
          <DirectorMenuController
            loadComponent={loadComponent}
          ></DirectorMenuController>
        </MenuLayout>
        <TabLayout>{Page && <Page />}</TabLayout>
      </div>
    </div>
  );
}
