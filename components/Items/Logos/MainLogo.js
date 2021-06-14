import React from 'react';
import Link from '@material-ui/core/Link';
import PrefabDialog from '../../Dialog/dialogPrefabRickRoll';
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
export default function Logo(props) {
  var rickRollInt = getRandomInt(1, 25);
  const preventDefault = event => event.preventDefault();
  const aboba = (
    <iframe
      width='560'
      height='315'
      src='http://www.youtube.com/embed/oHg5SJYRHA0?autoplay=1'
      title='НЕВЕР ГОНА ГИВ ЙУ АП'
      frameborder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowfullscreen
    ></iframe>
  );
  const [openDialog, setDialog] = React.useState(false);
  const [prefab, setPrefab] = React.useState(
    <PrefabDialog
      title='Ваш виндовс был взломан ДИПЛОМА НЕ БУДЕТ'
      description={' '}
      buttonAcceptText='Невер гонна гив йу ап '
      handle={() => {}}
      openDialog={openDialog}
      setDialog={setDialog}
      additionalComponents={aboba}
    />,
  );

  return (
    <>
      <Link
        onClick={() => {
          if (rickRollInt == 1) {
            setPrefab(
              <PrefabDialog
                title='Ваш виндовс был взломан ДИПЛОМА НЕ БУДЕТ'
                description={'Плоти нолог'}
                buttonAcceptText='Невер гонна гив йу ап '
                handle={() => {}}
                openDialog={openDialog}
                setDialog={setDialog}
                additionalComponents={aboba}
              />,
            );
            setDialog(true);
          } else {
            window.location.href = 'https://resotstroy.herokuapp.com/';
          }
          rickRollInt = getRandomInt(1, 25);
        }}
        className='logo'
      >
        <div className='logo-wrapper'>
          <a className='mainlogo'>{props.text}</a>
        </div>
      </Link>
      {prefab}
    </>
  );
}
