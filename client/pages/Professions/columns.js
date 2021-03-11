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
  headerAttrs: {
    hidden: false,
  },
}, {
  dataField: 'createdBy',
  text: 'Created by',
  editable: false,
  sort: true,
  formatter: 'users',
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
  dataField: '',
  text: '',
  isDummyField: true,
  formatter: 'settings',
  headerAttrs: {
    hidden: false,
  },
}];
