(function() {
let url_str = window.location.href;
let ytplayer = document.getElementById("movie_player");

let time_saved = undefined
document.addEventListener("seekTimestamp", function(e){
    time_saved = e.detail;
    if (time_saved)
    {
        ytplayer.seekTo(time_saved, true);
    }
    
})

window.setInterval(function() {
    let time = ytplayer.getCurrentTime();
    time = Math.round(time);
    let url_str = window.location.href;
    let url = new URL(url_str);
    let video_id = url.searchParams.get('v');
    var to_store = {};
    to_store[video_id] = time 
    
    document.dispatchEvent(new CustomEvent('storeTimestamp', {
        detail: to_store
    }));
   
}, 1000);
})();
// Your code here...