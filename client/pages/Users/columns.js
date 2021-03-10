export default [{
  dataField: 'fullName',
  text: 'Name',
  editable: false,
  sort: true,
  formatter: 'users',
  headerFormatter: 'columnFormatter',
}, {
  dataField: 'role',
  text: 'Role',
  editable: false,
  sort: true,
  headerAttrs: {
    hidden: false,
  },
}, {
  dataField: 'email',
  text: 'Email',
  editable: false,
  sort: true,
  headerAttrs: {
    hidden: false,
  },
}, {
  dataField: 'created',
  text: 'Date of creation',
  editable: false,
  sort: true,
  formatter: 'date',
  headerAttrs: {
    hidden: false,
  },
}, {
  dataField: 'active',
  text: 'Status',
  editable: false,
  formatter: 'status',
  headerAttrs: {
    hidden: false,
  },
}, {
  dataField: '',
  text: '',
  isDummyField: true,
  formatter: 'settings',
  headerAttrs: {
    hidden: false,
  },
}];
