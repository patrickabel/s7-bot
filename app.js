//Add your requirements
var restify = require('restify');
var builder = require('botbuilder');

var appId = process.env.MY_APP_ID || "4f0ed808-4f5a-4476-8e4f-d49142ea7461";
var appSecret = process.env.MY_APP_SECRET || "1yVsJh4LivYs9insqOayH9o";

// Create bot and add dialogs
var bot = new builder.BotConnectorBot
    ({ appId: process.env.MY_APP_ID, appSecret: process.env.MY_APP_SECRET });
bot.add('/', new builder.SimpleDialog(function (session) {
    session.send('Hello World');
}));

// Setup Restify Server
var server = restify.createServer();
server.post('/API/Messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3000, function () {
    console.log('%s listening to %s', server.name, server.url);
});

server.get('/', restify.serveStatic({
    directory: __dirname,
    default: '/index.html'
}));