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
}, {
  dataField: 'created',
  text: 'Date of creation',
  editable: false,
  sort: true,
  formatter: 'date',
}, {
  text: '',
  isDummyField: true,
  formatter: 'settings',
}];
