import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getAdById,
  removeAdRequest,
  loadAdsRequest,
} from '../../../redux/adsRedux';
import { Navigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

const AdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const adData = useSelector((state) => getAdById(state, id));

  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(loadAdsRequest());
      setIsLoading(false);
    };

    loadData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!adData) {
    return <Navigate to='/' />;
  }

  const handleRemove = async () => {
    await dispatch(removeAdRequest(id));
    navigate('/');
  };
  if (!adData) return <Navigate to='/' />;

  return (
    <main className='d-flex justify-content-center'>
      <div className='pe-5 me-5'>
        <Card className='mb-4 border border-0'>
          <Card.Img
            className='width: 18rem;'
            variant='top'
            src={
              'https://cdn.pixabay.com/photo/2024/02/25/13/30/coffee-8595772_1280.jpg'
            }
          />
          <Card.Body>
            <Card.Title>{adData.title}</Card.Title>
            <Card.Text>
              <strong>content:</strong> {adData.content}
            </Card.Text>
            <Card.Text>
              <strong>Published:</strong> {adData.publishDate}
            </Card.Text>
            <Card.Text>
              <strong>Price:</strong> {adData.price} $
            </Card.Text>
            <Card.Text>
              <strong>location:</strong> {adData.location}
            </Card.Text>
            <Card.Text>
              <strong>Seller:</strong> {adData.seller}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className='ps-5 ms-5'>
        <Button
          variant='outline-info'
          as={Link}
          to={`/ad/edit/${adData._id}`}
          className='m-1'
        >
          Edit
        </Button>
        <Button variant='outline-danger' className='m-1' onClick={handleShow}>
          Delete
        </Button>
      </div>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              This operation will completely remove this ad from the app!
              <br />
              Are you sure you want to do that?
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='danger' onClick={handleRemove}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
};

export default AdPage;
