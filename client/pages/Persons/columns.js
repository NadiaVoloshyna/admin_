export default [{
  dataField: 'name',
  text: 'Title',
  editable: false,
  sort: true,
}, {
  dataField: 'professions',
  text: 'Professions',
  editable: false,
  formatter: 'professions',
  headerAttrs: {
    hidden: false,
  },
}, {
  dataField: 'authors',
  text: 'Authors',
  editable: false,
  formatter: 'users',
  headerAttrs: {
    hidden: false,
  },
}, {
  dataField: 'reviewers',
  text: 'Editors',
  editable: false,
  formatter: 'users',
  headerAttrs: {
    hidden: false,
  },
}, {
  dataField: 'created',
  text: 'Created',
  editable: false,
  formatter: 'date',
  sort: true,
  headerAttrs: {
    hidden: false,
  },
}, {
  dataField: 'status',
  text: 'Status',
  editable: false,
  formatter: 'badge',
  sort: true,
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
