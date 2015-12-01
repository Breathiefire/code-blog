function makeArticle(obj) {
  this.title = obj.title;
  this.category = obj.category;
  this.author = obj.author;
  this.authorUrl = obj.authorUrl;
  this.publishedOn = obj.publishedOn;
  this.body = obj.body;
  var date = new Date(this.publishedOn);
  var today = new Date();
  this.daysElapsed = Math.round((today - date) / 1000 / 60 / 60 / 24);
}

makeArticle.prototype.toHtml = function() {
  var $newArticle = $('article.arTemplate').clone();
  $newArticle.removeClass('arTemplate');
  $newArticle.find('h1').html(this.title);
  $newArticle.find('.categoryline').html(this.category);
  $newArticle.find('.authorLine').html(this.author);
  $newArticle.find('.authorURLline').html(this.authorURL);
  $newArticle.find('.publishedOnLine').html(this.publishedOn);
  $newArticle.find('time').html('exactly ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.find('.article-body').html(this.body);
  $newArticle.append('<hr>');
  return $newArticle;
}

$(function() {
  var dataSpace = [];
    for (var i = 0; i < blog.rawData.length; i++) {
      dataSpace = new makeArticle(blog.rawData[i]);
      $('#articles').append(dataSpace.toHtml());
        console.log(dataSpace);
  }
});


blog.rawData.sort(function(one, two){
  var dateOne=one.publishedOn, dateTwo=two.publishedOn;
  if (dateOne > dateTwo)
    return -1;
  if (dateOne < dateTwo)
    return 1;
  return 0;
});
