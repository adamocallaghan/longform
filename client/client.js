// On Client and Server... EasySearch setup
const Articles = new Mongo.Collection('articles'),
    ArticlesIndex = new EasySearch.Index({
        collection: Articles,
        fields: ['title'],
        engine: new EasySearch.Minimongo({
            // the following is set a 'facet search' on the results that filters them by the category selected by the user
            selector: function (searchObject, options, aggregation) {
                var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

                // filter for the category if set
                if (options.search.props.category) {
                    selector.category = options.search.props.category;
                }

                return selector;
            }
        })
    });

const Categories = new Mongo.Collection('categories');

// On Client... tells EasySearch which index to search
Template.search.helpers({
        articlesIndex: () => ArticlesIndex
});

// Meteor calls to the server to get the actual articles
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

// When the 'select' box is changed add the property 'category' as the target value (e.g. "News" ... category="News")
// EasySearch facet search (see above!) uses this property to filter the returned Minimongo collection
Template.search.events({
    'change select': function (e) {
        ArticlesIndex.getComponentMethods()
            .addProps('category', $(e.target).val())
        ;
    },
    /*
    'click .animate_me': function(){
        $('.wrap, a').toggleClass('active');

        return false;
    },
    'click #close': function(){
        $('.wrap, a').removeClass('active');

        return false;
    }
    */
})

/* Going to use the following Global Helper to transform the entire
list of all categories into a list of unique categories */
Template.registerHelper('uniqueCats', function(categories){
    var u = {}, a = [];
    for(var i = 0, l = this.length; i < l; ++i){
        if(u.hasOwnProperty(this[i])) {
            continue;
        }
        a.push(this[i]);
        u[this[i]] = 1;
    }
    console.log(a);
    return a;
});

Template.search.helpers({
    category_list: function () {
        // The following returns only distinct/unique categories from the Categories collection (for the categories dropdown)
        var distinctEntries = _.uniq(Categories.find({}, {sort: {category:1}, fields: {category:true}}).fetch().map(function(x) {
            return x.category;
        }), true);
        return distinctEntries;
    }
});