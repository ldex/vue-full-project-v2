import moment from 'moment'

export default (value, param) => {
  if (value) {
    return moment(String(value)).format(param)
  }
}