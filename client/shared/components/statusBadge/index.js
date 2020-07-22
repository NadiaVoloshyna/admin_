import React from 'react';
import { string } from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import _kebabCase from 'lodash/kebabCase';
import cx from 'classnames';

const StatusBadge = ({ status, className }) => {
  const classNames = cx(
    'status-badge',
    className,
    _kebabCase(status)
  );
  const text = status.replace(/_/g, ' ');

  return (
    <>
      <Badge className={classNames}><small>{ text }</small></Badge>
      <style global jsx>{`
        .status-badge {
          padding: 4px 8px;
          min-width: 100px;
          color: #fff;
          font-weight: normal;
        }

        .status-badge.new {
          background: gray;
        }

        .status-badge.in-progress {
          background: #00BCD4;
        }

        .status-badge.awaits-review {
          background: #FC9FB2;
        }

        .status-badge.in-review {
          background: #FF7E01;
        }

        .status-badge.ready-to-publish {
          background: #E00504;
        }

        .status-badge.published {
          background: #62C461;
        }
      `}</style>
    </>
  );
};

StatusBadge.propTypes = {
  status: string.isRequired,
  className: string
};

StatusBadge.defaultProps = {
  className: ''
};

export default StatusBadge;
