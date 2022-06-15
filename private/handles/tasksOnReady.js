import GetTaskNames from '../handles/getTaskNames';
import GetWorkTypeAndUnitsNames from '../handles/getUnitsAndWorkTypeNames';
export default async function TaskOnReady() {
  const tasksList = sessionStorage.getItem('tasksList');
  const unitsList = sessionStorage.getItem('unitsList');
  const workTypeLists = sessionStorage.getItem('workTypeList');
  if (tasksList == null || tasksList == 'undefined') {
    const tasksList = await GetTaskNames();
    sessionStorage.setItem('tasksList', JSON.stringify(tasksList));
  }
  if (unitsList == null || workTypeLists == null || unitsList == 'undefined') {
    GetWorkTypeAndUnitsNames().then(workTypeAndUnits => {
      sessionStorage.setItem(
        'workTypeList',
        JSON.stringify(workTypeAndUnits.workTypes),
      );
      sessionStorage.setItem('unitsList', JSON.stringify(workTypeAndUnits.units));
    });
  }
}