export default [{
  dataField: 'fullName',
  text: 'Name',
  editable: false,
  sort: true,
  formatter: 'users',
}, {
  dataField: 'role',
  text: 'Role',
  editable: false,
  sort: true,
  hideHeadingOnSelect: true,
}, {
  dataField: 'email',
  text: 'Email',
  editable: false,
  sort: true,
  hideHeadingOnSelect: true,
}, {
  dataField: 'created',
  text: 'Date of creation',
  editable: false,
  sort: true,
  formatter: 'date',
  hideHeadingOnSelect: true,
}, {
  dataField: 'active',
  text: 'Status',
  editable: false,
  formatter: 'status',
  hideHeadingOnSelect: true,
}, {
  dataField: '',
  text: '',
  isDummyField: true,
  formatter: 'settings',
  hideHeadingOnSelect: true,
}];
