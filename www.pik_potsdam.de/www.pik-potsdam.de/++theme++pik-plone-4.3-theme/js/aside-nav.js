$( window ).on( "load", function() {
  const asideNav = document.querySelector('#aside-nav');
  const asideNavOpen = document.querySelector('#nav-toggle-aside');
  const asideNavClose = document.querySelector('#aside-nav-close');
  const asideNavCheckbox = document.querySelector('#aside-nav-toggle-checkbox');

  const breadcrumbs = document.querySelector('#breadcrumbs');
  const mediaQueryList = window.matchMedia('(min-width: 992px)');

  const handleAsideNavStatus = (openElement, closeElement, checkboxElement) => {
    if (!openElement || !closeElement) {
      return;
    }

    // set nav initially to 'opened'
    checkboxElement.checked = false;
    localStorage.setItem('asideNavStatus', 'opened');

    // configure storage on click
    openElement.addEventListener('click', () => localStorage.setItem('asideNavStatus', 'opened'));
    closeElement.addEventListener('click', () => localStorage.setItem('asideNavStatus', 'closed'));
  };
  const addBreadcrumbs = (breadcrumbs, selector, mql) => {
    if (!breadcrumbs || !selector) {
      return;
    }
    const clone = breadcrumbs.cloneNode(true);
    clone.setAttribute('id', 'menu-breadcrumbs');
    const menuBreadcrumbs = document.querySelector('#menu-breadcrumbs');

    if (!mql.matches && !menuBreadcrumbs) {
      selector.prepend(clone);
    }

    if (mql.matches && !!menuBreadcrumbs) {
      menuBreadcrumbs.remove();
    }
  };

  handleAsideNavStatus(asideNavOpen, asideNavClose, asideNavCheckbox);
  addBreadcrumbs(breadcrumbs, asideNav, mediaQueryList);

  //noinspection JSDeprecatedSymbols
  mediaQueryList.addListener(() => addBreadcrumbs(breadcrumbs, asideNav, mediaQueryList));
} );
