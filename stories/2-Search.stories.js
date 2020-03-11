import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

export default {
  title: 'Search',
  component: Button,
};

const CustomToggle = React.forwardRef(({ onChange, onClick, value }, ref) => (
  <FormControl
    type="text"
    ref={ref}
    value={value}
    onClick={onClick}
    onChange={onChange}
  />
));

const Search = (props) => {
  const [ query, setQuery ] = useState('');

  const onSearch = (key) => {
    props.onSearch(query, key);
    setQuery('');
  }

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }

  return (
    <Dropdown className="suggested-search">
      <Dropdown.Toggle as={CustomToggle} onChange={onChange} value={query} />

      <Dropdown.Menu>
        <Dropdown.Item 
          eventKey="1"
          disabled={!query}
          onSelect={onSearch}
        >Search in currect folder</Dropdown.Item>
        <Dropdown.Item 
          eventKey="2"
          disabled={!query}
          onSelect={onSearch}
        >Search in whole library</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export const ConditionalSearch = () => {
  const onSearch = (term, location) => {
    alert(`Search ${term} term in ${location} location`);
  }

  return (
    <Search onSearch={onSearch} />
  )
}