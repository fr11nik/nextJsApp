import ErrorContainer from '../BasicError/ErrorContainer';
import ErrorImageContainer from '../BasicError/ErrorImage';
export default function ErrorDefault(props) {
  var errorMessage = 'Попробуйте перезагрузить страницу.';
  if (props.message.statement.startsWith('Require')) {
    errorMessage = 'Ошибка доступа.';
  }
  return (
    <div className='error-flex-container'>
      <div className='left-container'>
        <ErrorContainer
          messageError={errorMessage}
          errordescription={props.message.statement}
          errorcode={props.message.code}
        ></ErrorContainer>
      </div>
      <div className='right-container'>
        <ErrorImageContainer></ErrorImageContainer>
      </div>
    </div>
  );
}
