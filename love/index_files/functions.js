/*
 * http://love.hackerzhou.me
 */

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function () {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function ($) {
    $.fn.typewriter = function () {
        this.each(function () {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function () {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);

//使用递归的方式实现数组、对象的深拷贝
function deepCloneDate(date) {
    return new Date(date.valueOf());
}

function toDaySeconds(seconds) {
    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours;
    }
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds = seconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return {
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    };
}

function countdown(date) {
    var current = new Date();
    let currYear = current.getFullYear();
    date.setFullYear(currYear);
    /*
    date.setHours(0);                   //小时	
    date.setMinutes(0);                 //分钟
    date.setSeconds(0);                  //秒
    date.setMilliseconds(0);             //秒
    */

    let currSeconds = Date.parse(current);
    let targetSeconds = Date.parse(date) + 3600 * 24 * 1000;

    if (targetSeconds < currSeconds) {
        date.setFullYear(currYear + 1);
        targetSeconds = Date.parse(date) + 3600 * 24 * 1000;
    }
    var seconds = (targetSeconds - currSeconds) / 1000;

    return toDaySeconds(seconds);
}


function countdownOfLunar(date) {
    let lunarDate = deepCloneDate(date);
    // console.log("lunardate:", lunarDate);
    var current = new Date();
    let currYear = current.getFullYear();
    let currSeconds = Date.parse(current);

    // 把年定位到前一年, 防止

    for (var i = -1; i <= 1; ++i) {
        var solarDate = calendar.lunar2solar(currYear + i, date.getMonth() + 1, date.getDate());
        // console.log(solarDate);
        lunarDate.setFullYear(solarDate.cYear, solarDate.cMonth - 1, solarDate.cDay + 1);

        // console.log(date);
        // console.log(lunarDate);
        let targetSeconds = Date.parse(lunarDate);

        if (targetSeconds >= currSeconds) {
            return toDaySeconds((targetSeconds - currSeconds) / 1000);
        }
    }
}



function timeElapse(date) {
    var current = Date();
    var seconds = (Date.parse(current) - Date.parse(date)) / 1000;

    return toDaySeconds(seconds);
}

function toSeconds(elapseTimes) {
    return "<span class=\"digit\">" + elapseTimes.days + "</span> 天 "
        + "<span class=\"digit\">" + elapseTimes.hours + "</span> 小时 "
        + "<span class=\"digit\">" + elapseTimes.minutes + "</span> 分钟 "
        + "<span class=\"digit\">" + elapseTimes.seconds + "</span> 秒";
}

function toDays(elapseTimes) {
    return "<span class=\"digit\">" + elapseTimes.days + "</span> 天 ";
}

function acquaintance(date) {
    elapseTimes = timeElapse(date);
    var result = toSeconds(elapseTimes);
    $("#clock").html(result);
}

function firstTime(id, date) {
    elapseTimes = timeElapse(date);
    var result = toDays(elapseTimes);
    $("#" + id).html(result);
}

function countdownSolar(id, date) {
    elapseTimes = countdown(new Date(date));
    var result = toDays(elapseTimes);
    $("#" + id).html(result);
}

function countdownLunar(id, date) {
    elapseTimes = countdownOfLunar(new Date(date));
    var result = toDays(elapseTimes);
    $("#" + id).html(result);
}
