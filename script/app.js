$(function() {
// constructor object for the articles
function makeArticle(obj) {
  this.title = obj.title;
  this.category = obj.category;
  this.author = obj.author;
  this.authorUrl = obj.authorUrl;
  this.publishedOn = obj.publishedOn;
  this.body = obj.body;
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
  $newArticle.find('.article-body').children().not('p:first').hide();
  $newArticle.append('<hr>');
  $("#authorMenu").append('<option value="'+this.author+'">'+this.author+'</option>');
  $("#categoryMenu").append('<option value="'+this.category+'">'+this.category+'</option>');
  return $newArticle;
}

//Pushes all articles through method to be placed in HTML
$(function() {
  var dataArray = [];
  //sorts articles by most recent date. I adapted this from:
  //http://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date
  blog.rawData.sort(function(a, b){
    var dateA=a.publishedOn, dateB=b.publishedOn;
    if (dateA > dateB)
      return -1;
    if (dateA < dateB)
      return 1;
    return 0;
  });
  for (var i = 0; i < blog.rawData.length; i++) {
      dataArray = new makeArticle(blog.rawData[i]);
      $('#articles').append(dataArray.toHtml());
  }
      //shows rest of article on click
      $(".expand").on('click', function(){
          $(this).prev().children().show();
      });
    });
});
