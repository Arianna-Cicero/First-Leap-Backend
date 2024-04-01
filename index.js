const sql = require("mssql/msnodesqlv8");
var config = {
  server : "PC",
  database : "DBFirstLeap",
  driver : "msnodesqlv8",
  options : {
    trustedConnection : true
  }
}

sql.connect(config, function(err){
  if (err)console.log(err);
  var request = new sql.Request();
  request.query("Select * from Utilizador", function (err, records){
    if(err)console.log(err);
    else console.log(records);
  })
})