$.ajax({
  url: 'https://api.github.com/users/breathiefire',
  type: 'GET',
  dataType: 'JSON',
  success: displayAccount,
});

$.ajax({
  url: 'https://api.github.com/users/breathiefire/repos',
  type: 'GET',
  dataType: 'JSON',
  success: printRepos,
});

function displayAccount(data){

  var githubRepos = '<h1><a class="link "href="'+ data.html_url +'">';
  githubRepos += data.login + '</a></h1>';
  $('#aboutMe').append(githubRepos);
  // getNext();
}
function printRepos(data){
  for(var i=0; i<data.length; i++){
    var githubRepos = '<p><a class="link" href="'+data[i].html_url+'">'+ data[i].name + '</a></p>';
    $('#aboutMe').append(githubRepos);
  }
}
