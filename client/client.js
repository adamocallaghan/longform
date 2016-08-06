// On Client and Server
const Articles = new Mongo.Collection('articles'),
    ArticlesIndex = new EasySearch.Index({
        collection: Articles,
        fields: ['title'],
        engine: new EasySearch.Minimongo()
    });

// On Client
Template.search.helpers({
        articlesIndex: () => ArticlesIndex
});

Template.navbar.onRendered(function () {
    Meteor.call('getWired', function(error, result) {
        console.log('getting Wired.co.uk data - CLIENT');
    });
    Meteor.call('getGQ', function(error, result) {
        console.log('getting GQ data - CLIENT');
    });
    Meteor.call('getEsquire', function(error, result) {
        console.log('getting Esquire data - CLIENT');
    });
    Meteor.call('getRollingStone', function(error, result) {
        console.log('getting RollingStone.com data - CLIENT');
    });
    Meteor.call('getG2', function(error, result) {
        console.log('getting Guardian G2 data - CLIENT');
    });
    Meteor.call('getTheVerge', function(error, result) {
        console.log('getting TheVerge data - CLIENT');
    });
    Meteor.call('getTheGuardian', function(error, result) {
        console.log('getting The Guardian data - CLIENT');
    });
    Meteor.call('getNewYorker', function(error, result) {
        console.log('getting New Yorker data - CLIENT');
    });
    Meteor.call('getFlavorwire', function(error, result) {
        console.log('getting Flavorwire data - CLIENT');
    });
    Meteor.call('getTheAtlantic', function(error, result) {
        console.log('getting The Atlantic data - CLIENT');
    });
});
