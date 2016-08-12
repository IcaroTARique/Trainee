var express = require('express');

var sigab = express();

var bodyParser = require('body-parser');

var router = express.Router();

var db_string= 'mongodb://127.0.0.1/Trainee';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

var validator = require('validator');

var User;

var Disc;

db.on('error', console.error.bind(console, 'Erro ao Conectar o Banco'));

db.once('open', function() {

	var userSchema = mongoose.Schema({

		fullname: String,
		matricula: String,
		cre: String,
		created_at: Date,
		//tipo: [ "aluno", "professor" ],
		//disciplinasMinistradas: [ ]
	});

	var disciplinaSchema = mongoose.Schema({
		disciplina: String,
		horario: String,
		dia: String,
		professor: String,
		created_at: Date
	});

	Disc = mongoose.model('Disc', disciplinaSchema);
	User = mongoose.model('User', userSchema);
});

sigab.use(bodyParser.json());

sigab.use(bodyParser.urlencoded({

	extended: true
}));

sigab.listen(8080);

//sigab.use('/views', express.static(__dirname + '/views'));
sigab.use(express.static(__dirname + '/views'));

//sigab.get('*', function(req, res) {
 //   res.sendfile('C:/Users/Benilde Alexandria/Desktop/Trainee/professor.html');
//});


sigab.get('/alunos', function(req, res) {
	User.find({}, function(error, users) {

		if(error){

			res.json({error:'Não foi possível salvar o usuário'});
		}else{
			
			res.json(users);
		}
	});
});

sigab.get('/cadeiras', function(req, res) {
	Disc.find({}, function(error, users) {

		if(error){

			res.json({error:'Não foi possível salvar o usuário'});
		}else{
			
			res.json(users);
		}
	});
});

sigab.post('/alunos', function(req, res) {

	var fullname = validator.trim(validator.escape(req.param('fullname')));
	var matricula = validator.trim(validator.escape(req.param('matricula')));
	var cre = validator.trim(validator.escape(req.param('cre')));

	new User ({
		'fullname': fullname,
		'matricula': matricula,
		'cre': cre,
		'created_at': new Date()
	}).save(function(error, user){

		if(error){

			res.json({error:'Não foi possível salvar o usuário'});
		}else{
			
			res.json(user);
		}
	});	
});

sigab.post('/cadeiras', function(req, res) {

	var disciplina = validator.trim(validator.escape(req.param('disciplina')));
	var horario = validator.trim(validator.escape(req.param('horario')));
	var dia = validator.trim(validator.escape(req.param('dia')));
	var professor = validator.trim(validator.escape(req.param('professor')));

	new Disc ({
		'disciplina': disciplina,
		'horario': horario,
		'dia': dia,
		'professor': professor ,
		'created_at': new Date()
	}).save(function(error, user){

		if(error){

			res.json({error:'Não foi possível salvar o usuário'});
		}else{
			
			res.json(user);
		}
	});	
});

sigab.get('/cadeiras/:id', function(req, res) {
	//Declarando, por via das dúvidas
    var id = req.params.id;
    //Func -findOne (compara os IDs do banco com o ID recebido pelo GET)
    Disc.findOne({_id : req.params.id}, function(error, disc) {
        if (error)
            res.send(error);
        res.json(disc);
    });
    //teste
    console.log("Estamos Funcionando");
    console.log(id);
});
 
sigab.get('/alunos/:id', function(req, res) {
	//Declarando, por via das dúvidas
    var id = req.params.id;
    //Func -findOne (compara os IDs do banco com o ID recebido pelo GET)
    User.findOne({_id : req.params.id}, function(error, user) {
        if (error)
            res.send(error);
        res.json(user);
    });
    //teste
    console.log("Estamos Funcionando");
    console.log(id);
});

//sigab.put('/cadeiras', function(req, res) {
//
//	var id = validator.trim(validator.escape(req.param('id')));
//	var disciplina = validator.trim(validator.escape(req.param('disciplina')));
//	var horario = validator.trim(validator.escape(req.param('horario')));
//	var dia = validator.trim(validator.escape(req.param('dia')));
//	var professor = validator.trim(validator.escape(req.param('professor')));
//
//	Disc.findById(id, function(error, user) {
//		if(disciplina) {
//
//			user.disciplina = disciplina;
//		}
//		if(horario) {
//
//			user.horario = horario;
//		}
//		if(dia){
//			
//			user.dia = dia;
//		}
//		if(professor){
//
//			user.professor = professor;
//		}
//
//		user.save(function(error, user){
//
//			if(error){
//
//				res.json({error:'Não foi possível salvar a Cadeira'});
//			}else{
//				
//				res.json(user);
//			}
//		});
//	});	
//});


sigab.put('/cadeiras/:id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    var contatoData = req.body;
    var id = req.params.id;

    Disc.update( 
        {_id: id }, 
        contatoData, 
        { upsert: true}, 
        function(error, disc) {
            if (error) res.send(error);
            res.json(disc);
    });
    
});

sigab.put('/alunos/:id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    var contatoData = req.body;
    var id = req.params.id;

    User.update( 
        {_id: id }, 
        contatoData, 
        { upsert: true}, 
        function(error, user) {
            if (error) res.send(error);
            res.json(user);
    });
    
});

//sigab.put('/alunos', function(req, res) {
//
//	var id = validator.trim(validator.escape(req.param('id')));
//	var fullname = validator.trim(validator.escape(req.param('fullname')));
//	var matricula = validator.trim(validator.escape(req.param('matricula')));
//	var cre = validator.trim(validator.escape(req.param('cre')));
//
//	User.findById(id, function(error, user) {
//		
//		if(fullname) {
//
//			user.fullname = fullname;
//		}
//		if(matricula) {
//
//			user.matricula = matricula;
//		}
//		if(cre){
//			
//			user.cre = cre;
//		}
//
//		user.save(function(error, user){
//
//			if(error){
//
//				res.json({error:'Não foi possível salvar o usuário'});
//			}else{
//				
//				res.json(user);
//			}
//		});
//	});	
//});



sigab.delete('/cadeiras/:id', function(req, res) {

	var id = validator.trim(validator.escape(req.param('id')));

		Disc.findById(id, function(error, user) {

			if(error){

			res.json({error:'Não foi possível deletar Cadeira'});
		}else{

			user.remove(function(error) {

				if (!error){

				res.json({response: 'Cadeira excluída!!!'});
				}
			});
			
		}

	});
		
});

sigab.delete('/alunos/:id', function(req, res) {

	var id = validator.trim(validator.escape(req.param('id')));

		User.findById(id, function(error, user) {

			if(error){

			res.json({error:'Não foi possível deletar Aluno'});
		}else{

			user.remove(function(error) {

				if (!error){

				res.json({response: 'Aluno excluido!!!'});
				}
			});
			
		}

	});
		
});


