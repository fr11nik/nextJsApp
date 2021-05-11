import Button from '@material-ui/core/Button';

export default function ErrorContainer(props) {
  const onReload = () => {
    document.location.reload();
  };
  return (
    <>
      <div className='error-container'>
        <div className='error-code'>{props.errorcode}</div>
        <div className='error-description '>
          <span>Ой что-то пошло не так.</span>
          <span>{props.messageError}</span>
        </div>
        <Button onClick={onReload} className='error-button'>
          Обновить страницу
        </Button>
        <div className="error-desc">{props.errordescription}</div>
      </div>
    </>
  );
}
