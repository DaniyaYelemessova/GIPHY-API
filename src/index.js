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

function showTrends(e){
  e.preventDefault();
  const trend = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=jPrtAVlEkgB3iUXBXWox8FSqSVBWO0i1&limit=10&offset=0&rating=g&bundle=messaging_non_clips`;
  trend.addEventListener("loadend", function(){
    const response = JSON.parse(this.responseText);
    if(this.status === 200){
      printTrends(response);
    }
  });
  trend.open("GET", url, true);
  trend.send();
}

function printTrends(apiResponse){
  const outputDiv = document.querySelector('#trendOutput');
  outputDiv.innerHTML = ''; 

  apiResponse.data.forEach(gif => {
    const imageUrl = gif.images.original.url;

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Trending GIF';
    outputDiv.appendChild(imgElement);


  });
}
  

document.getElementById("form").addEventListener("submit", handleForm);
document.getElementById("trends").addEventListener("click", showTrends);


