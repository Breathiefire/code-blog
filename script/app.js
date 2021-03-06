// constructor object for the articles
function makeArticle(obj) {
  this.title = obj.title;
  this.category = obj.category;
  this.author = obj.author;
  this.authorUrl = obj.authorUrl;
  this.publishedOn = obj.publishedOn;
  this.body = obj.body;
  var date = new Date(this.publishedOn);
  var today = new Date();
}

//Method to place article info into HTML
makeArticle.prototype.toHtml = function() {
  var $newArticle = $('article.arTemplate').clone();
  $newArticle.removeClass('arTemplate');
  $newArticle.find('h1').html(this.title);
  $newArticle.find('.categoryLine').html(this.category);
  $newArticle.find('.authorURLline').html('<a href="this.authorURL">'+this.author+'</a>');
  $newArticle.find('.publishedOnLine').html(this.publishedOn);
  $newArticle.find('time').html(parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.find('.article-body').html(this.body);
  $newArticle.append('<hr>');
  return $newArticle;
}

//Pushes all articles through method to be placed in HTML
$(function() {
  var dataSpace = [];
    for (var i = 0; i < blog.rawData.length; i++) {
      dataSpace = new makeArticle(blog.rawData[i]);
      $('#articles').append(dataSpace.toHtml());
        console.log(dataSpace);
  }
});

//function to sort articles by most recent date. I adapted this from:
//http://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date
blog.rawData.sort(function(a, b){
  var dateA=a.publishedOn, dateB=b.publishedOn;
  if (dateA > dateB)
    return -1;
  if (dateA < dateB)
    return 1;
  return 0;
});
