// Stick Header
const MEDIA_QUERY_LIST = window.matchMedia('(min-width: 992px)');
const PIK_APP = document.getElementById('app');
const PIK_TOP = document.getElementById('top');
const PIK_HEADER = document.querySelector('#header');
const PIK_MAIN_NAV = document.querySelector('#main-nav');
const PIK_FOOTER = document.querySelector('#footer');
const PIK_STICKY_CLASS = 'sticky';
let PIK_TOP_HEIGHT = 0;
let PIK_HEADER_HEIGHT = 0;

function resetSticky(selector, stickyClass) {
  selector.classList.remove(stickyClass);
}

function setSticky(selector, selectorHeight, stickyStartPosition, stickyClass, mql) {
  let stickyStartNumber = mql.matches ? stickyStartPosition : 35;

  if (window.pageYOffset >= stickyStartNumber) {
    PIK_APP.style.paddingTop = `${selectorHeight}px`;
    selector.classList.add(stickyClass);
  } else {
    PIK_APP.style.paddingTop = '';
    selector.classList.remove(stickyClass);
  }
}

const updateSticky = () => {
  resetSticky(PIK_TOP, PIK_STICKY_CLASS);
  PIK_TOP_HEIGHT = PIK_TOP.offsetHeight;
  PIK_HEADER_HEIGHT = PIK_HEADER.offsetHeight;
  setSticky(PIK_TOP, PIK_TOP_HEIGHT, PIK_HEADER_HEIGHT, PIK_STICKY_CLASS, MEDIA_QUERY_LIST);
}

window.addEventListener('load', () => {
  updateSticky();
  window.addEventListener('scroll', () => setSticky(PIK_TOP, PIK_TOP_HEIGHT, PIK_HEADER_HEIGHT, PIK_STICKY_CLASS, MEDIA_QUERY_LIST));
  MEDIA_QUERY_LIST.addListener(updateSticky);
});

// Search
const PIK_SEARCH = document.querySelector('#search');
const PIK_SEARCH_OPEN_CLASS = 'open';
const PIK_SEARCH_TOGGLE = document.querySelector('#search-toggle');
const PIK_SEARCH_CLOSE = document.querySelector('#search-close');

function toggleSearch(value, selector, openClass) {
  if (value) {
    selector.classList.add(openClass);
    document.body.style.overflowY = 'hidden';
  } else {
    selector.classList.remove(openClass)
    document.body.style.overflowY = '';
  }
}

PIK_SEARCH_TOGGLE.addEventListener('click', () => toggleSearch(true, PIK_SEARCH, PIK_SEARCH_OPEN_CLASS));
PIK_SEARCH_CLOSE.addEventListener('click', () => toggleSearch(false, PIK_SEARCH, PIK_SEARCH_OPEN_CLASS));

// Move elements
const PIK_FOOTER_TOP = document.querySelector('#footer-top');
const WGL_LOGO = document.querySelector('#wgl-logo');
const WGL_LOGO_PARENT = document.querySelector('#footer-logos');

const moveElement = (container, selector, parent, mql) => {
  if (!selector || !container || !parent) {
    return;
  }

  if (mql.matches && parent.contains(selector)) {
    container.prepend(selector);
  }

  if (!mql.matches && !parent.contains(selector)) {
    parent.prepend(selector);
  }
}
moveElement(PIK_FOOTER_TOP, WGL_LOGO, WGL_LOGO_PARENT, MEDIA_QUERY_LIST);
MEDIA_QUERY_LIST.addListener(() => moveElement(PIK_FOOTER_TOP, WGL_LOGO, WGL_LOGO_PARENT, MEDIA_QUERY_LIST));

// Mobile Navigation
const BREADCRUMBS = document.querySelector('#breadcrumbs');

// Footer Navigation
const PIK_FOOTER_MAIN = document.querySelector('#footer-main');
const addFooterNav = (mainNav, selector, mql) => {
  if (!mainNav || !selector) {
    return;
  }

  const clone = mainNav.cloneNode(true);
  clone.setAttribute('id', 'footer-nav');
  const mainMenu = clone.querySelector('.mainMenu');
  mainMenu.classList.remove('mainMenu');
  mainMenu.classList.add('footerMenu');
  const mainMenuLinks = mainMenu.querySelectorAll('.mainMenu__link');
  mainMenuLinks.forEach(item => {
    item.classList.remove('mainMenu__link');
    item.classList.add('footerMenu__link');
  });
  const mainMenuSubMenus = mainMenu.querySelectorAll('.mainMenu__submenu');
  mainMenuSubMenus.forEach(item => {
    item.classList.remove('mainMenu__submenu');
  });
  const subMenus = mainMenu.querySelectorAll('.submenu');
  subMenus.forEach(item => {
    item.classList.remove('submenu');
    item.classList.add('footerSubMenu');
  });
  const footerNav = document.querySelector('#footer-nav');

  if (mql.matches && !footerNav) {
    selector.prepend(clone);
  }

  if (!mql.matches && !!footerNav) {
    footerNav.remove();
  }
};
addFooterNav(PIK_MAIN_NAV, PIK_FOOTER_MAIN, MEDIA_QUERY_LIST);
MEDIA_QUERY_LIST.addListener(() => addFooterNav(PIK_MAIN_NAV, PIK_FOOTER_MAIN, MEDIA_QUERY_LIST));

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Main nav
function showSubMenu(event) {
  const menuItems = this.querySelectorAll('.mainMenu > li');
  const menuItem = event.target.closest('.mainMenu > li');
  const overlay = this.querySelector('#main-nav-overlay');

  if (!menuItem) {
    menuItems.forEach((item) => item.classList.remove('show-submenu'));
    overlay.classList.remove('show-submenu');
  } else {
    if (menuItem.classList.contains('show-submenu')) {
      menuItem.classList.remove('show-submenu');
      overlay.classList.remove('show-submenu');
    } else {
      menuItem.classList.add('show-submenu');
      overlay.classList.add('show-submenu');
    }
    const parent = menuItem.parentNode;
    const siblings = [].slice.call(parent.children).filter(function (child) {
      return child !== menuItem;
    });
    siblings.forEach((item) => item.classList.remove('show-submenu'));
  }
};
PIK_MAIN_NAV.addEventListener('click', showSubMenu);

// Stage Swiper
const stageSwiper = new Swiper('#stage-swiper', {
  effect: 'fade',
  navigation: {
    nextEl: '#stage-next',
    prevEl: '#stage-prev',
    disabledClass: 'disabled',
  },
});

// News Swiper
const newsSwiper = new Swiper('#news-swiper', {
  watchOverflow: true,
  slidesPerView: 'auto',
  navigation: {
    nextEl: '#news-next',
    prevEl: '#news-prev',
    disabledClass: 'disabled',
  },
});

// News Random Colors
const NEWS_COLORS = ['#e37222', '#a3845c', '#8a9079', '#82a096', '#87b9aa', '#91cdcd', '#f3f3e4', '#e1e3d4', '#d0d4c6', '#dadedc', '#eceeed'];
const NEWS_LIST = document.querySelectorAll('.newsSlider');
let newsRandomColors = NEWS_COLORS;
shuffle(newsRandomColors);
NEWS_LIST.forEach((item, index) => {
  item.style.backgroundColor = newsRandomColors[index];
  // item.style.backgroundColor = NEWS_COLORS[Math.floor(Math.random() * NEWS_COLORS.length)];
});

// Publications Swiper
const publicationSwiper = new Swiper('#publications-swiper', {
  watchOverflow: true,
  slidesPerView: 'auto',
  breakpoints: {
    768: {
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerGroup: 3,
    }
  },
  navigation: {
    nextEl: '#publications-next',
    prevEl: '#publications-prev',
    disabledClass: 'disabled',
  },
});

// Publications Random Colors
const PUBLICATIONS_COLORS = ['#e37222', '#a3845c', '#8a9079', '#82a096', '#87b9aa', '#91cdcd'];
const PUBLICATIONS_LIST = document.querySelectorAll('.publicationsSlider');
PUBLICATIONS_LIST.forEach((item) => {
  item.style.backgroundColor = PUBLICATIONS_COLORS[Math.floor(Math.random() * PUBLICATIONS_COLORS.length)];
})

// Facts Swiper
const factsSwiper = new Swiper('#facts-swiper', {
  effect: 'fade',
  loop: true,
  navigation: {
    nextEl: '.swiper-next-fact',
    disabledClass: 'disabled',
  },
});

// Facts Random Colors
const FACTS_COLORS = ['#e37222cc', '#a3845ccc', '#8a9079cc', '#82a096cc', '#87b9aacc', '#91cdcdcc'];
const FACTS_LIST = document.querySelectorAll('.jsFactsSlider');
let factsRandomColors = FACTS_COLORS;
shuffle(factsRandomColors);
FACTS_LIST.forEach((item, index) => {
  item.querySelector('.jsFactsSliderOverlay').style.backgroundColor = factsRandomColors[index];
  item.querySelector('.jsFactsSliderContent').style.backgroundColor = factsRandomColors[index];
});

// Questions Swiper
const QUESTION_SWIPER_COLOR = ['#a3845c', '#8a9079', '#82a096', '#87b9aa', '#91cdcd'];
const SWIPER_NEXT_QUESTION = document.querySelector('#swiper-next-question');
const SWIPER_AFTER_NEXT_QUESTION = document.querySelector('#swiper-after-next-question');

const questionsSwiper = new Swiper('#questions-swiper', {
  effect: 'fade',
  loop: true,
  slideToClickedSlide: true,
  navigation: {
    nextEl: '.swiper-next-question',
    disabledClass: 'disabled',
  },
  on: {
    slideChange: () => {
      document.querySelectorAll('[data-toggler="more-question-content"]').forEach(item => {
        item.classList.remove('active');
        item.previousSibling.classList.remove('opened');
      })
    },
  }
});

const QUESTIONS_SWIPER = document.querySelector('#questions-swiper');
const showMoreQuestionContent = (event) => {
  const toggler = event.target.closest('[data-toggler="more-question-content"]');
  if (!toggler) return;
  toggler.classList.toggle('active');
  toggler.previousSibling.classList.toggle('opened');
}
if (!!QUESTIONS_SWIPER) {
  QUESTIONS_SWIPER.addEventListener('click', showMoreQuestionContent);
}

// Questions Random Colors
const QUESTIONS_COLORS = ['#e37222', '#a3845c', '#8a9079', '#82a096', '#87b9aa', '#91cdcd'];
const QUESTIONS_LIST = document.querySelectorAll('.jsQuestionsSlide');
let questionsRandomColors = QUESTIONS_COLORS;
shuffle(questionsRandomColors);
QUESTIONS_LIST.forEach((item, index) => {
  item.style.backgroundColor = newsRandomColors[index];
});

// Related Items Random Colors
const RELATED_ITEMS_LIST = document.querySelectorAll('.jsRelatedItem');
let relatedItemsRandomColors = NEWS_COLORS;
shuffle(relatedItemsRandomColors);
RELATED_ITEMS_LIST.forEach((item, index) => {
  item.style.backgroundColor = relatedItemsRandomColors[index];
});

// Related Swiper
const relatedSwiper = new Swiper('#related-swiper', {
  navigation: {
    nextEl: '#related-next',
    prevEl: '#related-prev',
    disabledClass: 'disabled',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 34,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 34,
    }
  },
});

// Persons Swiper
const personsSwiper = new Swiper('#persons-swiper', {
  slidesPerView: 1,
  slidesPerColumn: 2,
  navigation: {
    nextEl: '#persons-next',
    prevEl: '#persons-prev',
    disabledClass: 'disabled',
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
    992: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 34,
    },
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 34,
    }
  },
  on: {
    init: function () {
      const extra = {4: {2: 1}, 6: {2: 1, 3: 2, 4: 1}, 8: {2: 1, 3: 2, 4: 3, 5: 2, 6: 1}};
      var count = this.slides.length;
      var group = this.params.slidesPerGroup * this.params.slidesPerColumn;
      if (group in extra) {
        for (let i = 0; i < extra[group][count % group]; i++) {
          this.appendSlide('<div class="swiper-slide dummy"/>');
        }
      }
    },
    slideChange: () => {
      document.querySelectorAll('[data-tag="container"]').forEach(item => {
        const tagsEl = item.querySelector('[data-tag="tags"]');
        if (tagsEl.classList.contains('shown')) {
          const children = item.childNodes;
          children.forEach((item) => item.classList.toggle('shown'));
        }
      })
    },
  },
});

// Person Default Image Random Bg Colors
// const PERSONS_PORTRAITS = document.querySelectorAll('[data-bg="person"]');
// let personsPortraitsRandomColors = PUBLICATIONS_COLORS;
// let increment = 0;
// shuffle(personsPortraitsRandomColors);
// PERSONS_PORTRAITS.forEach((item, index) => {
//   if ( index === (personsPortraitsRandomColors.length + increment) ) {
//     increment = increment + personsPortraitsRandomColors.length;
//   }
//   item.style.backgroundColor = personsPortraitsRandomColors[index - increment];
// });

const PERSONS_SWIPER = document.querySelector('#persons-swiper');
const showPersonTags = (event) => {
  const toggler = event.target.closest('[data-toggler="show-person-tags"]');
  if (!toggler) return;
  const parent = toggler.closest('[data-tag="container"]');
  const children = parent.childNodes;
  children.forEach((item) => item.classList.toggle('shown'));
}
if (!!PERSONS_SWIPER) {
  PERSONS_SWIPER.addEventListener('click', showPersonTags);
}

// Add js class to html
const htmlEl = document.documentElement;
htmlEl.classList.add('js');


// Mobile navigation
document.addEventListener(
  "DOMContentLoaded", () => {

    let $mobile_nav = $('#mobile-nav'),
      current_language = $('.currentLanguage').hasClass('language-en') ? 'en' : 'de';

    $mobile_nav.find('.mainMenu__link').each(function (idx, el) {
      let $el = $(el);
      $el.replaceWith(
        $('<a>', {'href': $el.data('href')}).text($el.text())
      );
    });

    while (true) {
      if ($mobile_nav.find('.mainMenu__submenu').length > 0) {
        let $submenu = $($mobile_nav.find('.mainMenu__submenu')[0]);
        $submenu.replaceWith($submenu.find('ul').removeClass('submenu')[0]);
      } else {
        break;
      }
    }

    let top_navbar = {};

    if ($('#breadcrumbs').length > 0) {
      top_navbar = {
        "position": "top",
        "content": [
          $('#breadcrumbs').length > 0 ? "<div id='nav-bar-breadcrumbs'><div class='nav-bar-breadcrumbs-inner'>" + $('#breadcrumbs').html() + "</div></div>" : ''
        ]
      };
    }

    document.querySelectorAll('#mobile-nav .submenu').forEach(item => {
      item.classList.remove('submenu');
    });

    document.querySelectorAll('#mobile-nav .dropdown-menu').forEach(item => {
      item.classList.remove('dropdown-menu');
    });

    if ($(".userrole-authenticated form#form").length === 0) {
      let menu = new Mmenu(document.querySelector('#mobile-nav'), {
        navbar: {
          // title: $(document).find("title").text().split('—')[0].trim()
          // title: $('#first-heading').text().trim() || (current_language === 'en' ? 'Home page' : 'Startseite')
        },
        navbars: [
          top_navbar,
        ],
        setSelected: {
          current: 'detect',
          hover: true,
          parent: true
        },
      }, {
        classNames: {
          selected: 'selected',
        }
      });
    }
    else {
      $(".mobileNav, #hamburger").remove();
    }
  }
);

$(document).ready(function() {
  if ($('#aside-nav').length) {
    $('#main').addClass('aside-nav-exists');
  }
});
