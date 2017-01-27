// 1: activate CORS

// 2: create temp div
var iDiv = document.createElement('div')

// 3: get the serie's episodes listing page & grab its content
var req = new XMLHttpRequest();
req.open('GET', 'http://onwatchseries.to/serie/x_files', true);
req.onreadystatechange = function (aEvt) {
  if (req.readyState == 4) {
     if(req.status == 200){
        //document.write(req.responseText);
        iDiv.innerHTML = req.responseText;
        console.log("chargement ok\n");
      }
      else
      console.log("Erreur pendant le chargement de la page.\n");
  }
};
req.send(null);

// 4: get the episodes' pages links & the pages' urls from those
var episodeLinks = iDiv.querySelectorAll('a[href*="http://onwatchseries.to/episode"]')
var episodesUrls = [];
episodeLinks.forEach(function(episodeLink){
  episodesUrls.push( episodeLink.href );
});

// -- list those --
episodesUrls.forEach(function(episodesUrl){
  console.log( episodesUrl.split("/")[ episodesUrl.split("/").length-1 ].split('.')[0].split("_").join(" ").toUpperCase() )
});

// -- add the iDiv to the page, for easier visual debug --
document.body.innerHTML = ""
document.body.appendChild( iDiv );


// TODO: allow to save/load a .json of a serie's episodes ( holding original page link, name, cover image, & video url )
// 5: build a list of links we'll update ( via 'not optimized hacky web pages parsing' or json ;p )
var episodesDiv = document.createElement('div');
episodesDiv.id = "episodesDiv";
for( var episodeUrl in episodesUrls ){ console.log( episodesUrls[episodeUrl] ); episodesDiv.innerHTML += '<li><a href="' + 'http://onwatchseries.to/episode/' + episodesUrls[episodeUrl].split("/")[ episodesUrls[episodeUrl].split("/").length-1 ] + '"> ' + episodesUrls[episodeUrl].split("/")[ episodesUrls[episodeUrl].split("/").length-1 ].split('.')[0].split("_").join(" ").toUpperCase() + '</a></li>'; };
// -- add the episodes div to the page, to see them change colour if a video is found --
document.body.appendChild( episodesDiv );

// - Overall logic to get the video url of each episode -
// for every episode page url ( or at least 3 to quickly test )
for (var i=0; i < 1; i++ ){
  // create a tmp div to hold stuff so that we can have multiple instances fetching data at the same time
  var episodeTmpDiv = document.createElement('div');
  episodeTmpDiv.id = "episodeTmpDiv" + i;
  // ajax the video providers
  var req = new XMLHttpRequest();
  //req.open('GET', 'http://watch-series-tv.to/episode/helix_s2_e13.html', true);
  req.open('GET', episodesUrls[i], true);
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
      if(req.status == 200){
        //document.write(req.responseText);
        //iDiv.innerHTML = req.responseText;
        episodeTmpDiv.innerHTML = req.responseText;
        document.body.appendChild( episodeTmpDiv );// debug ( var someEpDivs = document.querySelectorAll("div[id*=episodeTmpDiv") )
        console.log(episodesUrls[i] + " chargement ok\n");
        // visual feedback of what's going on for a particular video url fetching
        episodesDiv.querySelectorAll('li')[i].querySelector('a').textContent += " [ 1: fetching episode page .. ]"
        
        // find GorillaVid's
        // get the link out of it ( it's the "referrer" url in one of the hidden input of the form )
        var gorillaLink = 'http://onwatchseries.to/'/*open/cale/*/ + episodeTmpDiv.querySelector('tr[class="download_link_gorillavid.in "]').querySelector('a[title="gorillavid.in"]').href.split("/")[ episodeTmpDiv.querySelector('tr[class="download_link_gorillavid.in "]').querySelector('a[title="gorillavid.in"]').href.split("/").length-1 ];
        // visual feedback of what's going on for a particular video url fetching
        episodesDiv.querySelectorAll('li')[i].querySelector('a').textContent.substr(0, episodesDiv.querySelectorAll('li')[i].querySelector('a').textContent.indexOf(' [ ') ) + " [ 2: fetching GorillaVid .. ]";
        
        // ajax GorillaVid
        var req2 = new XMLHttpRequest();
        req2.open('GET', gorillaLink, true);
        req2.onreadystatechange = function (aEvt) {
          if (req2.readyState == 4) {
            if(req2.status == 200){
              //document.write(req.responseText);
              episodeTmpDiv.innerHTML = req2.responseText; // R: re-use "episodeTmpDiv" ( aka we loose other providers links )
              console.log("chargement ok\n");
              
              // visual feedback of what's going on for a particular video url fetching
              episodesDiv.querySelectorAll('li')[i].querySelector('a').textContent.substr(0, episodesDiv.querySelectorAll('li')[i].querySelector('a').textContent.indexOf(' [ ') ) + " [ 3: continuing .. ]";
              
            }
            else
              console.log("Erreur pendant le chargement de la page.\n");
          }
        };
        req2.send(null);
        
      }
      else
      console.log("Erreur pendant le chargement de la page.\n");
    }
  };
  req.send(null);
  
    // find GorillaVid's
      // ajax GorillaVid's
        // "continue"
          // get video's href
            // update the episode's video link to visually feedback its availability
}
