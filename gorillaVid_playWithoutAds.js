// REPLACE CONTENT ON ORIGINAL PAGE - currently doesn't prevent ads to popup on click ( some listeners 'd have to be shut-off .. )
var video = document.createElement('video')
video.id = "hackedVideo";
var sourceMP4 = document.createElement("source"); 
sourceMP4.type = "video/mp4";
sourceMP4.src = options.file; /* from GorillaVidz ^^ */
video.appendChild(sourceMP4);
video.controls = true;
video.autoplay = true;
video.style.width = "100%";
video.style.height = "100%";
video.poster = options.image; /* from GorillaVidz ^^ */
document.body.innerHTML = "";
document.body.appendChild(video);
console.log('GOOD TO WATCH WITHOUT ADS :D');

// YES, WE COULD PASS THE COVER IMAGE & FILE URL TO A NICE WEBPAGE, BUT ..

// .. WE CAN SIMPLY ;)
window.location = options.file

// so, to use within as a browser javascript bookmark
javascript: window.location = options.file
