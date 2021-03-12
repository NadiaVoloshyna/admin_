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
  formatter: 'text',
  hideHeadingOnSelect: true,
}, {
  dataField: 'createdBy',
  text: 'Created by',
  editable: false,
  sort: true,
  formatter: 'users',
  hideHeadingOnSelect: true,
}, {
  dataField: 'created',
  text: 'Date of creation',
  editable: false,
  sort: true,
  formatter: 'date',
  hideHeadingOnSelect: true,
}, {
  dataField: '',
  text: '',
  isDummyField: true,
  formatter: 'settings',
  hideHeadingOnSelect: true,
}];
