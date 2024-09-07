export function trimFormData(data) {
  try {
    if (typeof data === 'object' && data !== null) {
      const res = {}
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
          res[key] = value.trim()
        } else {
          res[key] = value
        }
      }
      return res
    }
  } catch (error) {}
}
export function GetTimeStamp() {
  // 2020 01 01 12 00 00
  // 2021 07 09 11 54 33
  // year:month:date:min:sec
  const date = new Date(Date.now())
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconds = date.getSeconds()
  const timestamp = `${year}${month}${day}${hour}${minute}${seconds}`
  return timestamp
}
export function getOrderStatus() {
  const orderStatusList = [
    { value: '101', label: 'Initial Order Payment and Sent to Merchant' },
    { value: '102', label: 'Merchant Accepted and Product Ready Pick Up' },
    { value: '103', label: 'WareHouse Assigns Messenger for Product Pickup at Merchant' },
    { value: '104', label: 'WareHouse Assigns Messenger for Product Pickup at WareHouse' },
    { value: '105', label: 'Messenger Receives Product from Merchant to WareHouse' },
    { value: '106', label: 'Messenger Receives Product from Merchant to Customer' },
    { value: '107', label: 'Messenger Receives Product from WareHouse to Customer' },
    { value: '108', label: 'WareHouse Sending Item to Another WareHouse' },
    { value: '500', label: 'Item Delivery Completed' }
  ]
  return orderStatusList
}
