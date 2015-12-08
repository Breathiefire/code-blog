$(function() {

function usingAjax() {
  $.ajax({
    type: 'HEAD',
    url: 'script/blogArticles.JSON',
    success: function(data, status, xhr){
      var eTag = (xhr.getResponseHeader('eTag'));
      console.log(eTag);
      localStorage.setItem('ergodicEtag', eTag);
    }
  });
}

usingAjax();
  //If local eTag is equal to new eTag then use cached json objects
  //If local eTag is not equal to new eTag then refresh page


  $.get('template.html', function(data) {

    //compiles templates using Handlebars
    var compilesTemplate = Handlebars.compile(data);
    //Sort by most recent date
    blog.rawData.sort(sortByDate);

    //Loops through blog objects and appends them to #articleLocation
    for (var ii = 0; ii < blog.rawData.length; ii++) {
      var articleData = compilesTemplate(blog.rawData[ii]);
      $('#articleLocation').append(articleData);
    }
  });

  $('.articleBody').each(function(){
  $(this).children().not('p:first').hide();
});

  //Pushes all articles through method to be placed in HTML
  $(function() {
    //shows rest of article on click
    $('.expand').on('click', function(){
      $(this).prev().children().fadeToggle();
      $(this).html('Read less...');
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
      $('#categoryMenu').show();
      $('#authorMenu').show();
    });

          //on click shows about me
    $('#about').on('click', function(){
      $('#aboutMe').show();
      $('.article').hide();
      $('#categoryMenu').hide();
      $('#authorMenu').hide();
    });
  });



});
