import SingleAd from '../SingleAd/SingleAd';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Row, Col } from 'react-bootstrap';
import { getAllAds, loadAdsRequest } from '../../../redux/adsRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const List = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  return (
    <Row>
      {ads.map((ad) => (
        <Col key={ad._id} xs='12' md='6' lg='4'>
          <SingleAd {...ad} />
        </Col>
      ))}
    </Row>
  );
};

export default List;
