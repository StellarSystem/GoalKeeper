import React from 'react';
import { SQLite } from 'expo';

const db_name = "myDatabase.db";
const db_displayName = "GoalKeeper Database";
const db_version = "1.0";
var database_size = 200000;

let connection = SQLite.openDatabase(db_name, db_version, db_displayName, database_size, openDBHandler, errorDBHandler);

class Database  {
    getConnection() {
        return connection;
    }
}

module.exports = new Database();