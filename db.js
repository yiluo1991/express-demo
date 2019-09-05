var mysql=require("mysql2");
var pool=mysql.createPool({
    host:"127.0.0.1", // 默认localhost,
    port:3306, //默认3306
    user:"root",
    password:"1234",
    database:"tksale",
    connectionLimit:5,//连接池中的连接对象数量上限，默认值10
});

module.exports=pool;