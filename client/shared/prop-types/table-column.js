import { string, bool } from 'prop-types';

export const TableColumnType = {
  dataField: string.isRequired,
  text: string.isRequired,
  searchable: bool,
  editable: bool,
  formatter: string,
};
