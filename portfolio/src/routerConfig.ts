import { Delay } from '../vendor/modules/time.js';

interface state {
  [key: string]: any  
}

export const routerConfigObj = {

  hooks: [
    { 
      routes: ['/'], 

      beforeLeave: [ 
        (state: state) => 
          ['control', { 
            if: state.viewportSize === 'large',
            false: ['', 'skip', 2]
          }],
        ['state', { 
          path: [['routeTransition', 'landingScreenActive']], 
          value: ['in', false]
        }],
        Delay(1500) 
      ],

      afterEnter: [ 
        (state: state) => 
          ['control', { 
            if: state.viewportSize === 'large',
            false: ['', 'skip', 1]
          }],
        Delay(10),
        ['state', { 
          path: [['routeTransition', 'landingScreenActive']], 
          value: ['out', true]
        }]
      ]
    }
  ]
}