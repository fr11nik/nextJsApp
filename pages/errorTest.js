import MainLayout from '../components/Layouts/MainLayout';
import ErrorContainer from '../components/Items/Error/BasicError/ErrorContainer';
import ErrorImageContainer from '../components/Items/Error/BasicError/ErrorImage';
export default ErrorDefault => {
  console.log('Error-code 404');
  console.log('Error message:jwt-error-example');
  return (
    <MainLayout>
      <div className='error-flex-container'>
        <div className='left-container'>
         <ErrorContainer errordescription={'JWT-ERROR'} errorcode = {504}></ErrorContainer>
        </div>
        <div className='right-container'>
         <ErrorImageContainer></ErrorImageContainer>
        </div>
      </div>
    </MainLayout>
  );
};
