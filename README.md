# ctrlsensorsAPI
API Nodejs cho dự án đọc dữ liệu và điều khiển relay thông qua esp8266, PostgreSQL.

//https://ctrlsensors-api.herokuapp.com/data/new/:deviceid : lấy dữ liệu cảm biến mới nhất của một thiết bị          GET
//https://ctrlsensors-api.herokuapp.com/datas/temperature/:deviceid: lấy 360 dữ liệu cảm biến nhiệt độ mới nhất của một thiết bị.   GET
//https://ctrlsensors-api.herokuapp.com/datas/humidity/:deviceid: lấy 360 dữ liệu cảm biến độ ẩm mới nhất của một thiết bị.    GET
//https://ctrlsensors-api.herokuapp.com/datas/light/:deviceid: lấy 360 dữ liệu cảm biến ánh sáng mới nhất của một thiết bị.     GET

//https://ctrlsensors-api.herokuapp.com/device/control/123456789 : lấy dữ liệu điều khiển của một thiết bị    GET
//https://ctrlsensors-api.herokuapp.com/data/sent : gửi một dữ liệu mới lên bảng dữ liệu sensors               PoRT
//https://ctrlsensors-api.herokuapp.com/device/create : create một thiết bị mới vào devices table               PORT
//https://ctrlsensors-api.herokuapp.com/device/control/123456789 : update dữ liệu điều khiển của một thiết bị     PORT
