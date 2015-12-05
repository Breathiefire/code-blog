$(function() {

// // constructor object for the articles
// function makeArticle(obj) {
//   this.title = obj.title;
//   this.category = obj.category;
//   this.author = obj.author;
//   this.authorUrl = obj.authorUrl;
//   this.publishedOn = obj.publishedOn;
//   this.body = obj.body;
// }
//
// //Method to place article info into HTML
// makeArticle.prototype.toHtml = function() {
//   var $newArticle = $('article.arTemplate').clone();
//   $newArticle.removeClass('arTemplate');
//   $newArticle.addClass('article');
//   $newArticle.find('h1').html(this.title);
//   $newArticle.find('.categoryLine').html(this.category);
//   $newArticle.find('.author').html(this.author);
//   $newArticle.find('.authorURLline').html('<a href="this.authorURL">'+this.author+'</a>');
//   $newArticle.find('.publishedOnLine').html(this.publishedOn);
//   $newArticle.find('time').html(parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
//   $newArticle.find('.article-body').html(this.body);
//   $newArticle.find('.articleBody').children().not('p:first').hide();
//   $newArticle.append('<hr>');
//   return $newArticle;
// }

var templateInfo = $('#arTemplate').html();
var compilesTemplate = Handlebars.compile(templateInfo);
//Sort by most recent date
blog.rawData.sort(sortByDate);
for (var ii = 0; ii < blog.rawData.length; ii++) {
  var articleData = compilesTemplate(blog.rawData[ii]);
  $('#articleLocation').append(articleData);
}

$('.articleBody').each(function(){
   $(this).children().not('p:first').hide();
 });



//Pushes all articles through method to be placed in HTML
$(function() {
  // var dataArray = [];
  // for (var i = 0; i < blog.rawData.length; i++) {
  //     dataArray = new makeArticle(blog.rawData[i]);
  //     $('#articles').append(dataArray.toHtml());
  // }



      //shows rest of article on click
      $(".expand").on('click', function(){
          $(this).prev().children().show();
      });


      // Create a dropdown list for Authors. Adapted from Whitney
      blog.rawData.sort(sortByAuthor);
      populateDropDown('author', '#authorMenu');

      // Create a dropdown list for Categories. Adapted from Whitney
      blog.rawData.sort(sortByCategory);
      populateDropDown('category', '#categoryMenu');

      //on change of dropdown Author menu hides all articles but one selected. Adapted from Jessica
      $('#authorMenu').on('change', function(){
        var author = $(this).val();
        var $article = $('.article');
        $article.hide();
        var $authors = $('.author');
        $authors.each(function(){
          var text = $(this).text();
          if(text===author){
            $(this).closest('.article').show();
          }
        });
      });

      //on change of dropdown category menu hides all articles but one selected. Adapted from Jessica
      $('#categoryMenu').on('change',function(){
        var category = $(this).val();
        var $articles = $('.article');
        $articles.hide();
        var $categories = $('.categoryLine');
        $categories.each(function(){
          var text = $(this).text();
          if(text===category){
            $(this).closest('.article').show();
          }
        });
      });

        //Hides about me section
        $('#aboutMe').hide();

        //On click shows aricles
        $('#home').on('click', function(){
          $('#aboutMe').hide();
          $('.article').show();
        });

        //on click shows about me
        $('#about').on('click', function(){
          $('#aboutMe').show();
          $('.article').hide();
        });
  });

});
