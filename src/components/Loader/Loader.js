import { Audio } from 'react-loader-spinner'
import { Container } from './Loader.styled'; 

const Loader = () => {
  return (
    <Container>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="gray"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
/>
    </Container>
  );
};

export default Loader;

    
