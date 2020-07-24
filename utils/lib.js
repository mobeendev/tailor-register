import * as SQLite from "expo-sqlite";

export const getData = () => {
  const conn = SQLite.openDatabase("db.testDb1"); // returns Database object

  let data = [];
  let i = 0;
  conn.transaction((tx) => {
    // sending 4 arguments in executeSql
    tx.executeSql(
      "SELECT * FROM customers",
      null, // passing sql query and parameters:null
      // success callback which sends two things Transaction object and ResultSet Object
      (txObj, { rows: { _array } }) => {
        data = _array;
        // initCustomersList(customersList);
      }
      // failure callback which sends two things Transaction object and Error
      // (txObj, error) => console.log('Error ', error)
    ); // end executeSQL
  }); // end transaction
  console.log(data);
  return data;
};
