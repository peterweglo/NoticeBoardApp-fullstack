import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const SingleAd = (props) => {
  const navigate = useNavigate();

  return (
    <Card className='mb-3'>
      <Card.Img
        className='width: 18rem;'
        variant='top'
        src={
          'https://pixabay.com/get/ge892d1d0c10ded82012111c2e18b43d4ec9c80fe8be3d187f14984b954f81dbcd297a229a1b2d9de7ab435700521b9e890863056ba872112eccd79d0e6b8164ca03761bf224beb94cffc54bf1dd4d616_640.jpg'
        }
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.location}</Card.Text>

        <Button variant='primary' onClick={() => navigate(`/ad/${props._id}`)}>
          Read more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleAd;
