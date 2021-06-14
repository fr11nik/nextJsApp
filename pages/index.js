import MainLayout from '../components/Layouts/MainLayout';
import Link from '@material-ui/core/Link';
import MainPageLayout from '../components/Layouts/MainPageLayout';
import Button from '@material-ui/core/Button';
import {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

const MainPage = props => {
  useEffect(() => {
    document.title = 'РЕСОТСТРОЙ';
  });
  return (
    <MainLayout mainPageRoles={props.mainPageRoles}>
      <MainPageLayout>
        <div style={{display: 'flex'}}>
          <div style={{display: 'flex', float: 'left'}}>
            <Card style={{width: 'max-content !important'}}>
              <div>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2236.20792644108!2d37.746003316050995!3d55.91109498723965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b5319939e93b73%3A0xfaa0318cac139e31!2z0KjQsNGA0LDQv9C-0LLRgdC60LDRjyDRg9C7LiwgMSwg0JzRi9GC0LjRidC4LCDQnNC-0YHQutC-0LLRgdC60LDRjyDQvtCx0LsuLCAxNDEwMDI!5e0!3m2!1sru!2sru!4v1623667405015!5m2!1sru!2sru'
                  width='600'
                  height='450'
                  allowfullscreen=''
                  loading='lazy'
                  style={{border: 'none'}}
                ></iframe>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    РЕСОТСТРОЙ
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    Город: Мытищи Улица: Шараповская, дом:1, офис:29
                  </Typography>
                </CardContent>
              </div>
              <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Button
                  size='small'
                  style={{width: '100%'}}
                  color='primary'
                  onClick={() => {
                    window.location.href =
                      'https://www.google.ru/maps/place/%D0%A8%D0%B0%D1%80%D0%B0%D0%BF%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D1%83%D0%BB.,+1,+%D0%9C%D1%8B%D1%82%D0%B8%D1%89%D0%B8,+%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB.,+141002/@55.911095,37.7460033,17z/data=!3m1!4b1!4m5!3m4!1s0x46b5319939e93b73:0xfaa0318cac139e31!8m2!3d55.911092!4d37.748192?hl=ru';
                  }}
                >
                  Перейти на карты
                </Button>
              </CardActions>
            </Card>
          </div>
          <span align='justify' style={{padding: '0 20px'}} className='SWFGSF'>
            Общество с ограниченной ответственностью «РЕСОТСТРОЙ» (ООО «РЕСОТСТРОЙ»)
            занимается строительством, прокладкой, реконструкцией, ремонтом и
            обслуживанием кабельных линий и коммуникаций.
            <br /> Данный вид услуг пользуется спросом у других организаций, что
            делает этот бизнес прибыльным. Организация ООО «РЕСОТСТРОЙ» расположена
            по адресу Московская область, город Мытищи, улица Шараповская, дом1, офис
            29. Основная услуга, оказываемая организацией – строительство кабельных
            линий и трубных канализаций, устройство и прокладка кабелей в траншее,
            пуско-наладочные работы. Так же производится выполнение аварийного
            ремонта кабельных линий и обслуживание кабельных линий. Главной целью ООО
            «РЕСОРТСТРОЙ» является получение прибыли от оказания услуг по работе с
            кабельными линиями. Миссия данной организации – производство качественных
            работ по строительству и обслуживанию кабельных линий и коммуникаций. ООО
            «РЕСОРТСТРОЙ» небольшая организация. Число сотрудников в офисе
            насчитывает 8-10 человек и две бригады по 7 человек в каждой, которые
            осуществляют работы непосредственно на строительной площадке.
          </span>
        </div>
      </MainPageLayout>
    </MainLayout>
  );
};
export default MainPage;
MainPage.getInitialProps = async ({req}) => {
  const res = await (
    await fetch('https://resotstroy-api.herokuapp.com/api/user/roles', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': req.cookies.jwt,
      },
    })
  ).json();

  return {
    mainPageRoles: res,
  };
};
