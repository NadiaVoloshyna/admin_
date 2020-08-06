module.exports = [
  { role: 'admin', resource: 'person', action: 'create:own' },
  { role: 'admin', resource: 'person', action: 'read:any' },
  { role: 'admin', resource: 'person', action: 'delete:any' },

  { role: 'admin', resource: 'person-assignUser', action: 'create:any' },

  { role: 'admin', resource: 'persons', action: 'read:any' },

  { role: 'admin', resource: 'assets', action: 'delete:any' },

  { role: 'admin', resource: 'document', action: 'create:any' },
  { role: 'admin', resource: 'document', action: 'read:any' },
  { role: 'admin', resource: 'document', action: 'update:any' },

  { role: 'admin', resource: 'inviteAuthor', action: 'create:any' },

  { role: 'admin', resource: 'inviteWriter', action: 'create:any' },

  { role: 'admin', resource: 'changeStatus', action: 'create:any', attributes: ['NEW', 'IN_PROGRESS', 'IN_REVIEW', 'READY'] },
];
