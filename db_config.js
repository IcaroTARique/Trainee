var db_string= 'mongodb://127.0.0.1/Trainee';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

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

	exports.Disc = mongoose.model('Disc', disciplinaSchema);
	exports.User = mongoose.model('User', userSchema);
});