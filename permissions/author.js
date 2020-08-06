module.exports = [
  { role: 'author', resource: 'person', action: 'create:own' },
  { role: 'author', resource: 'person', action: 'delete:own' },
  { role: 'author', resource: 'person', action: 'update:own' },
  { role: 'author', resource: 'person', action: 'read:any' },

  { role: 'author', resource: 'persons', action: 'read:any' },

  { role: 'author', resource: 'changeStatus', action: 'create:any', attributes: ['NEW', 'IN_PROGRESS'] },
];
