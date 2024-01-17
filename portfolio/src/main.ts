import './styles/style.css'
import { Switch, Route, routerState, routerConfig, routerActions, routerSubscriptions } from '../vendor/modules/Router.js';
import { routerConfigObj } from './routerConfig.ts';
import { buildGlobalInstances } from './buildGlobalInstances.ts';
import { ClockState, ClockActions } from './partials/clock.ts';
import { NavState, NavView, NavActions } from './screens/nav.ts';
import { main, div } from '../vendor/modules/HTMLElements.js';
import { CarouselActions, CarouselState, CarouselSubscriptions } from './partials/carousel.ts';
import { IntersectObserver } from '../vendor/modules/subscriptions.js';
import { ProjectShowcaseState } from './partials/projectShowcase.ts';
import { __Throttle } from '../vendor/modules/time.js';

declare global {
  interface Window {
    karbon: {
      render: Function,
      hydrate: Function
    };
  }
}

interface state {
  [key: string]: any  
}

interface actions {
  [key: string]: any
}

interface dispatch {
  stamp: Function,
  msgs: Function,
  done: Function
}

const globalActions = (dispatch: dispatch) => ({

  log(arg: any) {
    dispatch.msgs(
      ['effect', {
        def: () => console.log('LOG - ' + arg)
      }])
  },

  playPauseVideo(entry: IntersectionObserverEntry) {
    dispatch.msgs(
      ['effect', {
        name: Fx.playPauseVideo,
        args: [entry.target, entry.isIntersecting && entry.target.classList.contains('playing')]
      }]
    )
  },

  triggerAnimation(entry: IntersectionObserverEntry) {
    dispatch.msgs(
      ['control', {
        if: entry.isIntersecting
      }],
      ['effect', {
        name: Fx.addClass,
        args: [entry.target, 'trigger-animation']
      }]
    )
  },

  setViewportSize() {
    dispatch.msgs(
      ['state', {
        path: ['viewportSize'],
        value: Fx.getViewportSize()
      }]
    )
  },

  setScrollPosition() {
    dispatch.msgs(
      ...__Throttle(50, 'page-scroll'), 
      ['state', {
        path: ['scrollPosition'],
        value: window.scrollY
      }, {
        FixedDomShape: true
      }]
    )
  },

  scrollToTop() {
    dispatch.msgs(
      ['effect', {
        name: Fx.scrollToTop
      }]
    )
  },

  triggerSubscriptions(statePath: string[]) {
    dispatch.msgs(
      ['state', {
        path: statePath,
        value: (prevValue: string) => prevValue + '#' 
      }, {
        preventRender: true,
        FixedDomShape: true
      }],
      ['state', {
        path: statePath,
        value: (prevValue: string) => prevValue.replace('#', '')
      }, {
        preventRender: true,
        FixedDomShape: true
      }]
    )
  }
})

const Fx = {
  
  playPauseVideo(element: HTMLVideoElement, condition: boolean) {
    if (condition) {
      element.play()
    } else {
      element.pause()
    }
  },

  addClass(element: Element, className: string) {
    element.classList.add(className)
  },

  getViewportSize() {
    return window.innerWidth < 769 ? 'small' : 'large'
  },

  scrollToTop() {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
  }
}

const App = {

  container: (document: Document) => document.getElementById('app'),

  state: {
    ...routerState(),
    ...ClockState('clock'),
    ...buildGlobalInstances('state', (i: number) => CarouselState('carouselProject' + i), 8),
    ...buildGlobalInstances('state', (i: number) => ProjectShowcaseState('projectShowcase' + i), 8),
    ...NavState,
    landingScreenActive: true,
    routeTransition: null,
    viewportSize: Fx.getViewportSize(),
    scrollPosition: window.scrollY
  },

  actions: [
    { globalActions },
    { routerActions },
    ClockActions('clock'),
    ...buildGlobalInstances('action', (i: number) => CarouselActions('carouselProject' + i) , 8)
  ],

  subscriptions: (state: state, actions: actions) => [
    ...routerSubscriptions(actions.routerActions),
    ...buildGlobalInstances('subscription', (i: number) => CarouselSubscriptions('carouselProject' + i, actions, state.router.current), 8),
    { 
      name: IntersectObserver,
      action: actions.globalActions.playPauseVideo,
      options: { target: '.video', threshold: 0.8 },
      watch: state.router.current
    },
    { 
      name: IntersectObserver,
      action: actions.globalActions.triggerAnimation,
      options: { target: '.intro-animation', threshold: 0.3 },
      watch: state.router.current
    },
    { 
      name: IntersectObserver,
      action: actions.globalActions.triggerAnimation,
      options: { target: '.intro-animation', threshold: 0.3 },
      watch: state.router.current
    },
    { 
      name: 'resize',
      action: actions.globalActions.setViewportSize
    },
    { 
      name: 'Lazy_View_Rendered',
      action: [actions.globalActions.triggerSubscriptions,  ['router', 'current']]
    },
    {
      name: 'scroll',
      action: actions.globalActions.setScrollPosition
    }
  ],

  init: () => {
    routerConfig(routerConfigObj)
  },

  view: 

  (state: state) => 
  (e: Function, x: Function, { component: c, lazy}: {component: Function, lazy: Function }) => {

    const mainNav = (): void => {
      c({ NavView }, { 
        props: { ...state },
        actions: { NavActions }
      })
    }

    const error = (): void => {
      e(div, { text: 'An error has occurred, please refresh the page and try again.'}); x(div)
    }

    e(main); 
      c(Switch(
        Route('/', () => {
          mainNav()
        }),
        Route('/about', () => {
          lazy(
            () => import('./screens/about.ts'), 
            (m: { AboutView: Function }) => c({ AboutView: m.AboutView }, { props: { ...state }}),
            () => mainNav(),
            () => error()
          )
        }),
        Route('/work', () => {
          lazy(
            () => import('./screens/work.ts'), 
            (m: { WorkView: Function }) => c({ WorkView: m.WorkView }, { props: { ...state }}),
            () => mainNav(),
            () => error()
          )
        }),
        Route('/skillset', () => {
          lazy(
            () => import('./screens/skills.ts'), 
            (m: { SkillsView: Function }) => c({ SkillsView: m.SkillsView }, { props: { ...state }}),
            () => mainNav(),
            () => error()
          )
        }),
        Route('/personal-projects', () => {
          lazy(
            () => import('./screens/personalProjects.ts'), 
            (m: { PersonalProjectsView: Function }) => c({ PersonalProjectsView: m.PersonalProjectsView }, { props: { ...state }}),
            () => mainNav(),
            () => error()
          )
        })
      ));
    x(main)
  }
}

window.karbon.hydrate(App)
