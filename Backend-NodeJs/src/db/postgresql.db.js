const { Pool, Client } = require('pg');
const _ = require('lodash');
const config = require('../configs/db')

const pool = new Pool(config.postgresqlConfig);

const execQuery = (text, param) => {
    return new Promise((resolve, reject) => {
        pool.query(text, param, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve({ rowCount: res.rowCount, rows: res.rows });
        })
    })
}

// const execFunc = (text, param) => {
//     text = _.toLower(_.trim(text));
//     return new Promise((resolve, reject) => {
//         pool.connect((err, client, release) => {
//             release();
//             if (err) {
//                 return reject(err.message);
//             }

//             client.query('BEGIN;')
//                 .then(() => {
//                     return client.query(`SELECT * FROM ${text};`, param);
//                 })
//                 .then(res => {
//                     let row = res.rows[0];
//                     if (_.isEqual(row.p_refcursor, 'p_refcursor')) {
//                         return client.query(`FETCH ALL IN "p_refcursor"`);
//                     }
//                     return res;
//                 })
//                 .then(res => {
//                     return resolve({ rowCount: res.rowCount, rows: res.rows });
//                 })
//                 .catch(err => {
//                     reject(err.message);
//                 })
//                 .finally(() => {
//                     console.log('commit')
//                     client.query('COMMIT;');
//                 })
//         })
//     })
// }

const execFunc = (text, param) => {
    text = _.toLower(_.trim(text));
    return new Promise((resolve, reject) => {
        const client = new Client(config.postgresqlConfig)
        client.connect()
            .then(() => {
                return client.query('BEGIN;')
            })
            .then(() => {
                return client.query(`SELECT * FROM ${text};`, param);
            })
            .then(res => {
                let row = res.rows[0];
                if (row.p_status_code === 200) {
                    // if(!row.p_refcursor){
                    //     return resolve({ rowCount: res.rowCount, rows: res.rows });
                    // }
                    if (_.isEqual(row.p_refcursor, 'p_refcursor')) {
                        return client.query(`FETCH ALL IN "p_refcursor"`);
                    }
                    return resolve({ rowCount: res.rowCount, rows: res.rows });
                }
                else if (row.p_status_code === 400) {
                    return reject({
                        statusCode: 400,
                        payload: row.p_status_msg
                    });
                }
                else if (row.p_status_code === 401) {
                    return reject({
                        statusCode: 401,
                        payload: row.p_status_msg
                    });
                }
                else if (row.p_status_code === 423) {
                    return reject({
                        statusCode: 423,
                        payload: row.p_status_msg
                    });
                }
                return res;
            })
            .then(res => {
                return resolve({ rowCount: res.rowCount, rows: res.rows });
            })
            .catch(err => {
                reject({
                    statusCode: 500,
                    payload: err.message
                });
            })
            .finally(() => {
                client.query('COMMIT;')
                    .then(() => client.end())
            })
    })
}


const execProc = (text, param) => {
    return new Promise((resolve, reject) => {
        execQuery(`CALL ${text}`, param)
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

module.exports = {
    execQuery: execQuery,
    execFunc: execFunc,
    execProc
}