import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

const CustomToggle = React.forwardRef(({ onChange, onClick, value }, ref) => (
  <FormControl
    type="text"
    ref={ref}
    value={value}
    onClick={onClick}
    onChange={onChange}
  />
));

const ConditionalSearch = (props) => {
  const [ query, setQuery ] = useState('');

  const onSearch = (key) => {
    props.onSearch(query, key);
    setQuery('');
  };

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <>
      <InputGroup className="mb-3 flex-nowrap">
        <InputGroup.Prepend>
          <InputGroup.Text>
            Search
          </InputGroup.Text>
        </InputGroup.Prepend>
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
      </InputGroup>

      <style global jsx>{`
        .suggested-search {
          width: 100%;
        }

        .suggested-search .dropdown-menu {
          width: 100%;
          left: 0 !important;
          top: 35px !important;
          transform: none !important;
        }

        .suggested-search .form-control {
          border-radius: 0 4px 4px 0;
        }
      `}</style>
    </>
  );
};

export default ConditionalSearch;
