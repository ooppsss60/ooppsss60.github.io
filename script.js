$(function () {
    $.getJSON("data.json", function (json) {
        for (let folder in json) {
            let li = createElement("li", {"class": "nav-item"})
            $(".nav-tabs").append(li)

            let a = createElement("a", {
                "data-toggle": "tab",
                "href": "#" + folder,
                "id": folder + "-tab",
                "class": "nav-link",
                "role": "tab",
                "aria-controls": folder,
                "aria-selected": "false"
            })
            a.innerText = folder
            $(li).append(a)

            let div = createElement("div", {
                "id": folder,
                "class": "tab-pane fade btn-group",
                "role": "tabpanel",
                "aria-labelledby": folder + "-tab"
            })
            $(".tab-content").append(div)

            for (let sound of json[folder]) {
                let btn = createElement("button", {
                    "type": "button",
                    "class": "btn btn-outline-dark",
                    "data-sound": folder + "/" + sound
                })
                btn.innerText = sound;
                $(div).append(btn)

            }
        }

        var audio = document.createElement('audio')
        var source = document.createElement('source')
        audio.appendChild(source);

        $("button").click(function () {
            source.src = 'sounds/' + this.dataset.sound;
            audio.load();
            audio.pause();
            audio.currentTime = 0;
            audio.play();
        })

    });
});

function createElement(tagName, attrs) {
    let el = document.createElement(tagName);
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
    return el;
};


