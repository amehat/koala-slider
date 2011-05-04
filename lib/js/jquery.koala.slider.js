(function($){ 
  $.namespace = function(ns, functions){ 
    $.fn[ns] = function() {return this.extend(functions)}; 
  }; 
  $.namespace('$', $.fn); 
})(jQuery); 

$.namespace ('koala', { 
	slider:function ( aConf, aSlide ){
		console.log ('koala.slider is loaded');
		var contentNav = aConf.contentNavigation;
		var tagNav	   = aConf.tagNavigation;
		var std		   = aConf.classLinkOff;
		var sel		   = aConf.classLinkOn;

		var sSlide    = aConf.idSlide+0;
		var sSlideNav = aConf.idNavigation+0;

		var countSlide = aSlide.length;
		var id = 0;
		var timerPassage = false;
		var loop = aConf.loop;

		if ( 1 == countSlide) {
			loop = false;
			aConf.auto = false;
			$(contentNav).hide();
		}

		init ();

		if ( true == aConf.auto ){
			timer ( 0 );
		}

		function timer (i){
			var iTimer = (aSlide[i]['time']) * 1000;
			if ( false == timerPassage ){
				iTimer= 1;
				timerPassage = true;
			}
		
			function load (){
				sSlide = aConf.idSlide+i;
				sSlideNav = aConf.idNavigation+i;
				stm = true;
				init ();
				var c = countSlide-1;
				k = i+1;
				clearTimeout ( id );
				if ( i != c ){
					timer ( k );
				} else {
					if ( true == loop ){	
						timer ( 0 );
					}
				}
			
			}
			id = setTimeout( load, iTimer);
		}

		function init (){
			for ( var i=0; i<countSlide; i++){
				var objSlide = aConf.idSlide+i;
				var objNav   = aConf.idNavigation+i;

				var idEnable = $(sSlide).attr('id');
				var idBoucle =  $(objSlide).attr('id');

				function handler(event){
					var i = event.data.current;
					sSlide = aConf.idSlide+i;
					sSlideNav = aConf.idNavigation+i;
					stm = true;
					init ();
				}

				$(aConf.idNavigation+i).bind('click',{current: i}, handler);
				
				if ( idEnable == idBoucle ){
					$('#'+idBoucle).fadeIn('slow');
					$(aConf.idNavigation+i).removeClass('slider_std');
					$(aConf.idNavigation+i).addClass('slider_sel');
				} else {
					$('#'+idBoucle).hide ();
					if ( $(aConf.idNavigation+i).hasClass(sel) ){
						$(aConf.idNavigation+i).removeClass(sel);
						$(aConf.idNavigation+i).addClass(std);
					}
				}
			}
		}


		$(contentNav+' > '+tagNav).hover (
			function (){
				init ();
				stm = $(this).hasClass(sel);
				if ( false == stm ){
					$(this).removeClass(std);
					$(this).addClass(sel);
				}	
			  },
			 function () {
				 init ();
				if ( false == stm ){
				  $(this).removeClass(sel);
				  $(this).addClass(std);
			  }
			}
		);
}});
