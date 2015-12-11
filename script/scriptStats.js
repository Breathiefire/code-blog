$(function() {
  rawData = JSON.parse(localStorage.getItem('blogData'));

  var jsonStats = $.getJSON('script/blogArticles.json', function(rawData) {
    var $numArticles = $('#numArticles');
    var $numAuthors = $('#numAuthors');
    var $numWords = $('#numWords');
    var $wordLengthArticles = $('#wordLengthArticles');
    var $wordLengthAuthors = $('#wordLengthAuthors');
    var bodyText = $(rawData.body).text();


    //Total number of articles
    var totalNumArticles = (rawData.length);
    $numArticles.append(totalNumArticles);

    //Total number of distinct authors
    var distinctAuthors = $.unique(rawData.map(function(item) {
      return item.author;
    }));
    $numAuthors.append(distinctAuthors.length);

    //Total number of words
    var makeMarkdown = $.grep(rawData, function(a) {
      return a.markdown;
    });
    $.each(makeMarkdown, function(key, value) {
      bodyText += $(marked(value.markdown)).text();
    });
    var totalWords = bodyText.split(/\s+/).length;
    $numWords.append(totalWords);

    //Average number of words in all articles
    $wordLengthArticles.append(totalWords / totalNumArticles);

    //Average length of word per Author
    $wordLengthAuthors.append(bodyText.length / totalWords);
  });
});
