
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
      }
    }
  });
}

usingAjax();

var convertMarkdown = function(x) {
  for (ii = 0; ii < x.length; ii++) {
    if (x[ii].markdown) {
      x[ii].body = marked(x[ii].markdown);
    }
  }
  return x;
};


//gets json object and sets to local storage
function getJsonData(etagspot) {
  $.getJSON('script/blogArticles.JSON', function(data) {
    localStorage.setItem("blogData", JSON.stringify(data));
    rawData = JSON.parse(localStorage.getItem('blogData'));
    // rawData = JSON.parse(localStorage.getItem("blogData"));
    localStorage.setItem('ergodicEtag', etagspot)
    renderArticles();

  })
}

function getLocalCache() {
  rawData = JSON.parse(localStorage.getItem("blogData"));
}

function renderArticles(object) {
var markedRawData = convertMarkdown(rawData);

  console.log('Marked data: ', markedRawData[0]);
  $.get('template.html', function(data) {
    //Loops through blog objects and appends them to #articleLocation
    for (var ii = 0; ii < rawData.length; ii++) {
      //compiles templates using Handlebars
      var compilesTemplate = Handlebars.compile(data);
      //Sort by most recent date
      rawData.sort(sortByDate);

      var articleData = compilesTemplate(markedRawData[ii]);
      $('#articleLocation').append(articleData);
    }

    populateDropDown('author', '#authorMenu');
    populateDropDown('category', '#categoryMenu');
    aboutEvent();
    authorEvent();
    //Highlight function
    $(document).ready(function() {
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    });
  });
}


      $('.articleBody').each(function(){
        $(this).children().not('p:first').hide();
      });

        //shows rest of article on click
        $('.expand').on('click', function(){
          $(this).prev().children().fadeToggle();
          $(this).html('Read less...');
          console.log("button");
        });


        // Create a dropdown list for Authors.
    // populateDropDown('author', '#authorMenu');

        // Create a dropdown list for Categories.
    // populateDropDown('category', '#categoryMenu');

        //on change of dropdown Author menu hides all articles but one selected. Adapted from Jessica
function authorEvent() {
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
}
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
  function aboutEvent() {
    $('#about').on('click', function(){
      $('#aboutMe').show();
      $('.article').hide();
      $('#categoryMenu').hide();
      $('#authorMenu').hide();
    });
  }

});
