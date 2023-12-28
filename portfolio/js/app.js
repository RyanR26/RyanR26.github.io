const App = {

  container: document => document.getElementById('app-container'),

  state: {
    test: 'Hello from Karbon'
  },

  actions: [
  ],

  subscriptions: (state, actions) => [
  ],

  tap: {
    state: data => console.log('STATE: ', data),
    message: data => console.log('MSG: ', data),
    subscriptions: data => console.log('SUBS: ', data)
  },

  view: (state, actions) => (e, x, { component: c }) => {

    e('div', { text: state.test }); x('div')
  }
};

render(App)