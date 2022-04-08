$(document).ready(function(){
	/*--
	Переменные 
	-----------------------------------*/
	var windows = $(window),
		doc = $(document),
		body = $('body'),
		searchButton = $('.mobile-search-icon'),
		search = $('.col-search'),
		searchInput = $('#s'),
		searchActive = false;


	/*--
	Окошко информации о политике конфиденциальности  
	-----------------------------------*/		
	var messageAlert = localStorage.getItem('message-alert');
	if (messageAlert != 1) { $('.message-alert').fadeIn(200); };

	$(".message-btn-yes").click(function() {
		localStorage.setItem('message-alert', 1);
		$(".message-alert").fadeOut(200);
	});

	$('.message-btn-no').click(function(){
		window.location.href="http://www.yandex.ru/"; 	/*-- Задаем куда перенаправлять полльзователя после того как он нажмет нет --*/	
	});	


	/*--
	Табы 
	-----------------------------------*/	
	$(".cat_tab").click(function() {
		var t = $(this).attr('data-id'),
			p = $(this).parent(),
			pp = $(this).parent().parent();
		$('.cat_tab', p).removeClass('active');
		$('.cat_wrap', pp).removeClass('active');
		$(this).addClass('active');
		$('.' + t, pp).addClass('active');
		return false;
	});
	$(".tabs").each(function() {
		$("li.tab", this).click(function() {
			$(".tabs li").removeClass("active");
			$(this).addClass("active");
			$(".wrap").hide();
			var activeTab = $(this).attr("data-id");
			$("#" + activeTab).fadeIn("fast");
			return false;
		});
	});
	/*--
	Поиск 
	-----------------------------------*/	
	searchButton.click(function() {
		if(search.hasClass('show')) {
			search.removeClass('show');
			searchButton.removeClass('show');
			searchActive = false;
		} else {
			search.addClass('show');
			searchButton.addClass('show');
			searchInput.focus();
			searchActive = true;
		}
	});
	doc.on('click', function(e) {
		if(searchActive) {
			if(!searchButton.is(e.target) && searchButton.has(e.target).length === 0 && !search.is(e.target) && search.has(e.target).length === 0) {
				search.removeClass('show');
				searchButton.removeClass('show');
				searchActive = false;
			}
		}
	});
	var sourceButton = $('.video-sources');
	var source = $('.video-sources-toggle');
	var sourceActive = false;
	sourceButton.click(function() {
		if(source.hasClass('show')) {
			source.removeClass('show')
			sourceActive = false;
		} else {
			source.addClass('show')
			sourceActive = true;
		}
	});
	doc.on('click', function(e) {
		if(sourceActive) {
			if(!sourceButton.is(e.target) && sourceButton.has(e.target).length === 0 && !source.is(e.target) && source.has(e.target).length === 0) {
				source.removeClass('show');
				sourceActive = false;
			}
		}
	});

	/*--
	Мобильное меню 
	-----------------------------------*/	
	$.sidebarMenu($('.sidebar-menu'));

    $('.mobile-menu-icon').click(function () {	
      $('.animate-menu-left').addClass('animate-menu-open');
      $('.animate-menu-left').before('<div class="modal-bg"></div>');
      $('.modal-bg').fadeIn(200);
    })
    body.on('click', '.modal-bg', function() {
		$('.modal-inner, .modal-bg').fadeOut(200);
		$('.animate-menu-left').removeClass('animate-menu-open');
	});

	/*--
	Ajax Алфавит
	-----------------------------------*/
	body.on("click", "[data-ajax]:not(.active)", function(){
			var $castom = $(this).attr("data-ajax"),
				$targetBox = $(this).closest('.sidesearch-alphabet').find('.sidesearch-alphabet-wrp');
			$targetBox.html(ShowLoading(''));
			$.post(dle_root+"engine/ajax/custom.php", {castom:$castom}, function(data){
				$targetBox.html(data);
			});
			$targetBox.html( HideLoading('') );
			$(this).addClass('active').siblings().removeClass('active');
		});
	/*--
	Группировка новостей по дате
	-----------------------------------*/
	if($("[data-date]").length > 0) {
		var a = $("[data-date]"),
			b = {};
		a.each(function() {
			b[$(this).data("date")] = ""
		});
		for(date in b) a.filter("[data-date=" + date + "]").wrapAll('<div class="group"></div>').eq(0).before('<div class="date_update"><span>' + date + "</span></div>")
	}
	/*--
	Карусели
	-----------------------------------*/
	if($('.owl-top-in').length > 0) {
	var slider = $('.owl-top-in');
		
		slider.owlCarousel({
			items:5,
			loop:false,
			rewind:true,
			nav:true,
			navText:['<span class="far fa-caret-left" aria-hidden="true"></span>','<span class="far fa-caret-right" aria-hidden="true"></span>'],
			slideBy:1,
			dots:false,
			autoplay:true,
			autoplayTimeout:12000,
			margin:5,
			responsive: {
				0: {
					items: 2,
					nav:false, 
					dots:true
				},
				480: {
					items: 3,
				},
				768: {
					items: 4,
					nav:true, dots:false
				},
				992: {
					items: 5,
				},
				1200: {
					items: 7,
				}
			},
			onInitialized: sliderNextPrev,
			onChanged: sliderNextPrev
		});
		
		function sliderNextPrev(event) {
			var item = event.item.index, count = event.item.count, prev, next;
			prev = item-1;
			next = item+1;
			imgsrc = $('.owl-top .tc-img').eq(prev).find('img').attr('src');
			$('.owl-top').css({'background':'#111 url('+imgsrc+') center  center / cover no-repeat'});
		};
	};
	if($('.movies-colections .slider').length > 0) {
		$('.movies-colections .slider').owlCarousel({
			rewind: true,
			autoplay: true,
			margin: 20,
			nav: true,
			navText: ['<span class="fa fa-caret-left" aria-hidden="true"></span>', '<span class="fa fa-caret-right" aria-hidden="true"></span>'],
			dots: false,
			lazyLoad: true,
			autoplayTimeout: false,
			autoplayHoverPause: true,
			responsive: {
				0: {
					items: 2,
				},
				480: {
					items: 2,
				},
				768: {
					items: 2,
				},
				992: {
					items: 3,
				},
				1200: {
					items: 4,
				}
			}
		})
	};
	if($('.mix-movies-con .slider').length > 0) {
		$('.mix-movies-con .slider').owlCarousel({
			rewind: true,
			autoplay: true,
			margin: 20,
			nav: true,
			navText: ['<span class="far fa-caret-left" aria-hidden="true"></span>', '<span class="far fa-caret-right" aria-hidden="true"></span>'],
			dots: false,
			lazyLoad: true,
			autoplayTimeout: false,
			autoplayHoverPause: true,
			responsive: {
				0: {
					items: 2,
				},
				480: {
					items: 3,
				},
				768: {
					items: 4,
				},
				992: {
					items: 4,
				},
				1200: {
					items: 4,
				}
			}
		})
	};
	if($('.related-movies .owl-carousel').length > 0) {
		$('.related-movies .owl-carousel').owlCarousel({
			rewind: true,
			autoplay: true,
			margin: 30,
			nav: true,
			navText: ['<span class="far fa-caret-left" aria-hidden="true"></span>', '<span class="far fa-caret-right" aria-hidden="true"></span>'],
			dots: false,
			lazyLoad: true,
			autoplayTimeout: 2400,
			autoplayHoverPause: true,
			responsive: {
				0: {
					items: 2,
				},
				480: {
					items: 3,
				},
				768: {
					items: 4,
				},
				992: {
					items: 6,
				},
				1200: {
					items:6,
				}
			}
		})
	};
	if($('.topcategory .slider').length > 0) {
		$('.topcategory .slider').owlCarousel({
			rewind: true,
			autoplay: true,
			margin: 10,
			nav: true,
			navText: ['<span class="fa fa-caret-left" aria-hidden="true"></span>', '<span class="fa fa-caret-right" aria-hidden="true"></span>'],
			dots: false,
			lazyLoad: true,
			autoplayTimeout: 2400,
			autoplayHoverPause: true,
			responsive: {
				0: {
					items: 2,
				},
				480: {
					items: 3,
				},
				768: {
					items: 4,
				},
				992: {
					items: 5,
				},
				1200: {
					items: 7,
				}
			}
		})
	};

	/*--
	Модальное окно
	-----------------------------------*/
	$('.modal-login').click(function() {
		if($('.modal-bg').length < 1) {
			$('.modal-inner').before('<div class="modal-bg"></div>');
			$('.modal-inner').prepend('<div class="modal-close"><span class="fa fa-times"></span></div>');
		};
		$('.modal-inner, .modal-bg').fadeIn(200);
	});
	body.on('click', '.modal-bg, .modal-close', function() {
		$('.modal-inner, .modal-bg').fadeOut(200);
	});
	$('.btn-modal').click(function() {
		$('#' + $(this).data('modal') + '').dialog({
			autoOpen: true,
			modal: true,
			show: 'fade',
			hide: 'fade',
			width: 600
		});
	});
	/*--
	Ajax смена вида новостей 
	-----------------------------------*/
	body.on("click", "[data-temp*=this_]", function() {
		if($(this).hasClass("activetempajax")) {
			return false;
		} else {
			ShowLoading('');
			$(".templater > a").removeClass("activetempajax");
			$(this).addClass("activetempajax");
			var $temp = $(this).attr("data-nametemp");
			var $catid = $(this).attr("data-catid");
			var $pageid = $(this).attr("data-pageid");
			$.post(dle_root + "engine/ajax/ajax_template.php", {
				template_ajax: $temp,
				cstart: $pageid,
				category_id: $catid
			}, function(data) {
				if(data) {
					$("#dle-content").html(data);

					/*--
					Информация о "" в спике - плитка
					-----------------------------------*/	
					$('.show-desc').hover(
						function() {
							var $winWidth = window.innerWidth;
							var $movieItem = $(this).closest('.m-info');
							$movieItem.removeClass('mdleft');
							var $moviePos = $movieItem.offset().left;
							if ($moviePos > $winWidth/3) {
								$movieItem.addClass('mdleft');
							}
							$movieItem.parent().toggleClass('active');
							$movieItem.toggleClass('active').find('.dtinfo').stop(true,true).fadeToggle(200);
					});	

					/*--
					Рейтинг во всех tpl шаблонах по 10 бальной шкале
					-----------------------------------*/
					$('.mrating,.rating-vgs').$TenRate();
					/*--
					Рейтинг во всех tpl шаблонах в процентах
					-----------------------------------*/
					$('.pr-rating').wRatePercent();

					/*--
					Рейтинг во всех tpl шаблонах для вывода оценки диаграммой
					-----------------------------------*/
					$(".drating-count").each(function() {
				            var a = $(this),
				                b = a.next(),
				                c = parseInt(b.find(".ratingtypeplusminus").text()),
				                d = parseInt(b.find("span[id]:last").text());
				            if (d >= c && d > 0) var e = Math.round((d - (d - c) / 2) / d * 100) / 10;
				            else var e = 0;
				            a.append("<div>" + e + "<div></div></div>"), setTimeout(function() {
				               /*-- a.circleProgress({
				                    size: 40,
				                    startAngle: -1.5,
				                    lineCap: "round",
				                    value: e / 10,
				                    emptyFill: "#1d1c21",
				                    fill: {
				                        gradient: ["#fec20f", "#fec20f"]
				                    }
				                })	-----------------------------------*/
				                 a.circleProgress({
				                    size: 40,
				                    startAngle: -1.5,
				                    lineCap: "round",
				                    value: e / 10,
				                    emptyFill: "#1d1c21",
				                    fill: {
				                        gradient: ["#fec20f", "#fec20f"]
                        				/*-- gradient: ["#17de0c", "#17de0c"] Раскомментировать эту строку, верхнюю закомментировать, цвет зеленый диаграммы--*/
				                    }
				                })
				            }, 400)
				    });



					HideLoading('');
				}
			});
			return false;
		}
	})
	/*--
	Информация о "" в спике - плитка
	-----------------------------------*/
	$('.show-desc').hover(
		function() {
			var $winWidth = window.innerWidth;
			var $movieItem = $(this).closest('.m-info');
			$movieItem.removeClass('mdleft');
			var $moviePos = $movieItem.offset().left;
			if ($moviePos > $winWidth/3) {
				$movieItem.addClass('mdleft');
			}
			$movieItem.parent().toggleClass('active');
			$movieItem.toggleClass('active').find('.dtinfo').stop(true,true).fadeToggle(200);
	});	

	/*--
	Смена фона для коллекций
	-----------------------------------*/	
	$('.collection-item .poster').each(function(){
        var a = $(this), b = a.closest('.collection-item').find('.movie-details'),
      d = ["rgba(28,130,119,0.5)","rgba(136,57,71,0.5)","rgba(175,117,97,0.5)","rgba(72,60,108,0.87)"], 
      c = ["rgba(136,57,71,0.5)","rgba(72,60,108,0.87)","rgba(175,117,97,0.5)","rgba(28,130,119,0.5)"],
      rand = Math.floor(Math.random() * d.length),
      randc = Math.floor(Math.random() * c.length);
    b.attr('style','background: linear-gradient(to left,'+d[rand]+' 0%,'+c[randc]+' 100%)');
  	});

	/*--
	Кнопка наверх
	-----------------------------------*/
	var $gotop = $('#gotop');
	$(window).scroll(function() {
		if($(this).scrollTop() > 300) {
			$gotop.fadeIn(200);
		} else {
			$gotop.fadeOut(200);
		}
	});
	$gotop.click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, 'slow');
	});
	$('.js-fav-count').attr('data-count', $('#l-fav').text());

	/*--
	Вывод колличества закладок
	-----------------------------------*/
	if($('.js-fav-count').data('count') === '') {
    	$('.js-fav-count').hide();
    } else {
    	$('.js-fav-count').show();
    };

	/*--
	Скролл к фильтру
	-----------------------------------*/
	$('.filter-scroll').click(function(){
		$('html, body').animate({ scrollTop : $('#filter').offset().top }, 'slow');
	});

	/*--
	Сообщение в полной новости о рекламе
	-----------------------------------*/
	body.on('click','.fmessage-close',function(){
		sessionStorage.setItem('mess', 1);
		$('.fmessage').hide();
	});
	var mess = sessionStorage.getItem('mess');
	if (mess != 1) {
		$('.fmessage').show();
	};

	/*--
	Сообщение в полной новости о рекламе
	-----------------------------------*/
	function closeMessage(el) {
		el.addClass('is-hidden');
	}
	$('.message-close').on('click', function(e) {
		closeMessage($(this).closest('.Message'));
	});

	/*--
	Свернуть/Развернуть текст
	-----------------------------------*/
	$('.widget-seocategory').$TextSlicer({
		height: '140',
		textExpand: '<span title="Развернуть" class="far fa-plus"></span>',
		textHide: '<span title="Свернуть" class="far fa-minus"></span>'
	});

	/*--
	Рейтинг во всех tpl шаблонах по 10 бальной шкале
	-----------------------------------*/
	$('.mrating,.rating-vgs').$TenRate();

	/*--
	Рейтинг во всех tpl шаблонах в процентах
	-----------------------------------*/
	$('.pr-rating').wRatePercent();

	/*--
	Рейтинг во всех tpl шаблонах для вывода оценки диаграммой
	-----------------------------------*/
	$(".drating-count").each(function() {
            var a = $(this),
                b = a.next(),
                c = parseInt(b.find(".ratingtypeplusminus").text()),
                d = parseInt(b.find("span[id]:last").text());
            if (d >= c && d > 0) var e = Math.round((d - (d - c) / 2) / d * 100) / 10;
            else var e = 0;
            a.append("<div>" + e + "<div></div></div>"), setTimeout(function() {
               a.circleProgress({
                    size: 40,
                    startAngle: -1.5,
                    lineCap: "round",
                    value: e / 10,
                    emptyFill: "#1d1c21",
                    fill: {
                        gradient: ["#fec20f", "#fec20f"]
                        /*-- gradient: ["#17de0c", "#17de0c"] Раскомментировать эту строку, верхнюю закомментировать, цвет зеленый диаграммы--*/
                    }
                })	
            }, 400)
    });

	/*--
	Рейтинг в полной новости
	-----------------------------------*/
	$('.rate-full').each(function(){
        var rate = $(this),
			rdata = rate.find('.ratefull-hide'),
			rrate = parseInt(rdata.find('.ratingtypeplusminus').text(), 10),
			rvote = parseInt(rdata.find('span[id*=vote]').text(), 10);
			rate.append('<div class="ratebar"><div class="ratefill"></div></div>');
		if ( rvote >= rrate && rvote > 0 ) {
			var m = (rvote - rrate)/2, 
				p = rvote - m,
				perc = Math.round(p/rvote*100);
			rate.find('.ratefull-plus span').html(p);
			rate.find('.ratefull-minus span').html(m);
			rate.find('.ratefill').css({'width':''+perc+'%'});
		};
    });

	/*--
	Вкл/выкл свет
	-----------------------------------*/
    $('.player-light').click(function(){
		if ( $('.modal-bg').length < 1 ) {
			$('.fullmovie-box').prepend('<div class="modal-bg"></div>');
		};
		$('body').toggleClass('light-off');
		var t = $(this);
		t.text(t.text() == 'Выкл. Кинотеатр' ? ' Кинотеатр' : 'Кинотеатр');
	});

    /*--
	Ajax добавление закладок
	-----------------------------------*/
	doc.on('click', '.favmod', function(e){
		e.preventDefault();
		var $this = $(this);
		ShowLoading();
		$.ajax({
			url: dle_root + 'engine/mods/favorites/ajax.php',
			type: 'POST',
			dataType: 'json',
			data: {newsid: $this.data('id')},
		})
		.done(function() {
			$this.toggleClass('active');
			if ($this.hasClass('active')) {
				$("body").overhang({type: "success",message: "Публикация добавлена в закладки"});
			}else {
				$("body").overhang({type: "success",message: "Публикация убрана из закладок"});
			};
		})
		.fail(function(error) {
			DLEalert(error.responseText, dle_info);
		})
		.always(function() {
			HideLoading();
		});
	});

	/*--
	Определение AddBlock
	-----------------------------------*/
	var adBlockDetected = function() {
		$("body").overhang({
			custom: true,
			message: "Паважаны глядач, мы заўважылі, што Вы карыстаецеся Адблок або падобнае прыкладанне! Калі ласка, унясіце наш сайт у спіс выключэнняў, каб у Вас не было праблем з плэерам. Дзякуй!",
			closeConfirm: true,
			textColor: "#fff",
		  	primary: "#1d1c21db",
		  	accent: "#ffc107",
		});
	  return false;
	}

		// We observe if the variable "fuckAdBlock" exists
	if(typeof  FuckAdBlock === 'undefined') {
		 $(document).ready(adBlockDetected);
	} else {
		fuckAdBlock.on(true, adBlockDetected);
	}

	// player on full story page
	function player() {
		function fetchIMDB(id){
      if(!id) return
      jQuery.get('/imdb-parser/imdb.php?id='+id,
      function( data ) {
        if(data){
          $('#rating').append(data);
          $('#ratingIMDB').show();
        }
      })
		}
		function generateLinks(array,placeToPut){
			var allVideoLinks = []
			array.forEach(function(item){
				allVideoLinks.push($('<button />',{
					'type': 'button',
					'text': item.name,
					'data-link':item.link
				}))
			});
			if(allVideoLinks.length){
				$(placeToPut).append(allVideoLinks);
			} 
		}

		generateLinks(window.$videoText,'#player-list-text')
		generateLinks(window.$videoVoice,'#player-list-voice')
    fetchIMDB(window.$imdb)

		/* click tab */
		function clickTab(button){
			var clickedButton = typeof button === 'string' ?  button : this;
			$('.player-list-title button').removeClass('active');
			$(clickedButton).addClass('active');

			$('.player-list-text').removeClass('active')
			$('.player-list-text').eq($(clickedButton).index()).addClass('active')
		}
		jQuery('.player-list-title button').on('click',clickTab);


		/* render frame */
		var videoLink = null;

		var videoLinkVoice = $('#player-list-voice button').eq(0);
		if(videoLinkVoice.attr("data-link")){
			videoLink = videoLinkVoice.attr("data-link");
			videoLinkVoice.addClass('active');
		}else{
			var videoLinkText = $('#player-list-text button').eq(0)
			if(videoLinkText.attr("data-link")){
				videoLink = videoLinkText.attr("data-link");
				videoLinkText.addClass('active');
			}
		}

		if(videoLink){
			setIframe(videoLink)
		}


		$('.player-list-text button').on('click',function(){
			$('.player-list-text button').removeClass('active')
			$(this).addClass('active')
			var newLink = $(this).attr("data-link");
			setIframe(newLink)
		});


		/* hide if empty voice*/
		var voiceLinksLenght = $('#player-list-voice button').length
		var textLinksLenght = $('#player-list-text button').length

		if(voiceLinksLenght === 0 && textLinksLenght === 1 ||
			voiceLinksLenght === 1 && textLinksLenght === 0){
			return
		}

		if(voiceLinksLenght === 0){
			clickTab('#player-show-text');
			$('#player-show-voice').remove();
		}

		/* hide if empty text*/
		if(textLinksLenght === 0){
			$('#player-show-text').remove();
		}

		/* finish render show list*/
		$('.player-list').show();
	}


	if(window.$videoText || window.$videoVoice){
		player();
	}

	function setIframe(videoLink){
		var frame = $('<iframe />',{
			width:"100%",
			allowFullScreen:"",
			allowTransparency:"",
			allow:"autoplay",
			src: videoLink,
			id:"video-frame"
		});
		$('.player').html(frame);
	}

	
	
	function renderSeries(){
		if(!window.$series) return;
		window.$series.forEach((item)=>{
			$('#series').append('<a href='+item.link+'>'+item.name+'</a>');
		})
	}
	renderSeries();

	// telegram-adv
	(function (){
		if(!document.getElementById('player')) return false;
		document.getElementById('player').insertAdjacentHTML("afterbegin",'<div  class="player-adv"><a  target="_blank" href="https://t.me/kykymba_by"><div class="player-adv-img"></div><div class="player-adv-text">Сачыце за навінамі Кукумбы ў нашым тэлеграм-канале<br><div class="player-adv-link">https://t.me/kykymba_by</div></div></a><div class="player-adv-close" id="player-adv-close">Схаваць</div></div>')

		document.querySelector('#player-adv-close').addEventListener('click', function(e) {
			document.querySelector('.player-adv').remove();
		})

		window.addEventListener('blur',function(e){
			if(document.activeElement.getAttribute('id')==='video-frame'){
				document.querySelector('.player-adv').remove();
			}
		});
	})();
	
	// check age
	(function (){
		if(!document.getElementById('player')) return false;
		
		var age = document.getElementById('age').textContent;
		if(age==='18+'){
			document.getElementById('player').insertAdjacentHTML("afterbegin",'<div class="player-confirm"><div class="player-confirm-text">Вам ёсць 18 гадоў?</div><div class="player-confirm-buttons"><button id="player-confirm-yes">Так</button><button id="player-confirm-no">Не</button></div></div>')

			document.querySelector('#player-confirm-no').addEventListener('click', function(){
				document.querySelector('.player-confirm-buttons').remove();
				document.querySelector('.player-confirm-text').innerHTML = 'Прагляд відэа абмежаваны ўзростам 18+. <br> Калі ласка, выберыце другое відэа для прагляду'
			})

			document.querySelector('#player-confirm-yes').addEventListener('click', function(){
				document.querySelector('.player-confirm').remove();
			})
		}
		
	})();
	
});



/*--
	Свернуть/Развернуть текст
	-----------------------------------*/
jQuery.fn.$TextSlicer = function(options){
   var options = jQuery.extend({
    height: '200',
    textExpand: 'expand text',
    textHide: 'hide text'
    },options);
   return this.each(function() {
     var a = $(this),
       h = a.outerHeight();
     if ( h > options.height ) {
       a.addClass('widget-seocategory slice-masked').attr('data-height',h).height(options.height).after('<div class="slice-button"><span class="slice-inner">'+options.textExpand+'</span></div>');
     };
     var bt = $(this).next('.slice-button').children('span');
     bt.click(function() {
       var ah = parseInt(a.css("height"), 10);
       ah == h ? a.css({'height':options.height}) : a.css({'height':h});
       bt.html(bt.html() == options.textExpand ? options.textHide : options.textExpand);
       a.toggleClass('slice-masked');
     });
   });
};


/*--
	Первая буква логина в аватаре
	-----------------------------------*/
(function(w, d){
        function LetterAvatar (name, size) {
            name  = name || '';
            size  = size || 60;
            var colours = [
                    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", 
                    "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
                ],
                nameSplit = String(name).toUpperCase().split(' '),
                initials, charIndex, colourIndex, canvas, context, dataURI;
            if (nameSplit.length == 1) {
                initials = nameSplit[0] ? nameSplit[0].charAt(0):'?';
            } else {
                initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
            }
            if (w.devicePixelRatio) {
                size = (size * w.devicePixelRatio);
            }
            charIndex     = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
            colourIndex   = charIndex % 20;
            canvas        = d.createElement('canvas');
            canvas.width  = size;
            canvas.height = size;
            context       = canvas.getContext("2d");
            context.fillStyle = colours[colourIndex - 1];
            context.fillRect (0, 0, canvas.width, canvas.height);
            context.font = Math.round(canvas.width/2)+"px Arial";
            context.textAlign = "center";
            context.fillStyle = "#FFF";
            context.fillText(initials, size / 2, size / 1.5);
            dataURI = canvas.toDataURL();
            canvas  = null;
            return dataURI;
        }
        LetterAvatar.transform = function() {
            Array.prototype.forEach.call(d.querySelectorAll('img[avatar]'), function(img, name) {
                name = img.getAttribute('avatar');
                img.src = LetterAvatar(name, img.getAttribute('width'));
                img.removeAttribute('avatar');
                img.setAttribute('alt', name);
            });
        };
        if (typeof define === 'function' && define.amd) {
            define(function () { return LetterAvatar; });
        } else if (typeof exports !== 'undefined') {
            if (typeof module != 'undefined' && module.exports) {
                exports = module.exports = LetterAvatar;
            }
            exports.LetterAvatar = LetterAvatar;
        } else {
            window.LetterAvatar = LetterAvatar;
            d.addEventListener('DOMContentLoaded', function(event) {
                LetterAvatar.transform();
            });
        }
    })(window, document);



/*--
	Рейтинг - оценка 10
	-----------------------------------*/
jQuery.fn.$TenRate = function(){
	return this.each(function() {
		var a = $(this);
		var b = parseInt(a.find('.ratingtypeplusminus').text(),10);
		var c = parseInt(a.find('span[id*=vote]').text(),10);
        if ( c >= b && c > 0 ) {
        var t = (Math.round((c - (c - b)/2)/c*100))/10;
        a.text(t).addClass('high');
		if ( t < 5 ) { a.addClass('low'); }
        } else {a.text('0');};
		a.addClass('wdone');
	});
};
/*--
	Рейтинг  процентах  <div class="short-rate-perc">{rating}{vote-num}</div>
	-----------------------------------*/
jQuery.fn.wRatePercent = function(){
	return this.each(function() {
		var a = $(this);
		var b = parseInt(a.find('.ratingtypeplusminus').text(),10);
		var c = parseInt(a.find('span[id*=vote]').text(),10);
        if ( c >= b && c > 0 ) {
        var t = Math.round((c - (c - b)/2)/c*100);
        a.text(t+'%').addClass('high');
		if ( t < 50 ) { a.addClass('low'); }
        } else {a.text('0%');};
		a.addClass('wdone');
	});
};
/*--
	Функция рейтинг DLE
	-----------------------------------*/
function doRateLD( rate, id ) {
		ShowLoading('');
		$.get(dle_root + "engine/ajax/controller.php?mod=rating", { go_rate: rate, news_id: id, skin: dle_skin, user_hash: dle_login_hash }, function(data){
			HideLoading('');
			if ( data.success ) {
				var rating = data.rating;
				rating = rating.replace(/&lt;/g, "<");
				rating = rating.replace(/&gt;/g, ">");
				rating = rating.replace(/&amp;/g, "&");
				$("#ratig-layer-" + id).html(rating);
				$("#vote-num-id-" + id).html(data.votenum);
				var rt = parseInt($(rating).text()),
					m = (data.votenum - rt)/2,
					p = data.votenum - m,
					perc = Math.round(p/data.votenum*100),
					fRate = $("#rate-" + id);
				fRate.find('.ratefull-plus span').html(p);
				fRate.find('.ratefull-minus span').html(m);
				fRate.find('.ratefill').css({'width':''+perc+'%'});
			} else if (data.error) {DLEalert ( data.errorinfo, dle_info );}
		}, "json");
	};


/*--
	Функция окна информации DLE
	-----------------------------------*/
function DLEalert(a,c){$("body").overhang({type: "success",message: a});};

/*! Lazy Load 2.0.0-beta.2 - MIT license - Copyright 2007-2017 Mika Tuupola */
!function(t,e){"object"==typeof exports?module.exports=e(t):"function"==typeof define&&define.amd?define([],e(t)):t.LazyLoad=e(t)}("undefined"!=typeof global?global:this.window||this.global,function(t){"use strict";function e(t,e){this.settings=r(s,e||{}),this.images=t||document.querySelectorAll(this.settings.selector),this.observer=null,this.init()}const s={src:"data-src",srcset:"data-srcset",selector:".lazyload"},r=function(){let t={},e=!1,s=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],s++);for(;s<o;s++)!function(s){for(let o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e&&"[object Object]"===Object.prototype.toString.call(s[o])?t[o]=r(!0,t[o],s[o]):t[o]=s[o])}(arguments[s]);return t};if(e.prototype={init:function(){if(!t.IntersectionObserver)return void this.loadImages();let e=this,s={root:null,rootMargin:"0px",threshold:[0]};this.observer=new IntersectionObserver(function(t){t.forEach(function(t){if(t.intersectionRatio>0){e.observer.unobserve(t.target);let s=t.target.getAttribute(e.settings.src),r=t.target.getAttribute(e.settings.srcset);"img"===t.target.tagName.toLowerCase()?(s&&(t.target.src=s),r&&(t.target.srcset=r)):t.target.style.backgroundImage="url("+s+")"}})},s),this.images.forEach(function(t){e.observer.observe(t)})},loadAndDestroy:function(){this.settings&&(this.loadImages(),this.destroy())},loadImages:function(){if(!this.settings)return;let t=this;this.images.forEach(function(e){let s=e.getAttribute(t.settings.src),r=e.getAttribute(t.settings.srcset);"img"===e.tagName.toLowerCase()?(s&&(e.src=s),r&&(e.srcset=r)):e.style.backgroundImage="url("+s+")"})},destroy:function(){this.settings&&(this.observer.disconnect(),this.settings=null)}},t.lazyload=function(t,s){return new e(t,s)},t.jQuery){const s=t.jQuery;s.fn.lazyload=function(t){return t=t||{},t.attribute=t.attribute||"data-src",new e(s.makeArray(this),t),this}}return e});

/**
 * overhang.min.js
 * Paul Krishnamurthy 2016
 *
 * https://paulkr.com
 * paul@paulkr.com
 */

$.fn.overhang=function(e){function o(e,o){r.fadeOut(100),a.slideUp(c.speed,function(){e&&c.callback(null!==o?n.data(o):"")})}var n=$(this),a=$("<div class='overhang'></div>"),r=$("<div class='overhang-overlay'></div>");$(".overhang").remove(),$(".overhang-overlay").remove();var t={success:["#2ECC71","#27AE60"],error:["#E74C3C","#C0392B"],warn:["#E67E22","#D35400"],info:["#3498DB","#2980B9"],prompt:["#9B59B6","#8E44AD"],confirm:["#1ABC9C","#16A085"],"default":["#95A5A6","#7F8C8D"]},s={type:"success",custom:!1,message:"This is an overhang.js message!",textColor:"#FFFFFF",yesMessage:"Yes",noMessage:"No",yesColor:"#2ECC71",noColor:"#E74C3C",duration:1.5,speed:500,closeConfirm:!1,upper:!1,easing:"easeOutBounce",html:!1,overlay:!1,callback:function(){}},c=$.extend(s,e);c.type=c.type.toLowerCase();var l=["success","error","warn","info","prompt","confirm"];-1===$.inArray(c.type,l)&&(c.type="default",console.log("You have entered invalid type name for an overhang message. Overhang resorted to the default theme.")),c.custom?(c.primary=e.primary||t["default"][0],c.accent=e.accent||t["default"][1]):(c.primary=t[c.type][0]||t["default"][0],c.accent=t[c.type][1]||t["default"][1]),("prompt"===c.type||"confirm"===c.type)&&(c.primary=e.primary||t[c.type][0],c.accent=e.accent||t[c.type][1],c.closeConfirm=!0),a.css("background",c.primary),a.css("border-bottom","6px solid "+c.accent);var p=$("<span class='overhang-message'></span>");p.css("color",c.textColor),c.html?p.html(c.message):p.text(c.upper?c.message.toUpperCase():c.message),a.append(p);var i=$("<input class='overhang-prompt-field' />"),u=$("<button class='overhang-yes-option'>"+c.yesMessage+"</button>"),d=$("<button class='overhang-no-option'>"+c.noMessage+"</button>");if(u.css("background",c.yesColor),d.css("background",c.noColor),c.closeConfirm){var m=$("<span class='overhang-close'></span>");m.css("color",c.accent),"confirm"!==c.type&&a.append(m)}if("prompt"===c.type?(a.append(i),n.data("overhangPrompt",null),i.keydown(function(e){13==e.keyCode&&(n.data("overhangPrompt",i.val()),o(!0,"overhangPrompt"))})):"confirm"===c.type&&(a.append(u),a.append(d),a.append(m),n.data("overhangConfirm",null),u.click(function(){n.data("overhangConfirm",!0),o(!0,"overhangConfirm")}),d.click(function(){n.data("overhangConfirm",!1),o(!0,"overhangConfirm")})),n.append(a),a.slideDown(c.speed,c.easing),c.overlay&&(c.overlayColor&&r.css("background",c.overlayColor),n.append(r)),c.closeConfirm&&!e.duration)m.click(function(){"prompt"!==c.type&&"confirm"!==c.type?o(!0,null):o(!1,null)});else if(c.closeConfirm&&e.duration){var f=setTimeout(function(){a.slideUp(c.speed,function(){o(!0,null)})},1e3*c.duration);m.click(function(){clearTimeout(f),"prompt"!==c.type&&"confirm"!==c.type?o(!0,null):o(!1,null)})}else a.delay(1e3*c.duration).slideUp(c.speed,function(){o(!0,null)})};
 
/*
* jquery-circle-progress - jQuery Plugin to draw animated circular progress bars:
* http://kottenator.github.io/jquery-circle-progress/
*/
!function(i){"function"==typeof define&&define.amd?define(["jquery"],i):"object"==typeof module&&module.exports?module.exports=function(t,e){return void 0===e&&(e="undefined"!=typeof window?require("jquery"):require("jquery")(t)),i(e),e}:i(jQuery)}(function(i){function t(i){this.init(i)}t.prototype={value:0,size:100,startAngle:-Math.PI,thickness:"auto",fill:{gradient:["#3aeabb","#fdd250"]},emptyFill:"rgba(0, 0, 0, .1)",animation:{duration:1200,easing:"circleProgressEasing"},animationStartValue:0,reverse:!1,lineCap:"butt",insertMode:"prepend",constructor:t,el:null,canvas:null,ctx:null,radius:0,arcFill:null,lastFrameValue:0,init:function(t){i.extend(this,t),this.radius=this.size/2,this.initWidget(),this.initFill(),this.draw(),this.el.trigger("circle-inited")},initWidget:function(){this.canvas||(this.canvas=i("<canvas>")["prepend"==this.insertMode?"prependTo":"appendTo"](this.el)[0]);var t=this.canvas;if(t.width=this.size,t.height=this.size,this.ctx=t.getContext("2d"),window.devicePixelRatio>1){var e=window.devicePixelRatio;t.style.width=t.style.height=this.size+"px",t.width=t.height=this.size*e,this.ctx.scale(e,e)}},initFill:function(){function t(){var t=i("<canvas>")[0];t.width=e.size,t.height=e.size,t.getContext("2d").drawImage(g,0,0,r,r),e.arcFill=e.ctx.createPattern(t,"no-repeat"),e.drawFrame(e.lastFrameValue)}var e=this,a=this.fill,n=this.ctx,r=this.size;if(!a)throw Error("The fill is not specified!");if("string"==typeof a&&(a={color:a}),a.color&&(this.arcFill=a.color),a.gradient){var s=a.gradient;if(1==s.length)this.arcFill=s[0];else if(s.length>1){for(var o=a.gradientAngle||0,l=a.gradientDirection||[r/2*(1-Math.cos(o)),r/2*(1+Math.sin(o)),r/2*(1+Math.cos(o)),r/2*(1-Math.sin(o))],h=n.createLinearGradient.apply(n,l),c=0;c<s.length;c++){var d=s[c],u=c/(s.length-1);i.isArray(d)&&(u=d[1],d=d[0]),h.addColorStop(u,d)}this.arcFill=h}}if(a.image){var g;a.image instanceof Image?g=a.image:(g=new Image,g.src=a.image),g.complete?t():g.onload=t}},draw:function(){this.animation?this.drawAnimated(this.value):this.drawFrame(this.value)},drawFrame:function(i){this.lastFrameValue=i,this.ctx.clearRect(0,0,this.size,this.size),this.drawEmptyArc(i),this.drawArc(i)},drawArc:function(i){if(0!==i){var t=this.ctx,e=this.radius,a=this.getThickness(),n=this.startAngle;t.save(),t.beginPath(),this.reverse?t.arc(e,e,e-a/2,n-2*Math.PI*i,n):t.arc(e,e,e-a/2,n,n+2*Math.PI*i),t.lineWidth=a,t.lineCap=this.lineCap,t.strokeStyle=this.arcFill,t.stroke(),t.restore()}},drawEmptyArc:function(i){var t=this.ctx,e=this.radius,a=this.getThickness(),n=this.startAngle;i<1&&(t.save(),t.beginPath(),i<=0?t.arc(e,e,e-a/2,0,2*Math.PI):this.reverse?t.arc(e,e,e-a/2,n,n-2*Math.PI*i):t.arc(e,e,e-a/2,n+2*Math.PI*i,n),t.lineWidth=a,t.strokeStyle=this.emptyFill,t.stroke(),t.restore())},drawAnimated:function(t){var e=this,a=this.el,n=i(this.canvas);n.stop(!0,!1),a.trigger("circle-animation-start"),n.css({animationProgress:0}).animate({animationProgress:1},i.extend({},this.animation,{step:function(i){var n=e.animationStartValue*(1-i)+t*i;e.drawFrame(n),a.trigger("circle-animation-progress",[i,n])}})).promise().always(function(){a.trigger("circle-animation-end")})},getThickness:function(){return i.isNumeric(this.thickness)?this.thickness:this.size/14},getValue:function(){return this.value},setValue:function(i){this.animation&&(this.animationStartValue=this.lastFrameValue),this.value=i,this.draw()}},i.circleProgress={defaults:t.prototype},i.easing.circleProgressEasing=function(i,t,e,a,n){return(t/=n/2)<1?a/2*t*t*t+e:a/2*((t-=2)*t*t+2)+e},i.fn.circleProgress=function(e,a){var n="circle-progress",r=this.data(n);if("widget"==e){if(!r)throw Error('Calling "widget" method on not initialized instance is forbidden');return r.canvas}if("value"==e){if(!r)throw Error('Calling "value" method on not initialized instance is forbidden');if("undefined"==typeof a)return r.getValue();var s=arguments[1];return this.each(function(){i(this).data(n).setValue(s)})}return this.each(function(){var a=i(this),r=a.data(n),s=i.isPlainObject(e)?e:{};if(r)r.init(s);else{var o=i.extend({},a.data());"string"==typeof o.fill&&(o.fill=JSON.parse(o.fill)),"string"==typeof o.animation&&(o.animation=JSON.parse(o.animation)),s=i.extend(o,s),s.el=a,r=new t(s),a.data(n,r)}})}}); 

/* FuckAdBlock 4.0.0  */
!function(t,e,i){var n=!1,o="FuckAdBlock",r=function(){var t=this,e={};this.errors={throwError:function(t,e,i){throw'Argument "'+t+'" of method "'+e+'" is not an "'+i+'"'},isObject:function(t,e,i){("object"!=typeof t||Array.isArray(t)===!0||null===t)&&this.throwError(e,i,"object")},isArray:function(t,e,i){Array.isArray(t)===!1&&this.throwError(e,i,"array")},isFunction:function(t,e,i){"function"!=typeof t&&this.throwError(e,i,"function")},isString:function(t,e,i){"string"!=typeof t&&this.throwError(e,i,"string")},isBoolean:function(t,e,i){"boolean"!=typeof t&&this.throwError(e,i,"boolean")}},this.options={set:function(i){t.errors.isObject(i,"optionsList","options.set");for(var n in i)e[n]=i[n],t.debug.log("options.set",'Set "'+n+'" to "'+i[n]+'"');return t},get:function(t){return e[t]}},this.debug={set:function(e){return n=e,t.debug.log("debug.set",'Set debug to "'+n+'"'),t},isEnable:function(){return n},log:function(e,i){n===!0&&(t.errors.isString(e,"method","debug.log"),t.errors.isString(i,"message","debug.log"),console.log("["+o+"]["+e+"] "+i))}},this.versionToInt=function(t){for(var e="",i=0;3>i;i++){var n=t[i]||0;1===(""+n).length&&(n="0"+n),e+=n}return parseInt(e)}},s=function(){r.apply(this);var t=null,e=null;this.setDetected=function(e){return t=e,this},this.callDetected=function(){return null===t?!1:(t(),t=null,!0)},this.setUndetected=function(t){return e=t,this},this.callUndetected=function(){return null===e?!1:(e(),e=null,!0)}},a=function(){r.apply(this),this.options.set({timeout:200});var t=this,e=[4,0,0,"beta",3],i={},n={};this.getVersion=function(t){return t!==!0?e:void this.versionToInt(e)},this.addEvent=function(t,e){return this.errors.isString(t,"name","addEvent"),this.errors.isFunction(e,"callback","addEvent"),void 0===i[t]&&(i[t]=[]),i[t].push(e),this.debug.log("set",'Event "'+t+'" added'),this},this.on=function(t,e){return this.errors.isBoolean(t,"detected","on"),this.errors.isFunction(e,"callback","on"),this.addEvent(t===!0?"detected":"undetected",e)},this.onDetected=function(t){return this.errors.isFunction(t,"callback","onDetected"),this.addEvent("detected",t)},this.onNotDetected=function(t){return this.errors.isFunction(t,"callback","onNotDetected"),this.addEvent("undetected",t)};var s=function(e){var n=i[e];if(t.debug.isEnable()===!0){var o=void 0!==n?n.length:0;t.debug.log("dispatchEvent",'Starts dispatch of events "'+e+'" (0/'+o+")")}if(void 0!==n)for(var r in n)t.debug.isEnable()===!0&&t.debug.log("dispatchEvent",'Dispatch event "'+e+'" ('+(parseInt(r)+1)+"/"+o+")"),n[r]();return this};this.check=function(e,i){e instanceof Array==!1&&void 0===i&&(i=e,e=void 0),void 0===e&&(e=Object.keys(n)),void 0===i&&(i={}),this.errors.isArray(e,"pluginsList","check"),this.errors.isObject(i,"optionsList","check"),this.debug.log("check","Starting check");var o={},r=e.length,a=0,u=function(e,i,n){if(a++,t.debug.log("check",(i===!0?"Positive":"Negative")+'" check of plugin "'+e+'"'),n===!0||i===!0||a===r){clearTimeout(h);for(var u in o)o[u].instance.stop();s(i===!0?"detected":"undetected")}};if(this.debug.log("check","Starting loading plugins (0/"+r+") ("+e.join()+")"),0===r)return u("#NoPlugin",!1,!0),this;for(var l in e){var c=e[l];this.debug.log("check",'Load plugin "'+c+'" ('+(parseInt(l)+1)+"/"+r+")");var d=o[c]={name:c,instance:new n[c],detected:null};void 0!==i[c]&&d.instance.options.set(i[c]),function(t,e){e.instance.setDetected(function(){e.detected=!0,t(e.name,!0)}).setUndetected(function(){e.detected=!1,t(e.name,!1)})}(u,d)}for(var c in o)o[c].instance.start();var h=setTimeout(function(){u("#Timeout",!1,!0)},this.options.get("timeout"));return this},this.registerPlugin=function(t){if(this.errors.isFunction(t,"pluginClass","registerPlugin"),this.errors.isString(t.pluginName,"pluginClass.pluginName","registerPlugin"),this.errors.isArray(t.versionMin,"pluginClass.versionMin","registerPlugin"),3!==t.versionMin.length&&this.errors.throwError("pluginClass.versionMin","registerPlugin","array with 3 values"),void 0===n[t.pluginName]){if(this.versionToInt(e)>=this.versionToInt(t.versionMin))return n[t.pluginName]=t,this.debug.log("registerPlugin",'Plugin "'+t.pluginName+'" registered'),!0;throw'The plugin "'+t.pluginName+'" ('+t.versionMin.join(".")+") is too recent for this version of "+o+" ("+e.join(".")+")"}throw'The plugin "'+t.pluginName+'" is already registered'},this.registerPlugin(u),this.registerPlugin(l)};a.getPluginClass=function(){return s};var u=function(){a.getPluginClass().apply(this,arguments),this.options.set({loopTime:50,baitElement:null,baitClass:"pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",baitStyle:"width:1px!important;height:1px!important;position:absolute!important;left:-10000px!important;top:-1000px!important;",baitParent:null});var e={};this.start=function(){var i=this;if(null===this.options.get("baitElement")){e.bait=this.createBait({"class":this.options.get("baitClass"),style:this.options.get("baitStyle")});var n=this.options.get("baitParent");null===n?t.document.body.appendChild(e.bait):n.appendChild(e.bait)}else e.bait=this.options.get("baitElement");var o=function(){i.checkBait(e.bait,!0)===!0&&i.callDetected()};return e.loopTimeout=setTimeout(o,1),e.loopInterval=setInterval(o,this.options.get("loopTime")),this},this.stop=function(){clearInterval(e.loopTimeout),clearInterval(e.loopInterval);var i=this.options.get("baitParent");return null===i?t.document.body.removeChild(e.bait):i.removeChild(e.bait),this},this.createBait=function(e){var i=t.document.createElement("div");return i.setAttribute("class",e["class"]),i.setAttribute("style",e.style),i.offsetParent,i.offsetHeight,i.offsetLeft,i.offsetTop,i.offsetWidth,i.clientHeight,i.clientWidth,i},this.checkBait=function(e,i){var n=!1;if(i===!0&&null!==t.document.body.getAttribute("abp")||null===e.offsetParent||0==e.offsetHeight||0==e.offsetLeft||0==e.offsetTop||0==e.offsetWidth||0==e.clientHeight||0==e.clientWidth)n=!0;else{var o=t.getComputedStyle(e);("none"==o.getPropertyValue("display")||"hidden"==o.getPropertyValue("visibility"))&&(n=!0)}return n}};u.pluginName="html",u.version=[1,0,0],u.versionMin=[4,0,0];var l=function(){a.getPluginClass().apply(this,arguments),this.options.set({baitMode:"ajax",baitUrl:"/ad/banner/_adsense_/_adserver/_adview_.ad.json?adzone=top&adsize=300x250&advid={RANDOM}"});var e={};this.start=function(){var t=this;e.end=!1;var i=this.options.get("baitUrl").replace(/\{RANDOM\}/g,function(){return parseInt(1e8*Math.random())});return this._urlCheck(i,this.options.get("baitMode"),function(){e.end===!1&&(e.end=!0,t.callDetected())},function(){e.end===!1&&(e.end=!0,t.callUndetected())}),this},this.stop=function(){return e.end=!0,this},this._urlCheck=function(e,i,n,o){var r=!1,s=function(t){r===!1&&(r=!0,t===!0?n():o())};if("ajax"===i){var a=[!1,!1,!1,!1],u=null,l=function(t){if(void 0!==t)s(t);else{if(0===u)return void s(!0);for(var e=0;4>e;e++)if(a[e]===!1)return void s(!0);s(!1)}},c=new XMLHttpRequest;c.onreadystatechange=function(){a[c.readyState-1]=!0;try{u=c.status}catch(t){}4===c.readyState&&l()};try{c.open("GET",e,!0),c.send()}catch(d){"2153644038"==d.result&&l(!0)}}else if("import"===i){var h=document.createElement("script");h.src=e,h.onerror=function(){s(!0),t.document.body.removeChild(h)},h.onload=function(){s(!1),t.document.body.removeChild(h)},t.document.body.appendChild(h)}else s(!1)}};if(l.pluginName="http",u.version=[1,0,0],l.versionMin=[4,0,0],t[i]=a,void 0===t[e]){var c=t[e]=new a;t.addEventListener("load",function(){setTimeout(function(){c.check()},1)},!1)}}(window,"fuckAdBlock","FuckAdBlock");
