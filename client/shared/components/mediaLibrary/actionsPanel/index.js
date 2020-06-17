import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Select from 'react-select';
import Search from 'shared/components/conditionalSearch';
import { ASSET_TYPES } from 'shared/constants';

const filters = Object.values(ASSET_TYPES).map(item => ({ value: item, label: item }));

const ActionsPanel = () => {
  const onChange = (selected) => {
    console.log(selected);
  };

  const onSearch = (term, location) => {
    console.log(`Search ${term} term in ${location} location`);
  };

  return (
    <Row className="actions-panel">
      <Col>
        <InputGroup className="mb-3 flex-nowrap">
          <InputGroup.Prepend>
            <InputGroup.Text>
              Filter
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Select
            className="w-100"
            isMulti
            options={filters}
            onChange={onChange}
            styles={{
              control: styles => ({ ...styles, borderRadius: '0 4px 4px 0' })
            }}
          />
        </InputGroup>
      </Col>

      <Col>
        <Search onSearch={onSearch} />
      </Col>
    </Row>
  );
};

export default ActionsPanel;
