import './style.css'
import { Switch, Route, routerState, routerConfig, routerActions, routerSubscriptions } from '../vendor/modules/Router.js';
import { ClockState, ClockActions, ClockSubscriptions } from './clock.ts';
import { NavView } from './nav.ts';
import { main, div } from '../vendor/modules/HTMLElements.js';
import { Delay } from '../vendor/modules/time.js';
import { CarouselActions, CarouselState, CarouselSubscriptions } from './Carousel.ts';
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

const globalActions = (dispatch: { msgs: Function }) => ({

  log(arg: any) {
    dispatch.msgs(
      ['effect', {
        def: () => console.log('LOG ' + arg)
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
    navActive: true,
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
    ClockSubscriptions('clock', state.navActive, actions),
    ...CarouselSubscriptions('carouselProject1', state.router.current === '/work', actions),
    ...CarouselSubscriptions('carouselProject2', state.router.current === '/work', actions),
    { 
      name: IntersectObserver,
      action: actions.globalActions.playPauseVideo,
      options: { target: '.video' },
      when: state.router.current === '/work'
    }
  ],

  // tap: {
  //   state: (data: object) => console.log('STATE: ', data),
  //   message: (data: object) => console.log('MSG: ', data),
  //   subscriptions: (data: object) => console.log('SUBS: ', data)
  // },

  init: () => {

    routerConfig({
      hooks: [
        { 
          routes: ['/'], 
          beforeLeave: [ 
            ['state', { path: [['routeTransition', 'navActive']], value: ['in', false]}],
            Delay(1500) 
          ],
          afterEnter: [ 
            Delay(10),
            ['state', { path: [['routeTransition', , 'navActive']], value: ['out', true]}]
          ]
        }
      ]
    })
  },

  view: 

  (state: state) => 
  (e: Function, x: Function, { component: c, lazy}: {component: Function, lazy: Function }) => {

    const mainNav = (): void => {
      c({ NavView }, { props: { ...state }})
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
        Route('/personl-projects', () => {
          e(div, { text: 'projects', class: 'screen-container'})
          x(div)
        })
      ));
    x(main)
  }
}

window.karbon.render(App)