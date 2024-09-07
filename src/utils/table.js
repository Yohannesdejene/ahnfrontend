import { slugify_underscore } from './slugify'
import _ from 'lodash'

export function generate_table_columns(column_list) {
  const columns = []
  if (column_list) {
    column_list.map(item => {
      const column_obj = {}
      const label = _.startCase(_.toLower(item))
      column_obj['name'] = item
      column_obj['label'] = label
      column_obj['options'] = {
        filter: true,
        sort: true
      }
      columns.push(column_obj)
    })
  }
  return columns
}

export function get_search_keys(column_list) {
  const columns = []
  if (column_list) {
    column_list.map(item => {
      columns.push(slugify_underscore(item))
    })
  }
  return columns
}

export function generate_table_data(data, columns) {
  const renderCell = (item, column) => {
    return _.get(item, column.field)
  }
  const createKey = (item, column) => {
    return item.id + (column.field || column.key)
  }

  return data.map(item => (
    <tr key={item.id}>
      {columns.map(column => (
        <td key={createKey(item, column)}>{renderCell(item, column)}</td>
      ))}
    </tr>
  ))
}
