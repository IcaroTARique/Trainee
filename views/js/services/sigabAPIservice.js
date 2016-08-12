angular.module(abaProfessor).factory("abaAPI")function () {
	var _getCadeiras = function ()
		return $http.get('/cadeiras');
};