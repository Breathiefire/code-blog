page.base('/');
$(function() {
  page('/', loadData);
  page('home', loadData);
  page('about', aboutEvent);
  page();
});

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
