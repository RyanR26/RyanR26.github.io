const routerCache = {};

let routeHooks = {};

const isUndefined = value => value === void 0;

const isDefined = value => value !== void 0;

const isFunction = value => typeof value === 'function';

export const routerConfig = config => {

  const hooks = {};
  let hooksConfig = config.hooks;

  hooksConfig = Array.isArray(hooksConfig) ? hooksConfig : [hooksConfig];
  
  hooksConfig.map(hooksGroup => {
    hooksGroup.routes.map(route => {
      hooks[route] = Object.assign({}, 
        hooksGroup.afterEnter && { afterEnter: hooksGroup.afterEnter },
        hooksGroup.afterEnterLazy && { afterEnterLazy: hooksGroup.afterEnterLazy },
        hooksGroup.beforeEnter && { beforeEnter: hooksGroup.beforeEnter },
        hooksGroup.beforeLeave && { beforeLeave: hooksGroup.beforeLeave }
      )
    })
  });

  routeHooks = hooks;
};

export const routerState = () => ({
  router: {
    current: '/',
    next: ''
  }
});

const routerFx = {

  updateUrl(route) {
    history.pushState({ previousUrl: routerFx.getRouteFromUrl()}, null, route);
    return route;
  },

  urlChangedEvent(route) {
    window.dispatchEvent(new CustomEvent('urlChanged', { detail: { route } }))
  },
  
  getRouteFromUrl() {
    const url = location.href;  // entire url including querystring - also: window.location.href;    
    const baseURL = url.substring(0, url.indexOf('/', 14));
    const route = url.replace(baseURL, '').replace('.html', '');
    return route;
  }
};

export const routerSubscriptions = actions => [
  { name: 'popstate', action: actions.navigateHistory },
  { name: 'Lazy_View_Rendered', action: actions.afterEnterLazy }
];

export const routerActions = dispatch => {

  const beforeLeave = {};
  const beforeEnter = {};
  const afterEnter = {};
  const callback = {};

  const getHooks = (currentRoute, hook, opts={}) => 
    isDefined(opts[hook]) ? opts[hook] :
    isDefined(routeHooks[currentRoute]) && routeHooks[currentRoute][hook] ? routeHooks[currentRoute][hook] : 
    isDefined(routeHooks['/*']) ? routeHooks['/*'][hook] : 
    hook === 'callback' ? undefined : [];

  return {

    navigateHistory() {

      const route = routerFx.getRouteFromUrl();

      console.log('popstate route ', route)

      dispatch
      .msgs(
        state => ['effect', {
          def: () => state
        }]
      ).done(state => {
        navigate(state)
      })

      const navigate = state => {

        const currentRoute = state.router.current;

        const _beforeLeave = getHooks(currentRoute, 'beforeLeave', beforeLeave);
        const _beforeEnter = getHooks(route, 'beforeEnter', beforeEnter);
        const _afterEnter = getHooks(route, 'afterEnter', afterEnter);
        const _callback = getHooks(route, 'callback', callback);

        dispatch
        .msgs(
          ['state', {
            path: ['router', 'next'],
            value: route
          }, {
            preventRender: false
          }],
          ...((isFunction(_beforeLeave) ? _beforeLeave(currentRoute) : _beforeLeave) || []),
          ...((isFunction(_beforeEnter) ? _beforeEnter(route) : _beforeEnter) || []),
          ['state', {
            path: ['router', 'current'],
            value: route
          }],
          ...((isFunction(_afterEnter) ? _afterEnter(route) : _afterEnter) || [])
        )
        .done(() => {
          if(_callback) {
            if (typeof _callback === 'function') {
              _callback()
            }   
            else if (Array.isArray(_callback)) {
              dispatch.msgs(
                ..._callback
              )
            }
            else {
              console.warn('Callback must be a function or message array')
            }
          }
        })
      }
   
    },

    navigate(route, opts, event) {

      event.preventDefault();

      const currentRoute = routerFx.getRouteFromUrl();

      beforeLeave[currentRoute] = opts.beforeLeave;
      beforeEnter[route] = opts.beforeEnter;
      afterEnter[route] = opts.afterEnter;
      callback[route] = opts.callback;

      const _beforeLeave = getHooks(currentRoute, 'beforeLeave', opts);
      const _beforeEnter = getHooks(route, 'beforeEnter', opts);
      const _afterEnter = getHooks(route, 'afterEnter', opts);
      const _callback = getHooks(route, 'callback', opts);

      dispatch
      .msgs(
        state =>
          ['control', {
            if: state.router.current !== route
          }],
        ['state', {
          path: ['router', 'next'],
          value: route
        }, {
          preventRender: false
        }],
        ...((isFunction(_beforeLeave) ? _beforeLeave(currentRoute, route, event) : _beforeLeave) || []),
        ...((isFunction(_beforeEnter) ? _beforeEnter(route, event) : _beforeEnter) || []),
        ['effect', {
          name: routerFx.updateUrl,
          args: [route]
        }],
        route =>
          ['state', {
            path: ['router', 'current'],
            value: route
          }],
        ...((isFunction(_afterEnter) ? _afterEnter(route, event) : _afterEnter) || [])
      )
      .done(() => {
        if(_callback) {
          if (typeof _callback === 'function') {
            _callback()
          }   
          else if (Array.isArray(_callback)) {
            dispatch.msgs(
              ..._callback
            )
          }
          else {
            console.warn('Callback must be a function or message array')
          }
        }
      })
    },

    afterEnterLazy() {

      dispatch.msgs(
        state => ['effect', {
          def: () => state
        }]
      ).done(state => {

        const hooks = getHooks(state.router.current, 'afterEnterLazy');

        if (hooks && hooks.length > 0) {
          afterEnter(state, hooks)
        }
      })

      const afterEnter = (state, hooks) => {
        dispatch.msgs(
          ...hooks
        )
      }
      
    }
  }
};

const RouterLink = (props, actions) => (e, x) => {
  e('a', { 
    text: props.name, 
    href: props.href, 
    class: `${props.className || ''} ${props.href === props.current ? 'active' : ''}`,
    onclick: [
      actions.routerActions.navigate, 
      props.href, 
      {
        beforeLeave: props.beforeLeave,
        beforeEnter: props.beforeEnter, 
        afterEnter: props.afterEnter,
        callback: props.callback
      }]
  }); 
  x('a')
};

const RouterSwitch = ({routes, activeRoute}) => () => {

  let match = false;

  for (let i=0; i<routes.length; i++) {

    const route = routes[i];

    // dynamic route
    if (route.route.indexOf(':') > -1) {

      if (isDefined(routerCache[activeRoute])) {
        match = true;
        routerCache[activeRoute].component(routerCache[activeRoute].params);
      } 
      
      else {
  
        const matchPatternRoute = route.route.split('/');
        const routeToCheck = activeRoute.split('/');
        const routeParams = {};
  
        if (matchPatternRoute.length === routeToCheck.length) {
          
          for (let x=0; x<matchPatternRoute.length; x++) {
            if (matchPatternRoute[x] !== routeToCheck[x] && matchPatternRoute[x].indexOf(':') !== 0) {
              break;
            }
            if (matchPatternRoute[x].indexOf(':') === 0) {
              routeParams[matchPatternRoute[x].replace(':','')] = routeToCheck[x];
            }
            if (x === matchPatternRoute.length - 1) {
  
              match = true;
  
              if (isUndefined(routerCache[activeRoute])) {
                routerCache[activeRoute] = {};
                routerCache[activeRoute].component = route.component;
                routerCache[activeRoute].params = routeParams;
                route.component(routeParams);
              } 
            }
          } 
        }
      }
    }

    if (!match && (activeRoute === route.route || activeRoute.indexOf(route.route + '/') === 0)) {
      match = true;
      route.component();
    } 
    else if (i === routes.length-1 && route.route === 'no-match') {
      route.component();
    }
    
    if (match) break;
  }
};

// PROPS = name, href, className, { beforeEnter, afterEnter, beforeLeave, callback } 
export const Link = (name, href, className, hooks = {}) => [
  { RouterLink }, 
  { props: {
      name, 
      href,
      className,
      beforeLeave: hooks.beforeLeave,
      beforeEnter: hooks.beforeEnter,
      afterEnter: hooks.afterEnter,
      callback: hooks.callback
    },
    mergeStateToProps: state => ({
      current: state.router.current
    }),
    propTypes: types => ({
      name: types.string,
      href: types.string,
      beforeLeave: [types.array, types.undefined],
      beforeEnter: [types.array, types.undefined],
      afterEnter: [types.array, types.undefined],
      callback: [types.array, types.undefined],
      current: types.string
    })
}];

export const Switch = (...routes) => [
  { RouterSwitch }, 
  { props: { routes },
    mergeStateToProps: state => ({ 
      activeRoute: state.router.current
    }),
    propTypes: types => ({
      routes: types.array,
      activeRoute: types.string
    })
}];

export const Route = (route, component) => ({
  route,
  component
});