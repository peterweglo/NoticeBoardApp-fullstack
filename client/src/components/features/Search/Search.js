import React, { useState } from 'react';

import { Button, InputGroup, Form } from 'react-bootstrap';

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSearch = () => {
    window.location.href = `/ad/search/${searchPhrase}`;
  };
  return (
    <div className='d-flex justify-content-between'>
      <div>
        <InputGroup className='mb-3'>
          <Form.Control
            type='text'
            placeholder='search '
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
          <Button variant='primary' onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default Search;
