const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const headerIcon = $('.header-icon')
const header = $('.header')
const musicName = $('.music-title-name');
const musicSinger = $('.music-title-singer');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playMusic = $('.control-btn-toggle-play')
const player = $('.control-btn')
const progress = $('.progress')
const currenTime = $('.progress-curren-time');
const dutationTime = $('.progress-duration-time');
const volumeMusic = $('.progress-volume')
const volumeBtn = $('.music-progress-volume')
const btnhigh = $('.btn-high')
const btnlow = $('.btn-low')
const next = $('.btn-next')
const prev = $('.btn-prev')
const shuffle = $('.control-btn-shuffle')
const repeat = $('.control-btn-repeat')
const musicList = $('.music-list')
const musicListItem = $('.music-list-item')
const musicdashboard = $('.music-dasboard') 

const app = {
    currentIndex: 0,
    isPlaying: false,
    isShuffle: false,
    isRepeat: false,
    isMenu: false,
    songs: [
        {
            name: 'Bật Tình Yêu Lên',
            singer:'Tăng Duy Tân, Hòa Minzy',
            path:'./assets/mp3 Music_PlayList/bat_tinh_yeu_len.mp3',
            img:'./assets/thumb Music_PlayList/img-battinhyeulen.webp'
        },
        {
            name:'Cuối Cùng Thì',
            singer:'Jack - J97',
            path:'./assets/mp3 Music_PlayList/cuoi_cung_thi.mp3',
            img: './assets/thumb Music_PlayList/img-cuoicungthi.webp'
        },
        {
            name:'Em Là Kẻ Đáng Thương',
            singer:'Phát Huy T4',
            path:'./assets/mp3 Music_PlayList/em_la_ke_dang_thuong.mp3',
            img:'./assets/thumb Music_PlayList/img-emlakedangthuong.webp'
        },
        {
            name:'Nơi Này Có Anh (Masew Bootleg)',
            singer: 'Sơn Tùng M-TP',
            path:'./assets/mp3 Music_PlayList/noi_nay_co_anh.mp3',
            img: './assets/thumb Music_PlayList/img-noinaycoanh.webp'
        },
        {
            name:'Waiting For You',
            singer:'Waiting For You',
            path:'./assets/mp3 Music_PlayList/waitting_for_you.mp3',
            img:'./assets/thumb Music_PlayList/img-waitttingforyou.webp'
        }
        ,{
            name: 'Cô Đơn Trên Sofa (Cover)',
            singer: 'Trung Quân Idol',
            path:'./assets/mp3 Music_PlayList/co_do_tren_sofa.mp3',
            img:'./assets/thumb Music_PlayList/img-codontrensofa.jpg'
        }
        ,{
            name:'Cưới Vợ Miền Tây',
            singer:'Huỳnh James, Pjnboys',
            path:'./assets/mp3 Music_PlayList/cuoi_vo_mien_tay.mp3',
            img:'./assets/thumb Music_PlayList/img-cuoivomientay.jpg'
        }
        ,{
            name:'Hãy Trao Cho Anh',
            singer:'Sơn Tùng M-TP, Snoop Dogg',
            path:'./assets/mp3 Music_PlayList/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3',
            img:'./assets/thumb Music_PlayList/img-haytraochoanh2.jpeg'
        }
        ,{
            name:'Tòng Phu',
            singer:'Keyo',
            path:'./assets/mp3 Music_PlayList/tong_phu.mp3',
            img:'./assets/thumb Music_PlayList/img-tongphu.webp'
        }
        ,{
            name:'Vỡ Tan',
            singer:'Hiền Hồ - Trịnh Thăng Bình',
            path:'./assets/mp3 Music_PlayList/Vo-Tan-Hien-Ho-x-Trinh-Thang-Binh.mp3',
            img:'./assets/thumb Music_PlayList/img-votan4.jpeg'
        }
    ],
renderSong: function() {
      var htmls = app.songs.map(function(song, index) {
            return `
            <div data-index="${index}" class="music-list-item ${index === app.currentIndex ? "seleted" : "" }" >
                <div class="music-list-item-cdthumb">
                    <img src="${song.img}" alt="">
                </div>
                <div class="music-list-item-content">
                    <h3 class="music-list-content">${song.name}</h3>
                    <p class="music-list-description">${song.singer}</p>
                </div>
            </div>
            `
        })
        musicList.innerHTML = htmls.join('');
    } ,
    //Lấy bài hát đầu tiên //
    definePropertys: function() {
        Object.defineProperty(this,'currentSong',{
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function() {
        musicName.textContent = this.currentSong.name;
        musicSinger.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
        audio.src = this.currentSong.path;
    },
    // Xử lý các sự kiện 
    HandelEventsBtn: function() {
        playMusic.addEventListener('click', function() {
            if(app.isPlaying) {
                audio.pause()
                cdRotate.pause()
            }else {
                audio.play()
                cdRotate.play()
            }
            // Xử lý sự kiện play, pause
            audio.onplay = function() {
                app.isPlaying = true;
                player.classList.add('playing');
            }
            audio.onpause = function() {
                app.isPlaying = false;
                player.classList.remove('playing');
            }
        });
        // Tua bài hát
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        audio.ontimeupdate= function() {
            if(audio.duration){

            // Phần trăm trên thanh progress
            const progressRange = (audio.currentTime / audio.duration) * 100
            progress.value = progressRange

            // Xử lý thời gian ( time current)
            let currentMinutes = Math.floor(audio.currentTime / 60);
            let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60 );
            if(currentMinutes < 10) {
                currentMinutes = `0${currentMinutes}`
            }
            if(currentSeconds < 10) {
                currentSeconds = `0${currentSeconds}`
            }
            currenTime.innerText = `${currentMinutes}:${currentSeconds}`;
            }
        }
            // Xử lý thời gian ( duration time)
            audio.onloadedmetadata = function() {
            let durationMinutes =Math.floor(audio.duration / 60)
            let durationSeconds = Math.floor(audio.duration % 60);
            if(durationMinutes < 10) {
                durationMinutes = `0${durationMinutes}`
            }
            if(durationSeconds < 10) {
                durationSeconds = `0${durationSeconds}`
            }
            dutationTime.innerText = `${durationMinutes}:${durationSeconds}`;
        }
            // Tăng, giảm âm lượng
            volumeMusic.oninput = function(e) {
            const volumeChange = e.target.value
            audio.volume = volumeChange / 100

            if(volumeChange == 0) {
                btnhigh.classList.add('active')
                btnlow.classList.remove('active')
            }else{
                btnhigh.classList.remove('active')
                btnlow.classList.add('active')
            }
        }
            // Khi bấm bật, tắt nút volume
            btnhigh.onclick = function() {
                btnhigh.classList.add('active')
                btnlow.classList.remove('active')
                volumeMusic.value = 0
                audio.volume = 0
            }    
            btnlow.onclick = function() {
                btnhigh.classList.remove('active')
                btnlow.classList.add('active')
                volumeMusic.value = 100
                audio.volume = 1
            }  
            
            // cb thumb quay 
            const cdRotate =cdThumb.animate([
                { transform: 'rotate(360deg'}
            ],{
                duration: 10000,
                iterations: Infinity
            })
            cdRotate.pause()

            //  khi next bài hát
            next.onclick = function() {
                if(app.isShuffle) {
                    app.shuffleSong()
                }else{
                    app.nextSong()
                }
                audio.play()  
                cdRotate.play()
                app.renderSong()
                app.isPlaying = true;
                player.classList.add('playing');
            }
            // khi prev bài hát
            prev.onclick = function() {
                if(app.isShuffle) {
                    app.shuffleSong()
                }else{
                    app.prevSong()
                }
                audio.play()
                cdRotate.play()
                app.renderSong()
                app.isPlaying = true;
                player.classList.add('playing');
            }
            // Khi Xáo trộn bài hát
            shuffle.onclick = function() {
                app.isShuffle =!app.isShuffle
                shuffle.classList.toggle('btn-active', app.isShuffle)

            }
            // Khi lặp lại bài hát
            repeat.onclick = function() {
                app.isRepeat = !app.isRepeat
                repeat.classList.toggle('btn-active', app.isRepeat)
            }
            // Khi kết thúc audio và next qua bài hát tiếp theo
            audio.onended = function() {
                if(app.isRepeat) {
                    audio.play()
                }else {
                    next.click()
                }
            }
            //  Khi bấm vào icon trên thanh menu
            header.onclick = function(e) {
                const iconMenu = e.target.closest('.header-icon')
                if(iconMenu) {
                    if(app.isMenu) {
                        app.isMenu = false
                        header.classList.remove('none')
                        musicdashboard.classList.remove('display-none')
                    }else {
                        app.isMenu = true
                        header.classList.add('none')
                        musicdashboard.classList.add('display-none')
                    }
                }

            }
            // Khi click vào playlist
            musicList.onclick = function(e) {
                const musicNode = e.target.closest('.music-list-item')

                if(musicNode) {
                    app.currentIndex = Number(musicNode.dataset.index)

                    app.loadCurrentSong()
                    app.renderSong()
                    audio.play()
                    cdRotate.play()
                    app.isPlaying = true;
                    player.classList.add('playing');
                    header.classList.remove('none')
                    musicdashboard.classList.remove('display-none')                    
                }
            }
    },

    // Next song
    nextSong: function() {
        app.currentIndex++
        if(app.currentIndex >= app.songs.length) {
            app.currentIndex = 0
        }
        app.loadCurrentSong()
    },    
    // Previous song
    prevSong: function() {
        app.currentIndex--
        if(app.currentIndex < 0) {
            app.currentIndex = app.songs.length -1
        }
        app.loadCurrentSong()
    },
    // Xáo trộn bài hát
    shuffleSong: function() {
        var newindex
        do {
            newindex = Math.floor(Math.random() * app.songs.length)
        } while (newindex === app.currentIndex)
        app.currentIndex = newindex
        app.loadCurrentSong()
    },

    start: function() {
        this.definePropertys()
        this.loadCurrentSong()
        this.HandelEventsBtn()
        this.renderSong()
    }
}

app.start()


