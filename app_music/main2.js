/* 
* 1. Render playlist
* 2. Scroll top 
* 3. Play / Pause / Seek
* 4. CD rotate
* 5. Next / Prev
* 6. Random
* 7. Next / Repeat when end
* 8. Acitive Song
* 9. Scroll song when in to view
* 10. Play song when click
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "MUSIC_PLAYER";

const player = $('.player');
const cd = $('.cd');
const playList = $('.playlist');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const app = {
    currentIndex : 0,
    currentTime: 0,
    isPlaying : false,
    isRandom: false,
    isRepeat: false,
    listRandomSongs: [],
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    setConfig (key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY,JSON.stringify(this.config));
    },
    loadConfig () {
        this.isRandom = this.config.isRandom || this.isRandom;
        this.isRepeat = this.config.isRepeat || this.isRepeat;
        this.currentIndex = this.config.currentIndex || this.currentIndex;
        this.currentTime = this.config.currentTime || this.currentTime;
        // Hiển thị trạng thái ban đầu của buttom random và repeat
        repeatBtn.classList.toggle('active',this.isRepeat);
        randomBtn.classList.toggle('active',this.isRandom);


    },
    songs: [
        // {
        //     id: 1,
        //     name: "Diễm Xưa",
        //     singer: "Miu Lê",
        //     path: "../assets/audio/Diem-Xua-Em-La-Ba-Noi-Cua-Anh-OST-Miu-Le.mp3",
        //     image: "../assets/images/diem-xua-miu-le.jpg",
        //     author: "Trịnh Công Sơn"
        // },
        // {
        //     id: 2,
        //     name: "Còn tuổi nào cho em",
        //     singer: "Miu Lê",
        //     path: "../assets/audio/Con-Tuoi-Nao-Cho-Em-Miu-Le.mp3",
        //     image: "../assets/images/miu-le.jpg",
        //     author: "Trịnh Công Sơn"
        // },
        {
            id: 1,
            name: "Nơi này có anh",
            singer: "Sơn Tùng",
            path: "music/noi-nay-co-anh-son-tung.mp3",
            image: "https://i.ytimg.com/vi/FN7ALfpGxiI/0.jpg",
            author: "Sơn Tùng"
          },
          {
            id: 2,
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "music/I-Got-Ya-Jung-Yong-Hwa.mp3",
            image:
              "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
            author: "Trịnh Công Sơn"
            },
        {
            id: 3,
            name: "Nevada-Vicetone-Vicetone1",
            singer: "Nevada-Vicetone-Vicetone1",
            path: "music/Nevada-Vicetone-Vicetone1.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/c/8/e/8/c8e857b87467cd199fef19a08c9febd7.jpeg",
            author: "Trịnh Công Sơn"
        },
        {
            id: 4,
            name: "SummerTime",
            singer: "K-391",
            path: "music/SummerTime-K-391.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/avatars/4/9/493e761d37d31c5cdef4281c0c0ef6d4_1458805399.jpg",
            author: "K39"
        },
        {
            id: 5,
            name: "TheFatRat",
            singer: "feat. Laura Brehm",
            path: "music/Monody-TheFatRat-feat-Laura-Brehm.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/avatars/2/3/231aa7ebe1e944683aeb7483db76a9ed_1475208904.jpg",
            author: "feat. Laura Brehm"
        },
        {
            id: 6,
            name: "Reality",
            singer: "feat. Janieck Devy",
            path: "muisc/Reality-Feat-Janieck-Devy-Lost-Frequencies.mp3",
            image: "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg",
            author: "feat. Janieck Devy"
        },
        {
            id: 7,
            name: "Monsters - Katie Sky",
            singer: "Katie Sky",
            path: "music/Monsters-Vocal-Katie-Sky.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/2/d/2/4/2d24268ef83f215b4a3263090bc43079.jpg",
            author: "Monsters - Katie Sky "
        },
    ],

    render() {
       var htmls = this.songs.map((song, index) => {
            return `
                    <div data-index = ${index} class="song ${index === this.currentIndex ? 'active' : ''}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                    </div>
                    `;
        })
        playList.innerHTML = htmls.join('');
    },

    defineProperties() {
        Object.defineProperty(this,'currentSong', {
            get:function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    // Lắng nghe sự kiện scroll và xử lý sự kiện
    handlerEvents() {
        const _this = this;

        // Xử lý CD thumb quay tròn
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000, //10 seconds
            iterations:Infinity,
        })
        cdThumbAnimate.pause();

        // Xử lý phóng to thu nhỏ CD
        const CdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scroll = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = CdWidth - scroll;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 ;
        }

        // Xử lý khi click vào play
        playBtn.onclick = function () {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Khi bài hát được Play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        // Khi bài hát được Pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
        let checkOnmouseAndTouch = true;
        progress.onmousedown = function() {
            checkOnmouseAndTouch = false;
        }

        progress.ontouchstart = function() {
            checkOnmouseAndTouch = false;
        }

        // Khi bài hát được tua
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;

            checkOnmouseAndTouch = true;
        }
        
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration && checkOnmouseAndTouch) {
                const progressPercent = audio.currentTime/audio.duration*100;
                progress.value = progressPercent;

                _this.setConfig("currentTime", audio.currentTime)
            }
            
        }

        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else{
                _this.nextSong()
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else{
                _this.prevSong()
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // Xử lý bật/tắt random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom",_this.isRandom);
            randomBtn.classList.toggle('active',_this.isRandom);
        }

        // Xử lý bật/tắt repeat song
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat",_this.isRepeat);
            repeatBtn.classList.toggle('active',_this.isRepeat);
        }

        // Xử lý audio khi kết thúc
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }

        // Lắng nghe sự kiện click vào playlist
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            const optionNode = e.target.closest('.option');
            if(songNode || optionNode) {

                if(optionNode) {
                    console.log('Xử lý sự kiện khi click vào option')
                }
                //  xử lý sự kiện chuyển bài khi click vào bài hát trong playlist
                else
                {
                   _this.currentIndex = Number(songNode.dataset.index);
                   _this.loadCurrentSong();
                   _this.render();
                   audio.play();
                }
            }
        }
    },

    // load bài hát hiện tại
    loadCurrentSong () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

        if(this.currentIndex == this.config.currentIndex) {
            audio.currentTime = this.config.currentTime;
        }else {
            audio.currentTime = 0;
        }
        
        this.setConfig("currentIndex", this.currentIndex)

    },

    nextSong () {
        this.currentIndex ++;
        
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong () {
        this.currentIndex --;
        
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong () {
        let songsIndex = [];
        if(this.listRandomSongs.length === 0) {
            for(let i = this.songs.length -1; i >= 0; i--) {
                songsIndex.push(i);
            }
            this.listRandomSongs = songsIndex.sort(() => { return 0.5 - Math.random()})
        }
        console.log(this.listRandomSongs);

        if(this.listRandomSongs.length > 0) {
            this.currentIndex = this.listRandomSongs.shift();
        }

        this.loadCurrentSong();
    },

    scrollToActiveSong () {
        setTimeout(function() {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            })
        }, 300)
    },

    start() {
        // Load config
        this.loadConfig();

        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // lắng nghe và xử lý các sự kiện
        this.handlerEvents();

        // tải thông tin bài hát đầu tiên khi chạy ứng dụng
        this.loadCurrentSong();

        // Tải Render playlist
        this.render();

    }
};


app.start();