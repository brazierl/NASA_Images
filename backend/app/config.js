var config = {};

config.db = {};
config.jwt = {};
config.app = {};
config.images = {};
config.images.path = {};
config.emailverification = {};

// MongoDB config
config.db.type = 'mongodb';
config.db.host = 'localhost';
config.db.port = 27017;
config.db.name = 'images';
config.db.uri = config.db.type + '://' + config.db.host + ':' + config.db.port + '/' + config.db.name;

// JWT config
// config.secret = process.env.lab5Secret;
config.jwt.secret = 'developmentSecret';

// App config
config.app.port = process.env.PORT || 3000;
config.app.restApiRoute = '/api';

// Images Rest API config 
config.images.host = "images-api.nasa.gov";  
config.images.path.search = "/search";
config.images.path.asset = "/asset";

// Email verification config
config.emailverification.path = 'http://localhost:3000/api/email-verification/${URL}';
config.emailverification.email = 'brazierl.apps@gmail.com';
config.emailverification.password = 'J"5yJXu5fZ-PNR[w';
config.emailverification.urlredirectsuccess = 'http://localhost:8080/login';
config.emailverification.urlredirectfailure = 'http://localhost:8080/register';
config.emailverification.smtphost = 'smtp.gmail.com';
config.emailverification.smtpport = 465;
config.emailverification.secure = true;

module.exports = config;