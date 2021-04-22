
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const app = {
     
    currentIndex : 0,
    isPlaying :false,
    isRandom:false,
    songs: [
      {
        name: "Click Pow Get Down",
        singer: "Raftaar x Fortnite",
        path: "music/noi-nay-co-anh-son-tung.mp3",
        image: "https://i.ytimg.com/vi/FN7ALfpGxiI/0.jpg"
      },
      {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "music/I-Got-Ya-Jung-Yong-Hwa.mp3",
        image:
          "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
      },
      {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        path:
          "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
      },
      {
        name: "Mantoiyat",
        singer: "Raftaar x Nawazuddin Siddiqui",
        path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
        image:
          "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
      },
      {
        name: "Aage Chal",
        singer: "Raftaar",
        path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
        image:
          "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
      },
      {
        name: "Damn",
        singer: "Raftaar x kr$na",
        path:
          "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
        image:
          "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
      },
      {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
        image:
          "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
      }
    ],
    defineProperties:function(){
      //Phương thức Object.defineProperty() định nghĩa ngay một thuộc tính mới trên một đối tượng, hoặc thay đổi một thuộc tính đã có trên một đối tượng, và trả về đối tượng đó.
      // * obj
      // Object cần định nghĩa thuộc tính.
      // * prop
      // Tên của thuộc tính sẽ định nghĩa hoặc sửa đổi.
      // * descriptor
      // Mô tả cho thuộc tính được định nghĩa hoặc sửa đổi.
      Object.defineProperty(this,'currentSong',{
        get:function()
        {
          return this.songs[this.currentIndex];
        }
      })
    },
    render:function(){
      const htmls = this.songs.map((song)=>{
        return `
            <div class="song">
              <div class="thumb"
                style="background-image: url('${song.image}')">
              </div>
              <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </div>
         `
      })
      
      $('.playlist').innerHTML = htmls.join('');// array to string

    },
    handleEvents:function(){        
      const _this = this;   //dung kieu cu lay app . <=> _this = app
      const cdWidth = cd.offsetWidth;

      //xu li CD quay/ dung.
      const cdThumbAnimate = cdThumb.animate( //(selector).animate({styles},{options})
        {transform:'rotate(360deg)'},
        {
          duration:10000, //10s
          interations:Infinity // loop vo han
        }
      )
      cdThumbAnimate.pause();
      document.onscroll = function()
      {
        //onsole.log(window.scrollY);
        // console.log(document.documentElement.scrollTop); // document dai dien cho ca trang cua ban, documentElement lay cac element cua the html

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        const newCdWidth = cdWidth - scrollTop ;

        cd.style.width = newCdWidth >0 ? newCdWidth + 'px':0;
        cd.style.opacity = newCdWidth / cdWidth;
      }
      //xu li khi click play
      playBtn.onclick = function(){
        if(_this.isPlaying)
        {
          //o day khong dung this duoc vi this la su kien cua playBtn.onclick => dung _this o tren ham handleEvent
          audio.pause();
        }
        else{
          audio.play();
        }
      }

      //Xu li khi play
      audio.onplay = function(){
        _this.isPlaying = true;
        player.classList.add('playing');
        cdThumbAnimate.play();
      }

      //Xu li khi pause
      audio.onpause = function()
      {
        _this.isPlaying = false;
        player.classList.remove('playing');
        cdThumbAnimate.pause();
      }

      //Khi tien do bai hat thay doi
      audio.ontimeupdate = function()
      {
        //console.log(audio.currentTime);//tra ve so giay cua video
        //console.log(audio.duration);//tra ve tong thoi gian cua bai hat tinh theo giay. Lan dau tra ve NaN
        if(audio.duration)//Check k phai NaN
        {
          const progressPersent = Math.floor(audio.currentTime / audio.duration * 100 );
          progress.value = progressPersent;
        }

      }

      //xu li khi tua bai hat
      progress.onchange = function(e)
      {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
        
      }

      //Khi next bai hat
      nextBtn.onclick = function()
      {
        _this.nextSong();
        audio.play();
      }
      //Khi prev bai hat
      prevBtn.onclick = function()
      {
        _this.prevSong();
        audio.play();
      }
      // random bai hat
      randomBtn.onclick = function()
      {
        _this.isRandom =  !_this.isRandom;
         this.classList.toggle('active',!this.isRandom); //true thi add , false thi remove
      }
     
    },// end handleEvents
    loadCurrentSong:function(){

       // heading.textContent = app.currentSong.name;
       heading.textContent = this.currentSong.name;
       cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
       audio.src = this.currentSong.path;
    },
    nextSong: function(){
      this.currentIndex ++;//app.currentIndex++;
      if(this.currentIndex >= this.songs.length)
      {
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
    },
    prevSong: function(){
      this.currentIndex --;//app.currentIndex --;
      if(this.currentIndex < 0)
      {
        this.currentIndex = this.songs.length -1;
      }
      this.loadCurrentSong();
    },
    start:function(){
      //dinh nghia cac thuoc tin cho obj
      this.defineProperties();

      //lang nghe xu li su kien
      this.handleEvents();

      //tai thong tin bai hat dau tien vao UI khi chay ung dung
      this.loadCurrentSong();

      // render playlist
      this.render();
    } 
}
app.start();// lam nhu the nay thi chuong trinh se chi co 1  app.start();