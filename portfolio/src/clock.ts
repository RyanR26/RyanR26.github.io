import { div } from '../vendor/modules/HTMLElements.js';
import { LocalTime } from '../vendor/modules/time.js';
import { Interval } from '../vendor/modules/subscriptions.js';

interface props {
  time: Date,
  title: string
}

export const ClockState = (id: string='clock'): object => ({
  [id] : {
    active: true,
    time: null,
    title: 'time'
  }
})

export const ClockActions = (id: string='clock'): object => ({ 

  [id]: (dispatch: { msgs: Function }): object => ({

    tick() {
      console.log('tick')
      dispatch.msgs(
        LocalTime(),
        (time: Date) => 
          ['state', {
            path: [id, 'time'], 
            value: time
          }]
      )
    }
  })
})

interface actions {
  [key: string]: { tick: Function }
}

export const ClockSubscriptions = (id: string, active: boolean, actions: actions): object => ({
  name: Interval,
  action: actions[id].tick,
  when: active,
  options: { 
    time: 1000
  },
  key: id
})

export const ClockView = (props: props): Function => (e: Function, x: Function): void => {
  e(div, { class: 'clock-font', text: props.time }); x(div)
} 