//music
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
    let datasong = aplayer.getAttribute("data-song")
    datasong = JSON.parse(datasong)
    let dataSinger = aplayer.getAttribute("data-singer")
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: datasong.title,
            artist: dataSinger.fullName,
            url: datasong.audio,
            cover: datasong.avatar,
            lrc: datasong.lyrics
        }],
        autoplay: true
    });
    const avatar = document.querySelector(".singer-detail .inner-avatar")
    ap.on('play', function () {
        avatar.style.animationPlayState = "running"
    })
    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused"
    })
    ap.on("ended",function(){
        const link = `/songs/listen/${datasong._id}`;
        fetch(link)
            .then(res => res.json())
            .then(data=>{
                console.log(data)
                const elementsListen = document.querySelector(".singer-detail .inner-listen span")
                elementsListen.innerHTML = `${data.listen} Lượt Nghe`
            })
    })
}
//end
// Button like
const buttonLike = document.querySelector("[button-like]")
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const idSong = buttonLike.getAttribute("button-like")
        const isActive = buttonLike.classList.contains("active")
        const typeLike = isActive ? "dislike" : "like"
        const link = `/songs/like/${typeLike}/${idSong}`
        const options = {
            method: "PATCH"
        }
        fetch(link, options)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    const span = buttonLike.querySelector("span")
                    span.innerHTML = `${data.newlike} thích`
                    buttonLike.classList.toggle("active");
                }
            })
    })
}
// end
// favarion 
const listbuttonFavarion = document.querySelectorAll("[button-favarion]")
if (listbuttonFavarion.length > 0) {
    listbuttonFavarion.forEach((buttonFavarion) => {
        buttonFavarion.addEventListener("click", () => {
            const favarionId = buttonFavarion.getAttribute("button-favarion")
            const idActive = buttonFavarion.classList.contains("active");
            const typeFavarion = idActive ? "disFavarion" : "Favarion";
            const link = `/songs/favarion/${typeFavarion}/${favarionId}`
            const option = {
                method: "PATCH"
            }
            fetch(link, option)
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        buttonFavarion.classList.toggle("active")
                    }
                })
        })
    })
}
// end
//search suggest
const boxSearch = document.querySelector(".box-search")
if (boxSearch) {
    const input = boxSearch.querySelector("input[name='keyword']");
    const boxSuggest = boxSearch.querySelector(".inner-suggest");
    input.addEventListener("keyup", () => {
        const keyword = input.value
        const link = `/search/suggest?keyword=${keyword}`
        fetch(link)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    const songs = data.newSongs
                    if (songs.length > 0) {
                        boxSuggest.classList.add("show")
                        const htmls = songs.map(song => {
                            return `
                                <a class="inner-item" href="/songs/detail/${song.slug}">
                                    <div class="inner-image">
                                        <img src="${song.avatar}" />
                                    </div>
                                    <div class="inner-info">
                                        <div class="inner-title">${song.title}</div>
                                        <div class="inner-singer">
                                            <i class="fa-solid fa-microphone-lines"></i>
                                            ${song.infoSinger ? song.infoSinger.fullName :"Đang cập nhập"}
                                        </div>
                                    </div>
                                </a>
                            `;
                        });
                        const boxList = boxSuggest.querySelector(".inner-list")
                        boxList.innerHTML = htmls.join("");
                    }
                    else {
                        boxSuggest.classList.remove("show");
                    }
                }
            })
    })
}
// end
