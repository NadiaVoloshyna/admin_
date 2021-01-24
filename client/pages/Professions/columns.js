export default [{
  dataField: 'name',
  text: 'Title',
  editable: false,
  sort: true,
}, {
  dataField: 'description',
  text: 'Description',
  editable: false,
  sort: true,
  formatter: 'text'
}, {
  dataField: 'createdBy',
  text: 'Created by',
  editable: false,
  sort: true,
  formatter: 'user'
}, {
  dataField: 'created',
  text: 'Date of creation',
  editable: false,
  sort: true,
  formatter: 'date',
}, {
  dataField: '',
  text: '',
  isDummyField: true,
  formatter: 'settings',
}];
