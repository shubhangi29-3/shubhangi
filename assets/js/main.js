/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

window.onload = () => {

	const anchors = document.querySelectorAll('a:not([href*="#"])');
	const transition_el = document.querySelector('.transition');
  
	setTimeout(() => {
		transition_el.classList.remove('is-active');
	}, 500);
	
	for (let i = 0; i < anchors.length; i++) {
		const anchor = anchors[i];
	
		anchor.addEventListener('click', e => {
			e.preventDefault();
			let target = e.currentTarget.href;
			
			$('.loader').fadeIn('fast');
			transition_el.classList.add('is-active');
		
			setInterval(() => {
				window.location.href = target;
			}, 500);
		})
	}
	
	const modals = document.querySelectorAll(".modal");
	const triggers = document.querySelectorAll(".trigger");
	const closeButtons = document.querySelectorAll(".close-button");

	for (let i = 0; i < triggers.length; i++) {
		const modal = modals[i];
		const trigger = triggers[i];
		const closeButton = closeButtons[i];

		trigger.addEventListener("click", (e) => {
			e.preventDefault();
			modal.classList.toggle("show-modal");
		});

		closeButton.addEventListener("click", (e)=>  {
			e.preventDefault();
			modal.classList.toggle("show-modal");
		});
		window.addEventListener("click", (e) => {
			if (e.target === modal) {
				modal.classList.toggle("show-modal");
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", function() {
	var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
  
	if ("IntersectionObserver" in window) {
	  var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(video) {
		  if (video.isIntersecting) {
			for (var source in video.target.children) {
			  var videoSource = video.target.children[source];
			  if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
				videoSource.src = videoSource.dataset.src;
			  }
			}

			video.target.load();
			video.target.classList.remove("lazy");
			lazyVideoObserver.unobserve(video.target);
		  }
		});
	  });
  
	  lazyVideos.forEach(function(lazyVideo) {
		lazyVideoObserver.observe(lazyVideo);
	  });
	}
  });

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$('.loader').fadeOut('fast');
				$body.removeClass('is-preload');
			}, 100);

			$nav_a = $nav.find('a');
			let cont1 = window.location.href.includes("robotics");
			let cont2 = window.location.href.includes("simulation");
			let cont3 = window.location.href.includes("design");

			if(cont1){
				$nav_a.eq(1).addClass('active');
			}
			else if(cont2){
				$nav_a.eq(2).addClass('active');
			}
			else if(cont3){
				$nav_a.eq(3).addClass('active');
			}
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);