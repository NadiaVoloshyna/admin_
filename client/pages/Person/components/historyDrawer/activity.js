import React, { useState } from 'react';
import { shape, object } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import format from 'date-fns/format';
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';

const Activity = (props) => {
  const { activity } = props;
  const { createdAt, message } = activity;
  const hasContent = !!activity.content;
  const content = hasContent && JSON.parse(activity.content);

  const [open, setOpen] = useState(false);

  return (
    <ListGroup.Item className="rounded-0">
      <div className="d-flex justify-content-between">
        <div>
          <h5>&nbsp;</h5>
          {/* eslint-disable-next-line */}
          <p dangerouslySetInnerHTML={{__html: message }} />
        </div>
        <div className="text-right">
          <p>
            <small>{ format(new Date(createdAt), 'LLL dd') }</small>
          </p>
          { hasContent && (
            <FontAwesomeIcon
              icon="sort-down"
              size="lg"
              className="cur-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
      </div>
      { hasContent && (
        <Collapse in={open}>
          <div className="border bg-light p-2">
            { content.map(item => (
              <div className="mb-3">
                <p><b>{ item.key }</b></p>
                <div>from: { JSON.stringify(item.from) }</div>
                <div>to: { JSON.stringify(item.to) }</div>
              </div>
            )) }
          </div>
        </Collapse>
      )}
    </ListGroup.Item>
  );
};

Activity.propTypes = {
  activity: shape(object).isRequired,
};

export default Activity;
