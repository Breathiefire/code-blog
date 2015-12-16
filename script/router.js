page.base('/');
$(function() {
  page('/', loadData);
  page('home', loadData);
  page('about', aboutEvent);
  page();
});
