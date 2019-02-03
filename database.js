import React from 'react';
import { SQLite } from 'expo';
const db_name = "myDatabase.db";
const db_displayName = "GoalKeeper Database";
const db_version = "1.0";
var database_size = 200000;

let connection = SQLite.openDatabase(db_name, db_version, db_displayName, database_size);

//TODO: create an api to handle database connections

const Database = {
    getConnection() {
        return connection;
    },

    getCategories(){
        connection.transaction(tx => {
            tx.executeSql('select * from category;', [], this.getCategorySuccess, this.getCategoryFail
        );
        })
    },

    getCategorySuccess(tx, { rows }){
        var size = rows.length
        console.log("updating")
        if(size > 0){
            //this.setState({ categories: rows._array})
            console.log("Updated nicely")
            console.log(JSON.stringify({ rows }))
            var arr = rows._array
            console.log(JSON.stringify(arr))
            HomeScreen.updateCategories(JSON.stringify(arr))
            return JSON.stringify(arr)
        } else {
            console.log("nothing here")
            return null
        }
    },

    getCategoryFail(error){
        console.log("didn't update well", error)
        return null
    },

    initaliseTables(){
        var createCategory = "create table if not exists category (id integer primary key not null, name text not null, saved float not null, goal float not null, date text);"
        var createLog = "create table if not exists log (id integer primary key not null, cat_id int not null, date text not null, amount float not null, FOREIGN KEY (cat_id) REFERENCES category (id) ON DELETE CASCADE ON UPDATE NO ACTION)"
        connection.transaction(tx => {
          tx.executeSql("create table if not exists category (id integer primary key not null, name text not null, saved float not null, goal float not null, date text);",
        [],
        (_, result) =>console.log("category init"),
        (_, error) =>console.log("category fail init", error)        
         );
          tx.executeSql("create table if not exists log (id integer primary key not null, cat_id int not null, date text not null, amount float not null, FOREIGN KEY (cat_id) REFERENCES category (id) ON DELETE CASCADE ON UPDATE NO ACTION)",
        [],
        (_, result) => console.log("log init"),
        (_, error) => console.log("log fail init", error)      
         )
        })
    }
}

export default Database;