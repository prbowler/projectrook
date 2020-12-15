const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://rookplayer:rookplayer@localhost:5432/rook";
const pool = new Pool({connectionString: connectionString});

function sel(sql, callback) {
    console.log("select ", sql);
    pool.query(sql, function(error, db_results) {
        if (error) {
            console.log("DataBase error");
            console.log(error);
            throw error;
        } else {
            let results = {
                success:true,
                list:db_results.rows
            };
            console.log("Results: " + JSON.stringify(results));
            callback(null, results);
        }
    });
}

function selByValues(sql, values, callback) {
    console.log("select ", sql);
    console.log("values ", values);
    pool.query(sql, values, function(error, db_results) {
        if (error) {
            console.log("DataBase error");
            console.log(error);
            throw error;
        } else {
            let results = {
                success:true,
                list:db_results.rows
            };
            console.log("Results: " + JSON.stringify(results));
            callback(null, results);
        }
    });
}

function del(sql, values, callback) {
    console.log("delete ", sql);
    console.log("values ", values);
    pool.query(sql, values, (error, db_results) => {
        if (error) {
            console.log("DataBase error");
            console.log(err);
            throw error;
        } else {
            let results = {
                success:true,
                list:db_results.rows
            };
            console.log("Results: " + JSON.stringify(results));
            callback(null, results);
        }
    });
}

function add(sql, values, callback) {
    console.log("add ", sql);
    console.log("values ", values);
    pool.query(sql, values, (error, db_results) => {
        if (error) {
            console.log("DataBase error");
            console.log(error);
            throw error;
        } else {
            let results = {
                success:true,
                list:db_results.rows
            };
            console.log("Results: " + JSON.stringify(results));
            callback(null, results);
        }
    });
}

module.exports = {
    sel: sel,
    selByValues: selByValues,
    del: del,
    add: add
};