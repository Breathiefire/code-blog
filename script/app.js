var convertMarkdown = function(x) {
  for (ii = 0; ii < x.length; ii++) {
    if (x[ii].markdown) {
      x[ii].body = marked(x[ii].markdown);
    }
  }
  return x;
};

function getLocalCache() {
  rawData = JSON.parse(localStorage.getItem("blogData"));
}

function hideSomeParagraph() {
    $('.articleBody').each(function(){
      $(this).find('p:not(:first)').hide();
    });
  }

  //shows rest of article on click
function showAllParagraphEventListener() {
  $('.expand').on('click', function(){
    var $this = $(this);
        $this.prev().find('p:not(:first)').slideToggle();
    var string = $this.text();
    if (string === 'Read more...') {
      $this.text('Read less...');
    } else {
      $this.text('Read more...');
    }
  });
}


//on change of dropdown Author menu hides all articles but one selected. Adapted from Jessica
function authorEventListener() {
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
function categoryEventListener() {
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
}

//Hides about me section
    $('#aboutMe').hide();


//On click shows aricles
    $('#home').on('click', function(){
      $('#aboutMe').hide();
      $('.article').show();
      $('#categoryMenu').show();
      $('#authorMenu').show();
    });
