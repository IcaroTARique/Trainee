angular.module("abaProfessor", []);
		angular.module("abaProfessor").controller("abaProfessorCtrl", function ($scope, $http) {
			$scope.app = "Aba do Professor - DISCIPLINAS -";
			$scope.cadeiras = [];			
			
			var carregarCadeiras = function() {
				$http.get("/cadeiras").success(function(data, status) {
					$scope.cadeiras = data;
					}).error(function (data, status) {
					$scope.message = "Aconteceu um problema: " + data;
				});
			};

			$scope.api = "Aba do Professor - ALUNOS -";
			$scope.alunos = [];
				
			var carregarAlunos = function() {
				$http.get("/alunos").success(function(data, status) {
					$scope.alunos = data;
					}).error(function (data, status) {
					$scope.message = "Aconteceu um problema: " + data;
				});
			};

			$scope.adicionarCadeira = function (categoria) {
				$http.post("/cadeiras", categoria).success(function(data) {
					carregarCadeiras();
					delete $scope.categoria;
					
				});
				
			};

			$scope.adicionarAluno = function(infos) {
				$http.post("/alunos", infos).success(function(data) {
					carregarAlunos();
					delete $scope.infos;
					
				});
			};

			//$scope.atualizarContato = function() {        
        		//$http.put('/api/contatos/' + $scope.formContato._id, $scope.formContato).success( function(response){
            	//carregarCadeiras();
       		 //});
    		//};

			$scope.isCadeiraSelecionada = function(cadeiras) {
				return cadeiras.some(function(categoria) {
					return categoria.selecionado;
				});
			};

			$scope.isAlunoSelecionado = function(alunos) {
				return alunos.some(function (infos){
					return infos.selecionado;
				});
			};

			$scope.deletarCategoria = function(_id) {
        		$http.delete('/cadeiras/' + _id).success(function(data) {
                carregarCadeiras();
                $scope.cadeiras = data;
                	console.log(data);
            	})
            	.error(function(data) {
                console.log('Error: ' + data);
            	});
    		};

    		$scope.deletarAluno = function(_id) {
        		$http.delete('/alunos/' + _id).success(function(data) {
                carregarAlunos();
                $scope.alunos = data;
                	console.log(data);
            	}).error(function(data) {
                console.log('Error: ' + data);
            	});
    		};

    		$scope.atualizarCategoria = function(categoria) {
        		$http.get('/cadeiras/' + categoria._id).success(function(data) {
                $scope.categoria = data;
               	console.log(data);
            	}).error(function(data) {
                	console.log('Error: ' + data);
            	});
    		};

    		$scope.atualizarInfos = function(infos) {
        		$http.get('/alunos/' + infos._id).success(function(data) {
                $scope.infos = data;
               		console.log(data);
            	}).error(function(data) {
                	console.log('Error: ' + data);
            });
    };
   // Recebe o JSON do contato para edição e atualiza
    		$scope.updateCategoria = function() {        
        		$http.put('/cadeiras/' + $scope.categoria._id, $scope.categoria).success( function(response){
            	delete $scope.categoria;
            	carregarCadeiras();
       			});
    		};

    		$scope.updateAlunos = function() {        
        		$http.put('/alunos/' + $scope.infos._id, $scope.infos).success( function(response){
            	delete $scope.infos;
            	carregarAlunos();
       			});
    		};

    		//$scope.atualizarCategoria = function(categoria) {
    		//	$scope.categoria = categoria;       
        		
    		//};


    		//$scope.atualizarInfos = function(infos) {
    		//	$scope.infos = infos;
    		//};

    		
			carregarCadeiras();
			carregarAlunos();
		});