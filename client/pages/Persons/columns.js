export default [{
  dataField: 'name',
  text: 'Title',
  formatter: 'link', // TODO: figure out link url
  editable: false,
  sort: true,
}, {
  dataField: 'professions',
  text: 'Professions',
  editable: false,
  formatter: 'professions',
}, {
  dataField: 'authors',
  text: 'Authors',
  editable: false,
  formatter: 'users',
}, {
  dataField: 'reviewers',
  text: 'Editors',
  editable: false,
  formatter: 'users',
}, {
  dataField: 'created',
  text: 'Created',
  editable: false,
  formatter: 'date',
  sort: true,
}, {
  dataField: 'status',
  text: 'Status',
  editable: false,
  formatter: 'badge',
  sort: true,
}, {
  text: '',
  isDummyField: true,
  formatter: 'settings',
}];