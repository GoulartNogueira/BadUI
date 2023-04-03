localStorage.typed = ""
localStorage.done = ""
localStorage.lastCheckup = Date.now()
localStorage.checkupResult = 0

document.getElementById("key").onclick = () => {
    let url = new URL("./tab.html", window.location.href)
    open(url.href, "_blank")
}

let finished = false

setInterval(() => {
    document.getElementById("input").value = localStorage.typed
    if (localStorage.done && !finished) {
        finished = true
        document.getElementById("key").remove()
        el = document.createElement("div")
        el.classList.add("finale")
        el.innerText = localStorage.typed.length ? "Username already taken. Please pick another." : "No username entered. Try again."
        document.body.appendChild(el)
    }
}, 10)


setInterval(() => {
    console.log("checkup: " + localStorage.checkupResult)
    localStorage.lastCheckup = Date.now()
    localStorage.checkupResult = 0
}, 500)