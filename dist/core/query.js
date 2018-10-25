"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_helper_1 = require("../helpers/data.helper");
class Query {
    static async Connect() {
        return new Promise((resolve, reject) => {
            const con = data_helper_1.DataHelper.Conn;
            con.connect(err => {
                if (err !== null && err !== undefined) {
                    console.log(`Error 1: ${err}`);
                    reject(err);
                }
                else {
                    resolve(con);
                }
            });
        });
    }
    static async Execute(sql, callback) {
        return new Promise((resolve, reject) => {
            this.Connect()
                .then(async (conn) => {
                conn.query(sql, (err, result) => {
                    if (err !== undefined && err !== null) {
                        console.log(`Error 2: ${err}`);
                        reject(err);
                    }
                    else {
                        callback(result);
                        resolve();
                    }
                });
            })
                .catch(reason => {
                console.log(reason);
            });
        });
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map