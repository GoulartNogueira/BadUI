if (history.state) {
    keyContent = history.state
} else {
    letters = "abcdefghijklmnopqrstuvwxyz--!!!!"
    keyContent = letters.at(Math.floor(Math.random() * letters.length))
    history.pushState(keyContent, "")
}

if (keyContent == "-") {

    document.getElementById("key").innerHTML = "-<span class='key-subtitle'>Backspace</span>"
} else if (keyContent == "!") {

    document.getElementById("key").innerHTML = "!<span class='key-subtitle'>Submit</span>"
} else {

    document.getElementById("key").innerText = keyContent
}


document.getElementById("key").onclick = () => {
    if (keyContent == "-") {
        localStorage.typed = localStorage.typed.slice(0, -1)
    } else if (keyContent == "!") {
        localStorage.done = "yes"
    } else {
        localStorage.typed += keyContent
    }
}

title = document.getElementsByTagName("title")[0]
title.innerText = keyContent + title.innerText

lastCheckup = Date.now()

setInterval(() => {
    if (localStorage.done) {
        close()
    }

    if (localStorage.lastCheckup > lastCheckup) {
        lastCheckup = Date.now()
        localStorage.checkupResult = Number(localStorage.checkupResult) + 1
        if (localStorage.checkupResult > 8) {
            close()
        }
    }
}, 10)