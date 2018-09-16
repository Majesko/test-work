var tabunder = (function() {
    var settings = {
        adsUrl: null
    }

    var currentUrl = window.location.href;
    var isAdsVisited = localStorage.getItem('adVisited');
    var scrollPosition = localStorage.getItem('scrollPosition');

    var handler = function() {
        adVisited();
        window.open(currentUrl);
        window.location.href = settings.adsUrl;
    }

    var adVisited = function() {
        localStorage.setItem('adVisited', true);
        localStorage.setItem('scrollPosition', getScrollPosition());
    }

    var getScrollPosition = function() {
        var el = document.scrollingElement || document.documentElement; 
        
        return el.scrollTop 
    }

    var setScrollPosition = function(position) {
        document.documentElement.scrollTop = position;
        
        if ('Safari' === getUserAgent()) {
            document.scrollingElement.scrollTop = position
        }
    }

    var configure = function(newsettings) {
        settings.adsUrl = newsettings.adsUrl;
    }

    var getUserAgent = function() {
        return navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)[1];
    }

    return {
        start: function(settings) {   
            configure(settings);
            document.addEventListener('DOMContentLoaded', function() {
                if (!isAdsVisited) {
                    document.body.addEventListener('click', handler);
                    document.body.addEventListener('touchend', handler);
                } else {
                    setScrollPosition(scrollPosition);
                    localStorage.removeItem('scrollPosition');
                }
            });
        }
    }
}());

tabunder.start({
    adsUrl: 'http://google.com',
});