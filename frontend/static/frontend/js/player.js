//https://developers.google.com/youtube/js_api_reference?hl=ru

var playerController = function () {
    this.ytplayer = null
    this.startWith = null
    this.startWithTime = null

    // The "main method" of this sample. Called when someone clicks "Run".
    this.loadPlayer = function (startId, startTime) {
        // Lets Flash from another domain call JavaScript
        var params = { allowScriptAccess: "always"};
        // The element id of the Flash embed
        var atts = { id: "ytPlayer" };
        // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)

        this.startWith = startId
        this.startWithTime = startTime
        //swfobject.embedSWF("http://www.youtube.com/v/"+startId+"?" +
        swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
            "version=3&enablejsapi=1&playerapiid=player1",
            "itsnotmine_player", "1024", "576", "9", null, null, params, atts);

    }


    this.onPlayerReady = function () {
        this.ytplayer = document.getElementById("ytPlayer");
        // This causes the updatePlayerInfo function to be called every 250ms to
        // get fresh data from the player
        //setInterval(updatePlayerInfo, 250);
        //updatePlayerInfo();
        this.ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
        this.ytplayer.addEventListener("onError", "onPlayerError");
        //Load an initial video into the player
        if (this.startWith) {
            this.ytplayer.cueVideoById(this.startWith);
            this.ytplayer.playVideo()

        } else {
            this.playNext()
        }


        this.setVideoVolume(100)
    }
    this.onPlayerError = function (errorCode) {
        alert("An error occured of type:" + errorCode);
    }
    this.onPlayerStateChange = function (newState) {
        //Возвращает состояние проигрывателя. Возможные значения:
        // не запущен (-1),
        // воспроизведение закончено (0),
        // идет воспроизведение (1),
        // пауза (2),
        // буферизация (3),
        // видео размечено (5).

        //updateHTML("playerState", newState);
        //console.log('new State = ' + newState)
        if (newState == 0) {
            this.playNext()
        }

        if (newState == 1) {
            if (this.startWithTime) {
                this.ytplayer.seekTo(this.startWithTime)
                this.startWithTime = null
            }
        }
    }
    this.playPrev = function () {
        this.ytplayer.cueVideoById("58nmD7Yu1Og");
        this.ytplayer.playVideo()
    }
    this.playNext = function () {
        this.ytplayer.cueVideoById("Jdnfv4qxGe4");
        this.ytplayer.playVideo()
    }


    // Allow the user to set the volume from 0-100
    this.setVideoVolume = function (volume) {
        if (this.ytplayer) {
            this.ytplayer.setVolume(volume);
        }
    }

    this.playVideo = function () {
        if (this.ytplayer) {
            this.ytplayer.playVideo();
        }
    }

    this.pauseVideo = function () {
        if (this.ytplayer) {
            this.ytplayer.pauseVideo();
        }
    }

    this.muteVideo = function () {
        if (this.ytplayer) {
            this.ytplayer.mute();
        }
    }

    this.unMuteVideo = function () {
        if (this.ytplayer) {
            this.ytplayer.unMute();
        }
    }

}


//        // Display information about the current state of the player
//        function updatePlayerInfo() {
//            // Also check that at least one function exists since when IE unloads the
//            // page, it will destroy the SWF before clearing the interval.
//            if (ytplayer && ytplayer.getDuration) {
////                updateHTML("videoDuration", ytplayer.getDuration());
////                updateHTML("videoCurrentTime", ytplayer.getCurrentTime());
////                updateHTML("bytesTotal", ytplayer.getVideoBytesTotal());
////                updateHTML("startBytes", ytplayer.getVideoStartBytes());
////                updateHTML("bytesLoaded", ytplayer.getVideoBytesLoaded());
////                updateHTML("volume", ytplayer.getVolume());
//            }
//        }


var plController = new playerController()
// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
    plController.onPlayerReady()
}
function onPlayerStateChange(state) {
    plController.onPlayerStateChange(state)
}
function onPlayerError(code) {
    plController.onPlayerError(code)
}
