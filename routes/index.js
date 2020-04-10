var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  user: "cwviet",
  database: "vn-gems",
  password: "viet8660",
  host: "maindb.cexrfznwa2iv.ap-northeast-2.rds.amazonaws.com",
  port: 5432,
  max: 10,
  idletimeoutMillis: 30000,
};
// var config = {
//   user: "postgres",
//   database: "khanhtu",
//   password: "123456",
//   host: "localhost",
//   port: 5432,
//   max: 10,
//   idletimeoutMillis: 30000,
// };
var pool = new pg.Pool(config);
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
//"start": "node ./bin/www"
 // "start": "nodemon ./bin/www --exec babel-node"
//....................................................lấy tất cả dữ liệu cảm biến của một thiết bị....................................................
router.get("/data/:deviceid", function (req, res, next) {
  const { deviceid } = req.params;
  const text = "SELECT * FROM sensorsdata WHERE deviceid = " + deviceid;
  pool.connect((err, client, done) => {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    client.query(text, (err, result) => {
      done();
      if (err) {
        res.end();
        return console.log("error runing query", err);
      }
      try {
        if (result.rows.length > 0) {
          res.json({
            result: "ok",
            data: result.rows,
            message: "query new sensor data successfully",
          });
        } else {
          res.json({
            result: "failed",
            data: {},
            message: "Cannot find data to show",
          });
        }
      } catch (error) {
        res.json({
          result: "failed",
          data: {},
          message: `query sensor data (by id) failed. Error: ${error}`,
        });
      }
    });
    //res.end();
  });
  //res.render("index", { title: "Express" });
});
//....................................................lấy dữ liệu cảm biến mới nhất của một thiết bị....................................................
router.get("/data/new/:deviceid", function (req, res, next) {
  const { deviceid } = req.params;
  //const text = "SELECT * FROM sensorsdata WHERE deviceid = " + deviceid;
  const text =
    "SELECT * FROM sensorsdata WHERE deviceId = " +
    deviceid +
    " ORDER BY id DESC LIMIT 1";
  pool.connect((err, client, done) => {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    client.query(text, (err, result) => {
      done();
      if (err) {
        res.end();
        return console.log("error runing query", err);
      }
      try {
        if (result.rows.length > 0) {
          res.json({
            result: "ok",
            data: result.rows,
            message: "query new sensor data successfully",
          });
        } else {
          res.json({
            result: "failed",
            data: {},
            message: "Cannot find data to show",
          });
        }
      } catch (error) {
        res.json({
          result: "failed",
          data: {},
          message: `query sensor data (by id) failed. Error: ${error}`,
        });
      }
    });
  });
  //res.render("index", { title: "Express" });
});
//....................................................lấy 360 dữ liệu cảm biến nhiệt độ mới nhất của một thiết bị....................................................
router.get("/datas/temperature/:deviceid", function (req, res, next) {
  const { deviceid } = req.params;
  //const text = "SELECT * FROM sensorsdata WHERE deviceid = " + deviceid;
  const text =
    "SELECT * FROM sensorsdata WHERE deviceId = " +
    deviceid +
    " ORDER BY id DESC LIMIT 360";
  pool.connect((err, client, done) => {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    client.query(text, (err, result) => {
      done();
      if (err) {
        res.end();
        return console.log("error runing query", err);
      }
      try {
        if (result.rows.length > 0) {
          var listDataTemp = [];
            for(let i = 0; i < result.rows.length; i ++){
              listDataTemp.push(result.rows[i].temp);
            }
            listDataTemp.reverse();
            res.json({
              result: "ok",
              data: listDataTemp,
              message: "query new sensor data successfully",
            });
        } else {
          res.json({
            result: "failed",
            data: {},
            message: "Cannot find data to show",
          });
        }
      } catch (error) {
        res.json({
          result: "failed",
          data: {},
          message: `query sensor data (by id) failed. Error: ${error}`,
        });
      }
    });
  });
  //res.render("index", { title: "Express" });
});
//....................................................lấy 360 dữ liệu cảm biến độ ẩm mới nhất của một thiết bị....................................................
router.get("/datas/humidity/:deviceid", function (req, res, next) {
  const { deviceid } = req.params;
  //const text = "SELECT * FROM sensorsdata WHERE deviceid = " + deviceid;
  const text =
    "SELECT * FROM sensorsdata WHERE deviceId = " +
    deviceid +
    " ORDER BY id DESC LIMIT 360";
  pool.connect((err, client, done) => {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    client.query(text, (err, result) => {
      done();
      if (err) {
        res.end();
        return console.log("error runing query", err);
      }
      try {
        if (result.rows.length > 0) {
          var listDataTemp = [];
            for(let i = 0; i < result.rows.length; i ++){
              listDataTemp.push(result.rows[i].humi);
            }
            listDataTemp.reverse();

            res.json({
              result: "ok",
              data: listDataTemp,
              message: "query new sensor data successfully",
            });
        } else {
          res.json({
            result: "failed",
            data: {},
            message: "Cannot find data to show",
          });
        }
      } catch (error) {
        res.json({
          result: "failed",
          data: {},
          message: `query sensor data (by id) failed. Error: ${error}`,
        });
      }
    });
  });
  //res.render("index", { title: "Express" });
});
//....................................................lấy 360 dữ liệu cảm biến nhiệt độ mới nhất của một thiết bị....................................................
router.get("/datas/light/:deviceid", function (req, res, next) {
  const { deviceid } = req.params;
  //const text = "SELECT * FROM sensorsdata WHERE deviceid = " + deviceid;
  const text =
    "SELECT * FROM sensorsdata WHERE deviceId = " +
    deviceid +
    " ORDER BY id DESC LIMIT 360";
  pool.connect((err, client, done) => {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    client.query(text, (err, result) => {
      done();
      if (err) {
        res.end();
        return console.log("error runing query", err);
      }
      try {
        if (result.rows.length > 0) {
          var listDataTemp = [];
            for(let i = 0; i < result.rows.length; i ++){
              listDataTemp.push(result.rows[i].light);
            }
            listDataTemp.reverse();
            res.json({
              result: "ok",
              data: listDataTemp,
              message: "query new sensor data successfully",
            });
        } else {
          res.json({
            result: "failed",
            data: {},
            message: "Cannot find data to show",
          });
        }
      } catch (error) {
        res.json({
          result: "failed",
          data: {},
          message: `query sensor data (by id) failed. Error: ${error}`,
        });
      }
    });
  });
  //res.render("index", { title: "Express" });
});
//....................................................lấy dữ liệu điều khiển của một thiết bị....................................................
router.get("/device/control/:deviceid", function (req, res, next) {
  const { deviceid } = req.params;
  const text = "SELECT * FROM devices WHERE deviceid = " + deviceid;
  // const values = [deviceid];
  pool.connect((err, client, done) => {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    console.log(text);
    client.query(text, (err, result) => {
      done();
      //console.log(text);
      if (err) {
        res.end();
        return console.log("error runing query", err);
      }
      try {
        if (result.rows.length > 0) {
          res.json({
            result: "ok",
            data: result.rows[0],
            message: "query list of Todos successfully",
          });
        } else {
          res.json({
            result: "failed",
            data: {},
            message: "Cannot find Todo to show",
          });
        }
      } catch (error) {
        res.json({
          result: "failed",
          data: {},
          message: `query list of Todos(by id) failed. Error: ${error}`,
        });
      }
    });
  });
  //res.render("index", { title: "Express" });
});
//....................................................gửi một dữ liệu mới lên bảng dữ liệu sensors....................................................
router.post("/data/sent", function (req, res, next) {
  const { deviceid, temp, humi, light } = req.body;
  const text =
    "INSERT INTO sensorsdata(deviceid, temp, humi, light) VALUES($1, $2, $3, $4) RETURNING *";
  const values = [
    deviceid,
    temp,
    humi,
    light,
  ];
  pool.connect((err, client, done) => {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    console.log(text);
    client.query(text,values, (err, result) => {
      done();
      //console.log(text);
      if (err) {
        res.end();
        return console.log("error runing query", err);
      } else {
        res.json({
          result: "ok",
          message: "create new sensor data successfully",
        });
      }
    });
  });
  //res.render("index", { title: "Express" });
});
//....................................................create một thiết bị mới vào devices table........................................
router.post("/device/create", function (req, res, next) {
  const {
    deviceid,
    mode,
    relay1,
    relay2,
    lowertemp,
    uppertemp,
    lowerhumi,
    upperhumi,
  } = req.body;
  const text =
    "INSERT INTO devices(deviceid, mode, relay1, relay2, lowertemp, uppertemp, lowerhumi, upperhumi) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
  const values = [
    deviceid,
    mode,
    relay1,
    relay2,
    lowertemp,
    uppertemp,
    lowerhumi,
    upperhumi,
  ];
  const text2 = "DELETE FROM devices WHERE deviceid = " + deviceid;
  pool.connect((err, client, done) => {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    console.log(text);
    client.query(text2);
    client.query(text, values, (err, result) => {
      done();
      //console.log(text);
      if (err) {
        res.end();
        return console.log("error runing query", err);
      } else {
        res.json({
          result: "ok",
          message: "create new device successfully",
        });
      }
    });
  });
  //res.render("index", { title: "Express" });
});
//....................................................update dữ liệu điều khiển của một thiết bị....................................................
router.post("/device/control/:deviceid", function (req, res, next) {
  const { deviceid } = req.params;
  const {
    mode,
    relay1,
    relay2,
    lowertemp,
    uppertemp,
    lowerhumi,
    upperhumi,
  } = req.body;
  pool.connect((err, client, done) => {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    const text =
      "UPDATE devices SET mode= "
      + mode +
      ", relay1= " +
      relay1 +
      ", relay2= " +
      relay2 +
      ", lowertemp= " +
      lowertemp +
      ", uppertemp=" +
      uppertemp +
      ", lowerhumi=" +
      lowerhumi +
      ", upperhumi=" +
      upperhumi +
      " WHERE deviceid=" +
      deviceid;
    console.log(text);
    client.query(text, (err, result) => {
      done();
      //console.log(text);
      if (err) {
        res.end();
        return console.log("error runing query", err);
      } else {
        res.json({
          result: "ok",
          message: "update new Todos successfully",
        });
      }
    });
  });
  //res.render("index", { title: "Express" });
});
module.exports = router;

//https://ctrlsensors-api.herokuapp.com/data/new/:deviceid : lấy dữ liệu cảm biến mới nhất của một thiết bị          GET
//https://ctrlsensors-api.herokuapp.com/datas/temperature/:deviceid: lấy 360 dữ liệu cảm biến nhiệt độ mới nhất của một thiết bị.   GET
//https://ctrlsensors-api.herokuapp.com/datas/humidity/:deviceid: lấy 360 dữ liệu cảm biến độ ẩm mới nhất của một thiết bị.    GET
//https://ctrlsensors-api.herokuapp.com/datas/light/:deviceid: lấy 360 dữ liệu cảm biến ánh sáng mới nhất của một thiết bị.     GET

//https://ctrlsensors-api.herokuapp.com/device/control/123456789 : lấy dữ liệu điều khiển của một thiết bị    GET
//https://ctrlsensors-api.herokuapp.com/data/sent : gửi một dữ liệu mới lên bảng dữ liệu sensors               PoRT
//https://ctrlsensors-api.herokuapp.com/device/create : create một thiết bị mới vào devices table               PORT
//https://ctrlsensors-api.herokuapp.com/device/control/123456789 : update dữ liệu điều khiển của một thiết bị     PORT