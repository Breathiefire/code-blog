//Sort by author in alphabetical order
var sortByAuthor = function(a, b) {
  if (a.author > b.author) {return 1;}
  if (a.author < b.author) {return -1;}
  return 0;
};

//Sort by most recent date
var sortByDate = function(a, b) {
  if (a.publishedOn < b.publishedOn) { return 1; }
  if (a.publishedOn > b.publishedOn) { return -1; }
  return 0;
};

//Sort by category in alphabetical order
var sortByCategory = function(a, b) {
  if (a.publishedOn > b.publishedOn) { return 1; }
  if (a.publishedOn < b.publishedOn) { return -1; }
  return 0;
};


//Populates select menu with what ever you pass into it. Adapted from Whitney
function populateDropDown(theType, sectionId) {
  var list = [];
  for(var ii = 0; ii < blog.rawData.length; ii++) {
    var type = blog.rawData[ii][theType];
    if (list.indexOf(type) === -1) {
      var name = '<option>' + type + '</option>';
      var $html = $(name);
      $(sectionId).append($html);
      list.push(type);
    }
  }
};
