import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import styles from './SingleAd.module.scss';

const SingleAd = (props) => {
  const navigate = useNavigate();

  return (
    <Card className={styles.cardContainer}>
      <Card.Img
        className={styles.cardImage}
        variant="top"
        src={IMGS_URL + props.image}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.location}</Card.Text>

        <Button variant="primary" onClick={() => navigate(`/ad/${props._id}`)}>
          Read more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleAd;
