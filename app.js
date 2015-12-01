function makeArticle(obj) {
  this.title = obj.title;
  this.category = obj.category;
  this.author = obj.author;
  this.authorUrl = obj.authorUrl;
  this.publishedOn = obj.publishedOn;
  this.body = obj.body;
}

makeArticle.prototype.toHtml = function() {
  var $newArticle = $('article.arTemplate').clone();
  $newArticle.removeClass('arTemplate');
  $newArticle.find('h1').html(this.title);
  $newArticle.find('.byline').html(this.category);
  $newArticle.find('.byline').html(this.author);
  $newArticle.find('.byline').html(this.authorURL);
  $newArticle.find('.byline').html(this.publishedOn);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.append('<hr>');
  return $newArticle;
}

$(function() {
  for (var i = 0; i <= 21; i++) {
    var arObj0 = new makeArticle(blog.rawData[i]);
  }

  $('#articles').append(arObj0.toHtml());
});
