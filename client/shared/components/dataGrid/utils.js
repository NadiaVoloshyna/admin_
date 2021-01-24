import React from 'react';
import Badge from 'react-bootstrap/Badge';
import format from 'date-fns/format';
import Avatar from 'shared/components/avatar';
import TextFormatter from './formatters/text';

const statuses = {
  NEW: {
    variant: 'info',
    displayName: 'New'
  },
  IN_PROGRESS: {
    variant: 'secondary',
    displayName: 'In progress',
  },
  IN_REVIEW: {
    variant: 'yellow',
    displayName: 'In review',
  },
  READY: {
    variant: 'warning',
    displayName: 'Ready',
  },
  PUBLISHED: {
    variant: 'primary',
    displayName: 'Published',
  },
};

export const settingsFormatter = () => (
  <div style={{ color: '#A5A5A5' }}>
    <i className="material-icons">settings</i>
  </div>
);

export const dateFormatter = (cell) => {
  return format(new Date(cell), 'd MMM, yyyy');
};

export const sortedHeaderFormatter = (column) => (
  <div className="d-flex align-items-center">
    { column.text }
    <i className="material-icons">sort</i>
  </div>
);

export const statusFormatter = (cell) => {
  const variant = cell ? 'primary' : 'gray';
  const text = cell ? 'Active' : 'Blocked';
  const className = cell ? '' : 'text-body';
  return <Badge variant={variant} className={className}>{ text }</Badge>;
};

export const badgeFormatter = (cell) => {
  const status = statuses[cell];

  return <Badge variant={status.variant}>{ status.displayName }</Badge>;
};

export const textFormatter = (text) => {
  if (!text) return null;
  return <TextFormatter text={text} />;
};

export const professionsFormatter = (cell) => {
  const professions = cell.map(item => item.profession.name);
  return (
    <div>
      { professions.join(',') }
    </div>
  );
};

export const usersFormatter = (cell) => {
  const users = cell.map(item => item.name);
  return (
    <div>
      { users.map(item => (
        <div key={item}>{item} <br /></div>
      )) }
    </div>
  );
};

export const userFormatter = (name, cell) => {
  return (
    <div className="d-flex align-items-center">
      <Avatar
        size="sm"
        image={cell.image}
        className="mr-3"
      />
      <div>{name}</div>
    </div>
  );
};

// eslint-disable-next-line
export const checkboxRenderer = ({ mode, ...rest }) => (
  <>
    <input type={ mode } { ...rest } />
    <label />
  </>
);

export const sortingConfig = {
  headerFormatter: sortedHeaderFormatter,
  headerSortingClasses: 'active',
};
