import { useNavigate } from 'react-router-dom';
import AddForm from '../AddForm/AddForm';
import { useDispatch } from 'react-redux';
import { addAd } from '../../../redux/adsRedux';

const AddAdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ad) => {
    dispatch(addAd(ad));
    navigate('/');
  };

  return <AddForm action={handleSubmit} actionText='Add ad' />;
};

export default AddAdForm;
