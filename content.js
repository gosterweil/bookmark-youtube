function seekToStoredTime(){
    browser.storage.local.get(video_id).then(function (item) {
        console.log("got time: " + JSON.stringify(item));
        time_saved = item[video_id];
        if (time_saved)
        {
            document.dispatchEvent(new CustomEvent('seekTimestamp', {detail: time_saved}));
        }
     
    })
}
var s = document.createElement("script");
s.src = browser.runtime.getURL('injected.js');
(document.head || document.documentElement).appendChild(s)
s.onload = function() {
    s.parentNode.removeChild(s)
    seekToStoredTime();
}
let url_str = window.location.href;
let url = new URL(url_str);
let video_id = url.searchParams.get('v');

document.addEventListener("storeTimestamp", function(e){
    let to_store = e.detail;
    console.log("storing:" + JSON.stringify(to_store))
    browser.storage.local.set(to_store);
    
})





