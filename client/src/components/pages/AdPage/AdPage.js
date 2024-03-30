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
import { IMGS_URL } from '../../../config';

const AdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const adData = useSelector((state) => getAdById(state, id));
  const user = useSelector((state) => state.user);

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
      <Card className='col-6 my-3 p-0 mx-auto  mb-4  border-0'>
        <Card.Img variant='top' src={IMGS_URL + adData.image} />
        <Card.Body>
          <Card.Title className='text-center'>{adData.title}</Card.Title>
          <Card.Text>
            <strong>Content:</strong>
            {adData.content}
          </Card.Text>
          <Card.Text>
            <strong>Published:</strong> {adData.publishDate}
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> {adData.price} $
          </Card.Text>
          <Card.Text>
            <strong>Location:</strong> {adData.location}
          </Card.Text>
          <Card.Text>
            <strong>Seller:</strong> {adData.seller}
          </Card.Text>
          {user && user.login === adData.seller && (
            <Card.Text>
              <Button
                variant='outline-info'
                as={Link}
                to={`/ad/edit/${adData._id}`}
                className='m-1'
              >
                Edit
              </Button>
              <Button
                variant='outline-danger'
                className='m-1'
                onClick={handleShow}
              >
                Delete
              </Button>
            </Card.Text>
          )}
        </Card.Body>
      </Card>

      {/* {user && user.login === adData.seller && (
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
      )} */}
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
