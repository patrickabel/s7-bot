//Add your requirements
var restify = require('restify');
var builder = require('botbuilder');

var appId = process.env.MY_APP_ID || "ae995099-8287-41f7-90f2-2719b3be9d69";
var appSecret = process.env.MY_APP_SECRET || "0CcK3ehvmxXTqs0omgPrKF0";

// Create bot and add dialogs
var bot = new builder.BotConnectorBot
    ({ appId: process.env.MY_APP_ID, appSecret: process.env.MY_APP_SECRET });
bot.add('/', new builder.SimpleDialog(function (session) {
    session.send('Hello World');
}));

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3000, function () {
    console.log('%s listening to %s', server.name, server.url);
});

server.get('/', restify.serveStatic({
    directory: __dirname,
    default: '/index.html'
}));