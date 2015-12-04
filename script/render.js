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

    var convertTitle = marked(titleValue);
    $htmlRawOutput.text(convertTitle);
    $markdownOutput.html(convertTitle);

    var convertCategory = marked(categoryValue);
    $htmlRawOutput.text(convertCategory);
    $markdownOutput.html(convertCategory);

    var convertAuthor = marked(authorValue);
    $htmlRawOutput.text(convertAuthor);
    $markdownOutput.html(convertAuthor);

    var convertBody = marked(bodyValue);
    $htmlRawOutput.text(convertBody);
    $markdownOutput.html(convertBody);

    var z = new Date();
    console.log(z)
    jsonObject.title = convertTitle;
    jsonObject.category = convertCategory;
    jsonObject.publishedOn = z.getFullYear() + '-' + (z.getMonth()+1) + '-' + (z.getDay()-1);

    jsonObject.author = convertAuthor;
    jsonObject.body = convertBody;

    var jsonString = $json.text(JSON.stringify(jsonObject));
  }

  $articleTitle.on('input', render);
  $articleCategory.on('input', render);
  $articleAuthor.on('input', render);
  $articleBody.on('input', render);

  render();

  var x = new Date();
  console.log(x);
});
