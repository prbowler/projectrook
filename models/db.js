const { Pool } = require('pg');
//const connectionString = process.env.DATABASE_URL || "postgres://qridjelclbpsgz:e41fb5d09b2b16fd04e141399d01167b64dc7866f3402129cad23dbc19fa0eee@ec2-52-5-176-53.compute-1.amazonaws.com:5432/d1q7qo1brheiss"; //postgres://rookplayer:rookplayer@localhost:5432/rook
//const pool = new Pool({connectionString: connectionString});
const pool = new Pool({
    connectionString: "postgres://qridjelclbpsgz:e41fb5d09b2b16fd04e141399d01167b64dc7866f3402129cad23dbc19fa0eee@ec2-52-5-176-53.compute-1.amazonaws.com:5432/d1q7qo1brheiss",
    ssl: {
    rejectUnauthorized: false
    }
   });

function sel(sql, callback) {
    console.log("select ", sql);
    pool.query(sql, function(error, db_results) {
        if (error) {
            console.log("DataBase error");
            console.log(error);
            callback(error);
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
            callback(error);
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
            callback(error);
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
            callback(error);
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