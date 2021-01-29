export default [{
  dataField: 'fullName',
  text: 'Name',
  editable: false,
  sort: true,
  formatter: 'user',
}, {
  dataField: 'role',
  text: 'Role',
  editable: false,
  sort: true,
}, {
  dataField: 'email',
  text: 'Email',
  editable: false,
  sort: true,
}, {
  dataField: 'created',
  text: 'Date of creation',
  editable: false,
  sort: true,
  formatter: 'date',
}, {
  dataField: 'active',
  text: 'Status',
  editable: false,
  formatter: 'status',
}, {
  dataField: '',
  text: '',
  isDummyField: true,
  formatter: 'settings',
}];
