const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://rookplayer:rookplayer@localhost:5432/rook";
const pool = new Pool({connectionString: connectionString});

function sel(sql, callback) {
    console.log("select ", sql);
    pool.query(sql, function(error, result) {
        if (error) {
            console.log("DataBase error");
            console.log(error);
            callback(error, null);
        }
        console.log("Results: " + JSON.stringify(result.rows));
        callback(null, result.rows);
    });
}

function selByValues(sql, values, callback) {
    console.log("select ", sql);
    pool.query(sql, values, function(error, result) {
        if (error) {
            console.log("DataBase error");
            console.log(error);
            callback(error, null);
        }
        console.log("Results: " + JSON.stringify(result));
        callback(null, result);
    });
}

function del(sql, values, callback) {
    console.log("delete ", sql);
    pool.query(sql, values, (err, result) => {
        if (err) {
            console.log("DataBase error");
            console.log(err);
        }
        console.log("Results: " + JSON.stringify(result));
        callback(null, result);
    });
}

function add(sql, values) {
    console.log("add ", sql);
    pool.query(sql, values, (err, res) => {
        if (err) {
            console.log("DataBase error");
            console.log(err);
        }
    });
}

module.exports = {
    sel: sel,
    selByValues: selByValues,
    del: del,
    add: add
};