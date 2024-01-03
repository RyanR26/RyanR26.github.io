import './style.css'
import { Switch, Route, routerState, routerConfig, routerActions, routerSubscriptions } from '../vendor/modules/Router.js';
import { ClockState, ClockActions, ClockSubscriptions } from './clock.ts';
import { NavView } from './nav.ts';
import { main, div } from '../vendor/modules/HTMLElements.js';
import { Delay } from '../vendor/modules/time.js';
const AboutModule: object = import('./about.ts');

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

// const logFxMsg = value => ['effect', { def: () => console.log(value) }];

const App = {

  container: (document: Document) => document.getElementById('app'),

  state: {
    ...routerState(),
    ...ClockState('clock'),
    navActive: true,
    routeTransition: null
  },

  actions: [
    { routerActions },
    { ClockActions: ClockActions('clock') }
  ],

  subscriptions: (state: state, actions: actions) => [
    ...routerSubscriptions(actions.routerActions),
    ClockSubscriptions(state.navActive, actions.ClockActions)
  ],

  tap: {
    state: (data: object) => console.log('STATE: ', data),
    message: (data: object) => console.log('MSG: ', data),
    subscriptions: (data: object) => console.log('SUBS: ', data)
  },

  init: () => {

    routerConfig({
      hooks: [
        { 
          routes: ['/'], 
          beforeLeave: [ 
            ['state', { path: ['routeTransition'], value: 'in'}],
            Delay(1500) 
          ],
          afterEnter: [ 
            Delay(10),
            ['state', { path: ['routeTransition'], value: 'out'}]
          ]
        }
      ]
    })
  },

  view: 
  (state: state) => 
  (e: Function, x: Function, { component: c, lazy}: {component: Function, lazy: Function }) => {

    e(main); 

      c(Switch(

        Route('/', () => c(
          { NavView }, { props: { ...state }}
        )),

        Route('/about', () => {
          lazy(
            AboutModule, 
            (m: { AboutView: Function }) => c({ AboutView: m.AboutView }, { props: { ...state }})
          )
        }),

        Route('/contact', () => {
          e(div, { text: 'contact me', class: 'screen-container'})
          x(div)
        }),

        Route('/projects', () => {
          e(div, { text: 'projects', class: 'screen-container'})
          x(div)
        })

      ));
    
    x(main)
  }
};

window.karbon.render(App)