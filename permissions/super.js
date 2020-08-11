module.exports = [
  { role: 'super', resource: 'person', action: 'create:own' },
  { role: 'super', resource: 'person', action: 'delete:any' },
  { role: 'super', resource: 'person', action: 'update:any' },
  { role: 'super', resource: 'person', action: 'read:any' },

  { role: 'super', resource: 'persons', action: 'read:any' },

  { role: 'super', resource: 'person-assignUser', action: 'create:any' },

  { role: 'super', resource: 'assets', action: 'delete:any' },

  { role: 'super', resource: 'document', action: 'create:any' },
  { role: 'super', resource: 'document', action: 'read:any' },
  { role: 'super', resource: 'document', action: 'update:any' },
  { role: 'super', resource: 'document', action: 'delete:any' },

  { role: 'super', resource: 'inviteAuthor', action: 'create:any' },

  { role: 'super', resource: 'inviteWriter', action: 'create:any' },

  {
    role: 'super',
    resource: 'changeStatus',
    action: 'create:any',
    attributes: [ 'NEW', 'IN_PROGRESS', 'IN_REVIEW', 'READY', 'PUBLISHED' ]
  },
];
