var home = document.location,
    menu = document.getElementById('menu'),
    comicsObj = document.getElementById('infoComics'),
    popUp = document.getElementById('vWindow'),
    comicsList = localStorage.getItem("comicsList") || "",
    comicsListArray = comicsList?JSON.parse(comicsList):[],
    tagGenre = document.getElementById('tagGenre'),
    tagAdvancedSearch = document.getElementById('tagAdvancedSearch'),
    tagInput = document.getElementById('input'),
    tagCharacter = document.getElementById('tagCharacter');

function init(){
  reviewDataConection();
  if(localStorage.getItem("admin") == "true"){
    userInfo.innerHTML = 'Welcome, ' + localStorage.getItem('loguedUser') +' </br> YOU ARE ADMIN';
  }else{
    userInfo.innerHTML = 'Welcome, ' + localStorage.getItem('loguedUser');
  }
  showComics();
}

function reviewDataConection(){
  if(localStorage.getItem("loguedUser") === "" || localStorage.getItem("loguedPassword") === ""){
    window.location = "index.html";
  };
};

window.onload = init;

function sigOut(){
  home.replace("index.html");
  localStorage.setItem("loguedPassword","");
  localStorage.setItem("loguedUser","");
  localStorage.setItem("admin","");
}

function showComics(){
  cleanComicsContent();
  comics.forEach(function(item, id) {
		var comic = document.createElement("div");

		comic.id = 'item-comic-'+id;
		comic.className = 'item-comic '+ item.genre;
		comicsObj.appendChild(comic);
		document.getElementById('item-comic-'+id).innerHTML =
		'<a><h3>'+item.title+'</h3><img src="'+item.img+'"><div class="comicDetail"><div><b>Genre: </b>'+item.genre+'</div><div><b>Character: </b>'+item.character+'</div><div><b>Description: </b>'+item.description+'</div><div><b>Status: </b>'+item.status+'</div></div></a>';
  });
}

function showProfileData(){
  var data = document.createElement("div");
  data.id="data";
  data.className='vWindow';
  popUp.appendChild(data);
  document.getElementById('data').innerHTML =
  '<br><label>Username: '+localStorage.getItem('loguedUser')+'</label><br><label>Password: '+localStorage.getItem('loguedPassword')+'</label>';
}

function filterByGenre(){
  if (tagGenre.value != 'all') {
    comicsObj.className = tagGenre.value + ' filtered';
  } else {
    comicsObj.className = '';
  }
}

function filterByCharacter(){
  if (tagCharacter.value != 'all') {
    comicsObj.className = tagCharacter.value + ' filtered';
  } else {
    comicsObj.className = '';
  }
}

function showFilteredComics(filteredList){
  cleanComicsContent();
  filteredList.forEach(function(item, id) {
		var comic = document.createElement("div");
    comic.id = 'item-comic-'+id;
    comic.className = 'filteredAdvancedSearchComics';
		comicsObj.appendChild(comic);
		document.getElementById('item-comic-'+id).innerHTML =
		'<a><h3>'+item.title+'</h3><img src="'+item.img+'"><div class="comicDetail"><div><b>Genre: </b>'+item.genre+'</div><div><b>Character: </b>'+item.character+'</div><div><b>Description: </b>'+item.description+'</div><div><b>Status: </b>'+item.Status+'</div></div></a>';
  });
}

function cleanComicsContent(){
  while (comicsObj.firstChild) {
      comicsObj.removeChild(comicsObj.firstChild);
  }
}

function removeTagAdvancedSearchContent(){
  tagInput.innerHTML = '';
}

function searchBy(){
  switch (tagAdvancedSearch.value) {
    case 'name':
    var valor = tagInput.value;
      filteredList = comicsListArray.filter(function(item){
        var valorUpper = valor.toUpperCase();
        var titulo = item.title.toUpperCase();
        var result = titulo.search(valorUpper);

        if(result != -1){
          return true;
        }else{
          return false;
        }
      });
      showFilteredComics(filteredList);
    break;

    case 'recommended':
      filteredList = comicsListArray.filter(function(item){
        return item.recommended === "true";
      });
      showFilteredComics(filteredList);
    break;

    case 'character':
    var valor = tagInput.value;
      filteredList = comicsListArray.filter(function(item){
        var valorUpper = valor.toUpperCase();
        var character = item.character.toUpperCase();
        var result = character.search(valorUpper);

        if(result != -1){
          return true;
        }else{
          return false;
        }
      });
      showFilteredComics(filteredList);
    break;
    default:
      showComics();
  }
}
