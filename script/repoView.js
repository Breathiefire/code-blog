// var repoView = {};
//
// repoView.index = function() {
//   repoView.ui();
//
//   var _append = function(repo) {
//     $('#aboutMe ul').append(repoView.render(repo));
//   };
//
//   repos.all.forEach(_append);
// };
//
// repoView.with = function(attr) {
//   var _attrCheck = function(repo) {
//     return repo[attr];
//   };
//
//   return _attrCheck;
// };
//
// repoView.render = function(repo) {
//   return $('<li>')
//     .html('<a href="' + repo.html_url + '">' + repo.full_name + '</a>');
// };
//
// repoView.ui = function() {
//   var $about = $('#aboutMe');
//   var $ul = $about.find('ul');
//
//   $ul.empty();
//   $about.fadeIn().siblings().hide();
// };