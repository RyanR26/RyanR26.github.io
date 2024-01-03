import { div } from '../vendor/modules/HTMLElements.js';
import { LocalTime } from '../vendor/modules/time.js';
import { Interval } from '../vendor/modules/subscriptions.js';

// interface actions {
//   tick: Function
// }

// interface state { 
//   navActive: boolean
// }

interface props {
  time: Date,
  title: string
}

interface dispatch {
  msgs: Function
}

export const ClockState = (id: string='clock'): object => ({
  [id] : {
    active: true,
    time: null,
    title: 'time'
  }
})

export const ClockActions = (id: string='clock'): Function => (dispatch: dispatch): object => ({
  tick() {
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

export const ClockSubscriptions = (active: boolean, actions: { tick: Function }): object => ({
  name: Interval,
  action: actions.tick,
  when: active,
  options: { 
    time: 1000
  }
})

export const ClockView = (props: props): Function => (e: Function, x: Function): void => {
    e(div, { class: 'clock-font',  text: props.time }); x(div)
} 