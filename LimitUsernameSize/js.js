var input = document.getElementById('userNameInput')
        var y = input.getBoundingClientRect().top + 10
        var x = input.getBoundingClientRect().left + 150

        var mainDiv = document.getElementById('main')

        var fallingDivs = []

        input.addEventListener('input', () => {
            while(isOverflown(input)){
                let fallingChar = input.value.substr(-1)
                input.value = input.value.slice(0,-1)

                let fallingDiv = document.createElement('div')
                fallingDiv.innerText = fallingChar

                fallingDiv.classList.add('fallingDiv')
                fallingDiv.style.top = y +'px'
                fallingDiv.style.left = x + 'px'

                mainDiv.append(fallingDiv)
                fallingDivs.push(fallingDiv)
            }
        })

        function isOverflown(element) {
            return element.scrollWidth > element.clientWidth;
        }

        setInterval(() => {
            fallingDivs.forEach(fallingDiv => {
                if(Number(fallingDiv.style.top.slice(0,-2)) < document.getElementById('bin').getBoundingClientRect().top + 10){
                fallingDiv.style.top = Number(fallingDiv.style.top.slice(0,-2)) + 5 + 'px'
                fallingDiv.style.transform = 'rotate(' + (Number(fallingDiv.style.transform.slice(7,fallingDiv.style.transform.indexOf('d')))+5)+'deg)'
               }
            })
        },40)