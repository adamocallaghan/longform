import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

// On Client and Server... EasySearch setup...
const Articles = new Mongo.Collection('articles'),
    ArticlesIndex = new EasySearch.Index({
        collection: Articles,
        fields: ['title'],
        engine: new EasySearch.Minimongo()
    });

const Categories = new Mongo.Collection('categories');

// Start SyncedCron
SyncedCron.start();

// Actual SyncedCron job (gona be the RSS calls)
SyncedCron.add({
    name: 'Crunch some important numbers for the marketing department',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 3 hours');
    },
    job: function() {
        console.log("I am a cron-job baby!");
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
    }
});

// These methods are called client-side and do the business of retrieving the actual articles from RSS feeds
// I will be moving this to a cron-job at some point, after testing, etc, is finished and I'm ready to deploy
Meteor.methods({
    'getWired': function(){
        Articles.remove({});
        Categories.remove({});
        Categories.insert({ category: "" });
        console.log('getting Wired.co.uk data - SERVER');
        feedData = Scrape.feed("http://www.wired.com/feed/");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            articleVendor = "Wired";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
            Categories.insert({ category: articleCategory });
        }
    },
    'getGQ': function(){
        console.log('getting GQ data - SERVER');
        feedData = Scrape.feed("https://www.gq.com/rss");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            //console.log(articleCategory);
            articleVendor = "GQ";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
            Categories.insert({ category: articleCategory });
        }
    },
    'getEsquire': function(){
        console.log('getting Esquire data - SERVER');
        feedData = Scrape.feed("http://www.esquire.com/rss/all.xml");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            //console.log(articleCategory);
            articleVendor = "Esquire";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
            Categories.insert({ category: articleCategory });
        }
    },
    'getRollingStone': function(){
        console.log('getting RollingStone.com data - SERVER');
        feedData = Scrape.feed("http://www.rollingstone.com/music+movies+culture+politics+sports+country/rss");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            //console.log(articleCategory);
            articleVendor = "RollingStone";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
            Categories.insert({ category: articleCategory });
        }
    },
    'getG2': function(){
        console.log('getting Guardian G2 data - SERVER');
        feedData = Scrape.feed("https://www.theguardian.com/theguardian/g2/rss");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            //console.log(articleCategory);
            articleVendor = "G2";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
            Categories.insert({ category: articleCategory });
        }
    },
    'getTheVerge': function(){
        console.log('getting TheVerge data - SERVER');
        feedData = Scrape.feed("http://www.theverge.com/rss/index.xml");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            //console.log(articleCategory);
            articleVendor = "TheVerge";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
            Categories.insert({ category: articleCategory });
        }
    },
    'getTheGuardian': function(){
        console.log('getting The Guardian data - SERVER');
        feedData = Scrape.feed("https://www.theguardian.com/world/rss");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            //console.log(articleCategory);
            articleVendor = "TheGuardian";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
            Categories.insert({ category: articleCategory });
        }
    },
    'getNewYorker': function(){
        console.log('getting New Yorker data - SERVER');
        feedData = Scrape.feed("http://www.newyorker.com/feed/everything");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            //console.log(articleCategory);
            articleVendor = "NewYorker";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
            Categories.insert({ category: articleCategory });
        }
    },
    'getFlavorwire': function(){
        console.log('getting Flavorwire data - SERVER');
        feedData = Scrape.feed("http://flavorwire.com/feed/");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            //console.log(articleCategory);
            articleVendor = "Flavorwire";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
            Categories.insert({ category: articleCategory });
        }
    },
    'getTheAtlantic': function(){
        console.log('getting The Atlantic data - SERVER');
        feedData = Scrape.feed("http://www.theatlantic.com/feed/all/");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            //console.log(articleCategory);
            articleVendor = "TheAtlantic";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
            Categories.insert({ category: articleCategory });
        }
    }
});