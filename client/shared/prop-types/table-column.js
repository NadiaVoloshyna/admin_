import { string, bool, func } from 'prop-types';

export const TableColumnType = {
  dataField: string.isRequired,
  text: string.isRequired,
  searchable: bool,
  editable: bool,
  formatter: func
};
