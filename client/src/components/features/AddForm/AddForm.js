import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AddForm = (props) => {
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [price, setPrice] = useState(props.price || '');
  const [publishDate, setPublishDate] = useState(new Date());
  const [location, setLocation] = useState(props.location || '');
  const [image, setImage] = useState(props.price || null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    if (user === null) {
      setStatus('loginError');
    } else {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('content', content);
      fd.append('price', price);
      fd.append('location', location);
      fd.append('image', image);
      fd.append('seller', user.login);
      fd.append('publishDate', publishDate);

      const options = {
        method: props._id ? 'PUT' : 'POST',
        credentials: 'include',
        body: fd,
      };

      const url = props._id
        ? `${API_URL}/api/ads/${props._id}`
        : `${API_URL}/api/ads`;

      setStatus('loading');
      fetch(url, options)
        .then((res) => {
          if (res.status === 200) {
            setStatus('success');
            navigate('/');
          } else if (res.status === 400) {
            setStatus('clientError');
          } else if (res.status === 401) {
            setStatus('loginError');
          } else {
            setStatus('serverError');
          }
        })
        .catch((err) => {
          console.error('Error fetching data:', err.message);
          setStatus('serverError');
        });
    }
  };

  return (
    <div style={{ width: '60%' }} className='m-auto'>
      <Form onSubmit={validate(handleSubmit)}>
        {status === 'success' && (
          <Alert variant='success'>
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been added the advert</p>
          </Alert>
        )}

        {status === 'serverError' && (
          <Alert variant='danger'>
            <Alert.Heading>Something went wrong!</Alert.Heading>
            <p>Unexpected error please try again</p>
          </Alert>
        )}

        {status === 'clientError' && (
          <Alert variant='danger'>
            <Alert.Heading>Not enough data</Alert.Heading>
            <p>You have to fill all the fields</p>
          </Alert>
        )}

        {status === 'loginError' && (
          <Alert variant='warning'>
            <Alert.Heading>You must be logged</Alert.Heading>
            <p>You have to login first</p>
          </Alert>
        )}

        {status === 'loading' && (
          <Spinner animation='border' role='status'></Spinner>
        )}

        <Form.Group className='mb-4'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            {...register('title', {
              required: 'Title is required.',
              minLength: {
                value: 10,
                message: 'Title is too short (min is 10).',
              },
              maxLength: {
                value: 50,
                message: 'Title is too long (max is 50).',
              },
            })}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isInvalid={errors.title}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label>Content of the ad</Form.Label>
          <Form.Control
            as='textarea'
            {...register('content', {
              required: 'Content is required.',
              minLength: {
                value: 20,
                message: 'Content is too short (min is 20).',
              },
              maxLength: {
                value: 1000,
                message: 'Content is too long (max is 1000).',
              },
            })}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            isInvalid={errors.content}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.content?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label>Published date</Form.Label>
          <DatePicker
            selected={publishDate}
            onChange={(date) => setPublishDate(date)}
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type='file'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button variant='success' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddForm;
