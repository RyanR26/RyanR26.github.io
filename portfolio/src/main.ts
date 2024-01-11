import './styles/style.css'
import { Switch, Route, routerState, routerConfig, routerActions, routerSubscriptions } from '../vendor/modules/Router.js';
import { ClockState, ClockActions, ClockSubscriptions } from './clock.ts';
import { NavState, NavView, NavActions } from './nav.ts';
import { main, div } from '../vendor/modules/HTMLElements.js';
import { Delay } from '../vendor/modules/time.js';
import { CarouselActions, CarouselState, CarouselSubscriptions } from './carousel.ts';
import { IntersectObserver } from '../vendor/modules/subscriptions.js';

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
  }
})

const Fx = {
  
  playPauseVideo(element: HTMLVideoElement, condition: boolean) {
    if (condition) {
      element.play()
    } else {
      element.pause()
    }
  }
}

const App = {

  container: (document: Document) => document.getElementById('app'),

  state: {
    ...routerState(),
    ...ClockState('clock'),
    ...CarouselState('carouselProject1'),
    ...CarouselState('carouselProject2'),
    ...NavState,
    landingScreenActive: true,
    routeTransition: null
  },

  actions: [
    { globalActions },
    { routerActions },
    ClockActions('clock'),
    CarouselActions('carouselProject1'),
    CarouselActions('carouselProject2')
  ],

  subscriptions: (state: state, actions: actions) => [
    ...routerSubscriptions(actions.routerActions),
    ClockSubscriptions('clock', state.landingScreenActive, actions),
    CarouselSubscriptions('carouselProject1', actions, state.router.current),
    CarouselSubscriptions('carouselProject2', actions, state.router.current),
    { 
      name: IntersectObserver,
      action: actions.globalActions.playPauseVideo,
      options: { target: '.video' },
      watch: state.router.current
    }
  ],

  tap: {
    // state: (data: object) => console.log('STATE: ', data),
    // message: (data: object) => console.log('MSG: ', data),
    // subscriptions: (data: object) => console.log('SUBS: ', data)
  },

  init: () => {

    routerConfig({
      hooks: [
        { 
          routes: ['/'], 
          beforeLeave: [ 
            (state: state) => 
              ['control', { 
                if: state.router.next !== '/contact',
                false: ['', 'skip', 2]
              }],
            ['state', { 
              path: [['routeTransition', 'landingScreenActive']], 
              value: ['in', false]
            }],
            Delay(1500) 
          ],
          afterEnter: [ 
            Delay(10),
            ['state', { 
              path: [['routeTransition', 'landingScreenActive']], 
              value: ['out', true]
            }]
          ]
        }
      ]
    })
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
      e(div, { text: 'An error has occurred, please refresh the page and try again.'})
      x(div)
    }

    e(main); 
      c(Switch(
        Route('/', () => {
          mainNav()
        }),
        Route('/about', () => {
          lazy(
            () => import('./about.ts'), 
            (m: { AboutView: Function }) => c({ AboutView: m.AboutView }, { props: { ...state }}),
            () => mainNav(),
            () => error()
          )
        }),
        Route('/work', () => {
          lazy(
            () => import('./work.ts'), 
            (m: { WorkView: Function }) => c({ WorkView: m.WorkView }, { props: { ...state }}),
            () => mainNav(),
            () => error()
          )
        }),
        Route('/skills', () => {
          lazy(
            () => import('./skills.ts'), 
            (m: { SkillsView: Function }) => c({ SkillsView: m.SkillsView }, { props: { ...state }}),
            () => mainNav(),
            () => error()
          )
        }),
        Route('/personal-projects', () => {
          lazy(
            () => import('./personalProjects.ts'), 
            (m: { PersonalProjectsView: Function }) => c({ PersonalProjectsView: m.PersonalProjectsView }, { props: { ...state }}),
            () => mainNav(),
            () => error()
          )
        })
      ));
    x(main)
  }
}

window.karbon.render(App)