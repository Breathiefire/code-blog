$(function() {
  var $articleTitle = $('#articleTitle');
  var $articleCategory = $('#articleCategory');
  var $articleAuthor = $('#articleAuthor');
  var $articleBody = $('#articleBody');
  var $htmlRawOutput = $('#htmlRawOutput');
  var $markdownOutput = $('#markdownOutput');
  var $json = $('#json');
  var jsonObject = {};

  function render() {
    var titleValue = $articleTitle.val();
    var categoryValue = $articleCategory.val();
    var authorValue = $articleAuthor.val();
    var bodyValue = $articleBody.val();

    var convertBody = marked(bodyValue);
    $htmlRawOutput.text(convertBody);


    var currentDate = new Date();
    console.log(currentDate);
    jsonObject.title = titleValue;
    jsonObject.category = categoryValue;
    jsonObject.publishedOn = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + (currentDate.getDay()-1);
    jsonObject.author = authorValue;
    jsonObject.body = convertBody;
    console.log(jsonObject);


    $.get('template.html', function(data) {
      console.log(data);
      //compiles templates using Handlebars
      var compilesTemplate = Handlebars.compile(data);
      console.log(compilesTemplate);
      var articleData = compilesTemplate(jsonObject);
      $markdownOutput.html(articleData);
      var jsonString = $json.text(JSON.stringify(jsonObject));
      $(document).ready(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      });
    });
  }

  $articleTitle.on('input', render);
  $articleCategory.on('input', render);
  $articleAuthor.on('input', render);
  $articleBody.on('input', render);

  render();

  var x = new Date();
  console.log(x);
});
