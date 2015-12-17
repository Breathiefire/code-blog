function loadData() {
  $.ajax({
    type: 'HEAD',
    url: 'script/blogArticles.JSON',
    success: function(data, status, xhr){
      var eTag = (xhr.getResponseHeader('eTag'));
      console.log('server eTag: ' + eTag);
      var localEtag = localStorage.getItem('ergodicEtag');
      console.log('local eTag:  '+ localEtag);
      if (localEtag) {
        console.log('Got an etag');
        if (localEtag != eTag) {
          console.log('eTag doesnt match');
          getJsonData(eTag);
          console.log('loaded from JSON');
        } else {
          console.log('Etags match');
          getLocalCache();
          renderArticles();
          console.log('loaded from cache');
        }
      } else {
        console.log('no etag here');
        getJsonData(eTag);
      }
    }
  });
}

function aboutEvent() {
  $('#aboutMe').show();
  $('.article').hide();
  $('#categoryMenu').hide();
  $('#authorMenu').hide();
}

//gets json object and sets to local storage
function getJsonData(etagspot) {
  $.getJSON('script/blogArticles.json', function(data) {
    localStorage.setItem('blogData', JSON.stringify(data));
    rawData = JSON.parse(localStorage.getItem('blogData'));
    localStorage.setItem('ergodicEtag', etagspot);
    renderArticles();
  });
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
    hideSomeParagraph();
    showAllParagraphEventListener();
    populateDropDown('author', '#authorMenu');
    populateDropDown('category', '#categoryMenu');
    authorEventListener();
    categoryEventListener();
    //Highlight function
    $(document).ready(function() {
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    });
  });
}
