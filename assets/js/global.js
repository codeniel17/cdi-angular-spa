/*
*   put all global variables
*   inside GLOBAL object
*/

var GLOBAL = {
    host: 'https://jsonplaceholder.typicode.com',
    socket: 'http:socket',
    set_url : function (ids) {
		var q_string = '';
		for (var key in ids) {
			var _id = '';
			if (ids[key]) {
				_id = '/' + ids[key];
			}
			var new_key = '/' + key + _id;
			var new_str = q_string + new_key;
			q_string 	= new_str;
		}; 
		return this.host + q_string;
	},
	header : function (token) {
		if (token) {
			return {
				'x-access-token' : token
			};
		} else {
			return false;
		}
	},
	transform : function (file) {
		if (file)
			return angular.identity;
		else
			return false;
	},
	user : function (cookies, state) {
		var user = cookies.getObject('user');
		if (user) {
			return user; 
		} else {
			state.go('login');
		}
	},
	parameters : function (params) {
		if (params) 
			return params;
		else
			return false;
	},
	clean_data : function (data) {
		if (!data) 
			return false;
		else
			return data;
	},
	clean_object : function (object) {
		for(var key in object) {
			if (!object[key]) {
				delete object[key];
			}
		};
		return object;
	}
};