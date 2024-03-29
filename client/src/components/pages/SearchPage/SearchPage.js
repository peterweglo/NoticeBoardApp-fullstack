import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAdsRequest } from '../../../redux/adsRedux';
import { getAllAds } from '../../../redux/adsRedux';
import SingleAd from '../../features/SingleAd/SingleAd';
import { Spinner } from 'react-bootstrap';

const SearchPage = () => {
  const { searchPhrase } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const ads = useSelector(getAllAds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ads.length === 0) {
      dispatch(loadAdsRequest())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, ads]);

  useEffect(() => {
    const filteredAds = ads.filter((ad) =>
      ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
    );
    setData(filteredAds);
  }, [ads, searchPhrase]);

  return (
    <div>
      {loading && <Spinner animation='border' role='status'></Spinner>}
      {!loading && (
        <div>
          <h2>Searched adds</h2>
          <Row className='justify-content-between'>
            {data.map((ad) => (
              <Col key={ad._id} xs='12' md='6' lg='4' className='mb-4'>
                <SingleAd key={ad._id} {...ad} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
