var config = {};

config.db = {};
config.jwt = {};
config.app = {};
config.images = {};
config.images.path = {};

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


module.exports = config;