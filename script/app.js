$(function() {

function usingAjax() {
  $.ajax({
    type: 'HEAD',
    url: 'script/blogArticles.JSON',
    success: function(data, status, xhr){
      var eTag = (xhr.getResponseHeader('eTag'));
      console.log("server eTag: " + eTag);
      var localEtag = localStorage.getItem('ergodicEtag');
      console.log("local eTag: " + localEtag);
      if (localEtag) {
        console.log("Got an etag");
        if (localEtag != eTag) {
          console.log("eTag doesn't match");
          getJsonData(eTag);
          renderArticles()
          console.log("loaded from JSON");
        } else {
          console.log("Etags match");
          getLocalCache()
          renderArticles();
          console.log("loaded from cache");
        }
      } else {
        console.log("no etag here");
        getJsonData(eTag);
        renderArticles()
      }
    }
  });
}

usingAjax();

var rawData;
//gets json object and sets to local storage
function getJsonData(etagspot) {
  $.getJSON('script/blogArticles.JSON', function(data) {
    localStorage.setItem("blogData", JSON.stringify(data));
    rawData = JSON.parse(localStorage.getItem("blogData"));
    localStorage.setItem('ergodicEtag', etagspot)
    console.log(rawData);

  })
}

function getLocalCache() {
  rawData = JSON.parse(localStorage.getItem("blogData"));
  console.log(rawData);
}

function renderArticles(object) {
  $.get('template.html', function(data) {
    //compiles templates using Handlebars
    var compilesTemplate = Handlebars.compile(data);
    //Sort by most recent date
    rawData.sort(sortByDate);

    //Loops through blog objects and appends them to #articleLocation
    for (var ii = 0; ii < rawData.length; ii++) {
      var articleData = compilesTemplate(rawData[ii]);
      $('#articleLocation').append(articleData);
    }
  });
}


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
    populateDropDown('author', '#authorMenu');

        // Create a dropdown list for Categories. Adapted from Whitney
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
