const postgresqlDb = require('./postgresql.db');

module.exports = {
    execQuery: postgresqlDb.execQuery,
    execFunc: postgresqlDb.execFunc,
    execProc: postgresqlDb.execProc
}