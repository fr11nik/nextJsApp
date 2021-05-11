import AddField from '../../components/Items/Tabs/Director/addField';
import DirectorLayout from '../../components/Layouts/DirectorLayout';
import WindowLayout from '../../components/Layouts/WindowLayout';
import WithAuth from '../../utils/WithAuth';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
const b = props => {
  return (
    <DirectorLayout {...props}>
      <div style={{marginTop: '35px'}}>
        <AddField
          fieldName='unitName'
          link='unit'
          title='Добавить единицу измерения'
          fieldDescription='Единица измерения'
          buttonText='создать'
        ></AddField>
        <AddField
          fieldName='typeName'
          link='worktype'
          title='Добавить вид работы'
          fieldDescription='Наименование'
          buttonText='создать'
        ></AddField>
        <AddField
          fieldName='scheduleName'
          link='workschedule'
          title='Добавить график'
          fieldDescription='Наименование графика'
          buttonText='создать'
        ></AddField>
      </div>
    </DirectorLayout>
  );
};
export default WithAuth(b, 'director');
