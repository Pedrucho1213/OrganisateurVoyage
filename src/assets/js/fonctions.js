function httpGetAsync(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
       if(xmlHttp.readyState == 4 && xmlHttp.status ==200)
       callback(xmlHttp.responseText);
     }
     xmlHttp.open("GET",`https://cors-anywhere.herokuapp.com/https://whc.unesco.org/en/list/${id}/gallery/&maxrows=1`, true);
     xmlHttp.setRequestHeader("Content-Type", "application/json");
 
     xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
     xmlHttp.send(null);
}

httpGetAsync("https://cors-anywhere.herokuapp.com/https://whc.unesco.org/en/list/${id}/gallery/&maxrows=1", function(data){
    var el= document.createElement('html');
    el.innerHTML = data;
    let imgs = el.getElementsByClassName('icaption-img');
    for(let i=0; i<imgs.length; i++){
        console.log(imgs[i].getAttribute('data-src'));
    }
})