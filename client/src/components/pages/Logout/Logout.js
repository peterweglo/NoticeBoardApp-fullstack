import { API_URL } from '../../../config';
import { logOut } from '../../../redux/userRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Row, Col } from 'react-bootstrap';

const Logout = () => {
  const dispatch = useDispatch(logOut());
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };
    fetch(`${API_URL}/auth/logout`, options).then(() => dispatch(logOut()));
    setTimeout(() => {
      navigate('/');
    }, 1500);
  }, [dispatch]);

  return (
    <Row className='justify-content-md-center'>
      <Col xs={12} md={6}>
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully logged out!</p>
        </Alert>
      </Col>
    </Row>
  );
};
export default Logout;
