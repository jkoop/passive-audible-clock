function start() {
    if (window.started) return
    window.started = true

    document.getElementById('start-button').disabled = true
    document.getElementById('start-button').innerText = 'Started'

    setInterval(function () {
        var d = new Date();
        var m = d.getMinutes();
        var s = d.getSeconds();

        document.getElementById('time').innerText = d;

        if (s < 1 && (m == 0 || m == 20 || m == 40 || m == 60)) {
            if (window.beeping) return

            window.beeping = true
            switch (m) {
                case 0:
                case 60:
                    beepHour()
                    break;
                case 20:
                    beepShortCount(1)
                    break;
                case 40:
                    beepShortCount(2)
                    break;
            }

            setTimeout(function () {
                window.beeping = false
            }, 2000)
        }
    }, 100)
}

function beepShort() {
    console.log('beep short')
    document.getElementById('short-beep').currentTime = 0
    document.getElementById('short-beep').play()
}

function beepLong() {
    console.log('beep long')
    document.getElementById('long-beep').currentTime = 0
    document.getElementById('long-beep').play()
}

function beepHour() {
    var hour = new Date().getHours()
    hour = hour % 4
    if (hour == 0) hour = 4

    beepLong();

    setTimeout(function () {
        beepShortCount(hour - 1)
    }, 1050)
}

function beepShortCount(count) {
    console.log('beep short count: ' + count)
    if (count < 1) return
    beepShort()
    setTimeout(function () {
        beepShortCount(count - 1)
    }, 550)
}