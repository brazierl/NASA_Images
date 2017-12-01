var config = {};

config.db = {};
config.jwt = {};
config.app = {};
config.images = {};
config.images.path = {};
config.emailverification = {};
config.mailserver = {};
config.dmca = {};

// General config
config.siteport = 8080;
config.apiport = 3000;
config.sitehostname = 'localhost';
config.apihostname = 'localhost';
config.siteurl = 'http://' + config.sitehostname + ':' + config.siteport;
config.apiurl = 'http://' + config.apihostname + ':' + config.apiport;

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
config.emailverification.path = config.apiurl + '/api/email-verification/${URL}';
config.emailverification.urlredirectsuccess = config.siteurl + '/login';
config.emailverification.urlredirectfailure = config.siteurl + '/register';

// Mail Server config
config.mailserver.email = 'brazierl.apps@gmail.com';
config.mailserver.password = 'J"5yJXu5fZ-PNR[w';
// SMTP
config.mailserver.smtphost = 'smtp.gmail.com';
config.mailserver.smtpport = 465;
config.mailserver.smtpsecure = true;
// IMAP
config.mailserver.imaphost = 'imap.gmail.com';
config.mailserver.imapport = 993;
config.mailserver.imapsecure = true;

config.dmca.collectionurl = config.siteurl + '/collections';
config.dmca.requestpath = '/api/dmca/collections';

module.exports = config;