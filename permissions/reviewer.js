module.exports = [
  { role: 'reviewer', resource: 'person', action: 'read:any' },

  { role: 'reviewer', resource: 'persons', action: 'read:any' },

  { role: 'reviewer', resource: 'document', action: 'read:any' },
  { role: 'reviewer', resource: 'document', action: 'update:any' },

  { role: 'reviewer', resource: 'changeStatus', action: 'create:any', attributes: ['IN_REVIEW'] },
];
