$('document').ready(function () {

    plController.loadPlayer('dBArczb8gFs', 25)

    $('.controls .pause_play').on(
        'click',
        function () {
            if ($(this).hasClass('play')) {
                plController.pauseVideo()
                $(this).removeClass('play').addClass('pause')
            } else {
                plController.playVideo()
                $(this).removeClass('pause').addClass('play')
            }
            return false
        }
    )

    $('.controls .prev').on(
        'click',
        function () {
            plController.playPrev()
            return false
        }
    )
    $('.controls .next').on(
        'click',
        function () {
            plController.playNext()
            return false
        }
    )

})