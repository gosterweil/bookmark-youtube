'use strict';
let url_str = window.location.href;
let ytplayer =window.wrappedJSObject.document.getElementById("movie_player");
let url = new URL(url_str);
let video_id = url.searchParams.get('v');
let time_saved = undefined
browser.storage.local.get(video_id).then(function (item) {
        console.log("got time: " + JSON.stringify(item));
        time_saved = item[video_id];
        if (time_saved) //avoid infinite load loop
        {
            
            ytplayer.seekTo(time_saved, true);
        }
    }
)

window.setInterval(function() {
    let time = ytplayer.getCurrentTime();
    time = Math.round(time);
    let url_str = window.location.href;
    let url = new URL(url_str);
    let video_id = url.searchParams.get('v');
    let to_store = {};
    to_store[video_id] = time 
    browser.storage.local.set(to_store);
   
}, 5000);

// Your code here...