import List from '../../features/List/List';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Search from '../../features/Search/Search';

const Home = () => {
  return (
    <div>
      <div className='d-flex justify-content-between pb-4'>
        <Search />
        <h1>All Adds</h1>
        <Button variant='outline-info' as={Link} to='/ad/add' className='h-100'>
          Add new ad
        </Button>
      </div>
      <List />
    </div>
  );
};

export default Home;
