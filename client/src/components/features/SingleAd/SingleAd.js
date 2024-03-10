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
          'https://cdn.pixabay.com/photo/2024/02/25/13/30/coffee-8595772_1280.jpg'
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
