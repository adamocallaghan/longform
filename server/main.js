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

// These methods are called client-side and do the business of retrieving the actual articles from RSS feeds
// I will be moving this to a cron-job at some point, after testing, etc, is finished and I'm ready to deploy
Meteor.methods({
    'getWired': function(){
        Articles.remove({});
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
        }
    },
    'getNewYorker': function(){
        console.log('getting New Yorker data - SERVER');
        feedData = Scrape.feed("https://www.theguardian.com/world/rss");
        //console.log(feedData.items);
        for (i=0; i<feedData.items.length; i++) {
            articleTitle = feedData.items[i].title;
            articleLink = feedData.items[i].link;
            articleDesc = feedData.items[i].description;
            articleCategory = feedData.items[i].tags[0];
            //console.log(articleCategory);
            articleVendor = "NewYorker";
            Articles.insert({ title: articleTitle, link: articleLink, description: articleDesc, category: articleCategory, source: articleVendor });
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
        }
    }
});