/**
 * @author konst
 * @date: 11/12/12 10:44 PM
 *
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: '20shots',
	password: 'QxZ67XtexEWAB4pf',
	database: '20shots'
});

connection.connect();

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

connection.query('SELECT * FROM Photo WHERE status = 0', function (err, rows, fields) {
	if (err) {
		throw err;
	}
	var fs = require('fs')
	var request = require('request');
	var path = require('path');

	for (var i = 0, item; item = rows[i]; i++) {
		request(item.src).pipe('/home/konst/projects/20shots/photos/orig/'+item.photoId+path.extname('item.src'));
	}
});

connection.end();