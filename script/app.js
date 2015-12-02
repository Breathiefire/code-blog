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
  return $newArticle;
}

//Sort by most recent date
blog.rawData.sort(sortByDate);

//Pushes all articles through method to be placed in HTML
$(function() {
  var dataArray = [];
  for (var i = 0; i < blog.rawData.length; i++) {
      dataArray = new makeArticle(blog.rawData[i]);
      $('#articles').append(dataArray.toHtml());
  }

      //shows rest of article on click
      $(".expand").on('click', function(){
          $(this).prev().children().show();
      });

      // Create a dropdown list for Authors
      blog.rawData.sort(sortByAuthor);
      populateDropDown('author', '#authorMenu');

      // Create a dropdown list for Categories
      blog.rawData.sort(sortByCategory);
      populateDropDown('category', '#CategoryMenu');
    });


});
