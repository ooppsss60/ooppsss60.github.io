$(function () {
    $.getJSON("data.json", function (json) {
        for (let folder in json) {

            let li = document.createElement("li")
            li.className = "nav-item"
            $(".nav-tabs").append(li)

            let a = document.createElement("a")
            a.dataset.toggle = 'tab'
            a.href = "#" + folder
            a.id = folder + "-tab"
            a.className = "nav-link"
            a.setAttribute("role", "tab")
            a.setAttribute("aria-controls", folder)
            a.setAttribute("aria-selected", "false")
            a.innerText = folder
            $(li).append(a)

            let div = document.createElement("div")
            div.id = folder
            div.className = "tab-pane fade btn-group"
            div.setAttribute("role", "tabpanel")
            div.setAttribute("aria-labelledby", folder + "-tab")
            $(".tab-content").append(div)

            for (let sound of json[folder]) {
                let btn = document.createElement("button")
                btn.type = "button";
                btn.className = "btn btn-outline-dark";
                btn.innerText = sound;
                btn.dataset.sound = folder + "/" + sound;
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


