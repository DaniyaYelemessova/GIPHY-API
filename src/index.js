import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


function getGifs(search){
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=jPrtAVlEkgB3iUXBXWox8FSqSVBWO0i1&q=${search}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

  request.addEventListener("loadend", function(){
    const response = JSON.parse(this.responseText);
    if(this.status === 200){
      printElements(response, search);
    }else{
      printError(this,response, search);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function printError(request,apiResponse, search){
  document.querySelector("#output").innerHTML = `There was an error accessing the GIFs data for ${search}:  ${request.status} ${request.statusText}`;
}


function printElements(apiResponse){
  const imageUrl = apiResponse.data[0].images.original.url;
  document.querySelector("#output").innerHTML = `<img src="${imageUrl}" alt="GIF"/>`;
}


function handleForm(e){
  e.preventDefault();
  const search = document.getElementById("search").value;
  document.querySelector('#search').value = null;
  getGifs(search);
}

document.getElementById("form").addEventListener("submit", handleForm);


