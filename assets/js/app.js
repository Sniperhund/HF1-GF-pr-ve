const $ = (parameter) => document.querySelector(parameter)

const slidingImageContainer = $("#sliding-image")

const imgs = [
    "/assets/img/slider/hero_img.jpg",
    "/assets/img/gallery/galleri1.jpeg",
    "/assets/img/gallery/galleri2.jpeg",
    "/assets/img/gallery/galleri3.jpeg",
    "/assets/img/gallery/galleri5.jpeg",
    "/assets/img/gallery/galleri6.jpeg",
]

const imgObjects = []

function initSlider() {
    for (let i = 0; i < imgs.length; i++) {
        const imgUrl = imgs[i]

        const image = document.createElement("img")

        image.src = imgUrl

        slidingImageContainer.appendChild(image)

        imgObjects.push(image)

        if (i != 0) {
            image.style.transform = "translateX(100%)"
        }
    }
}

initSlider()

function nextSlide() {
    if (!imgObjects) return

    const currentImgObject = imgObjects[0]
    imgObjects.shift()

    currentImgObject.style.transform = "translateX(-100%)"

    imgObjects.push(currentImgObject)

    if (imgObjects[0]) imgObjects[0].style.transform = ""

    setTimeout(() => {
        if (imgObjects[imgObjects.length - 1]) {
            imgObjects[imgObjects.length - 1].style.display = "none"
            imgObjects[imgObjects.length - 1].style.transform =
                "translateX(100%)"

            setTimeout(() => {
                if (imgObjects[imgObjects.length - 1]) {
                    imgObjects[imgObjects.length - 1].style.display = "block"
                }
            }, 400)
        }
    }, 400)
}

setInterval(nextSlide, 5000)

let activeToasts = []

$("form").addEventListener("submit", (event) => {
    event.preventDefault()

    event.target.reset()

    const toast = document.createElement("div")

    $("body").appendChild(toast)

    toast.classList.add("notification")

    toast.innerHTML = `<div class="bar"></div>
            <div>
                <p>Succes</p>
                <p>Besked sendt</p>
            </div>
            <i class="fa-solid fa-xmark"></i>`

    toast.querySelector("i").addEventListener("click", () => {
        removeToast(toast)
    })

    setTimeout(() => {
        removeToast(toast)
    }, 5000)

    activeToasts.push(toast)

    updateToastPositions()
})

function removeToast(element) {
    var index = activeToasts.indexOf(element)
    if (index !== -1) {
        activeToasts.splice(index, 1)
    }

    element.remove()

    updateToastPositions()
}

function updateToastPositions() {
    for (let i = 0; i < activeToasts.length; i++) {
        const toast = activeToasts[i]

        toast.style.transition = "transform 0.4s ease-in-out"

        if (i == 0) {
            toast.style.transform = ""
            continue
        }

        if (window.innerWidth < 768) {
            toast.style.transform = `translate(50%, -${125 * i}%)`
            continue
        }

        toast.style.transform = `translateY(-${125 * i}%)`
    }
}
