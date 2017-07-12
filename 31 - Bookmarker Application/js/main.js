//listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);
//save Bookmark
function saveBookmark (e) {
  //get Form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;
    if(!validateForm(siteName, siteUrl)){
      return false;
    }

  var bookmark = {
    name : siteName,
    url : siteUrl
  }
  /*
  // local storage Test
    localStorage.setItem("test", "Hello Wold");
    console.log(localStorage.getItem("test"));
    localStorage.removeItem("test");
    console.log(localStorage.getItem("test"));
*/

  //Test if bookmark is null
  if(localStorage.getItem("bookmarks") === null){
    //init array
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //set to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  } else {
    //Get bookmark from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //add bookmark to array
    bookmarks.push(bookmark)
    //Re-set back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }
  //clear form
  document.getElementById("myForm").reset();
  //re-fetch bookmark
  fetchBookmarks();
//prevent form from submiting
  e.preventDefault();
}
//deleteBookmark

function deleteBookmark(url) {
  //get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for(var i = 0; i< bookmarks.length; i++){
    if(bookmarks[i].url == url){
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

  //re-fetch bookmark
  fetchBookmarks();
}

//fetch bookmarks

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
  var bookMarkerOutput = document.getElementById("bookmarkerOutput")
  bookMarkerOutput.innerHTML = "";
  for(var i = 0; i< bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookMarkerOutput.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }

}

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert("Please use a valid url")
    return false;
  }
  return true;
}
