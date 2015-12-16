$(function() {
  page.base('/');

  page('showBlog', usingAjax);
  page('about', aboutEvent);

  //TODO: What route would you like to build next?

  page();

  function aboutEvent() {
    $('#aboutMe').show();
    $('.article').hide();
    $('#categoryMenu').hide();
    $('#authorMenu').hide();
  }
});
