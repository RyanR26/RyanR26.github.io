export const domState = (id, actions) => {

  return {

    useState(initState) {
      if (typeof initState !== 'object') {
        console.warn('State must be an object.');
        return;
      }
      const statefulElement = document.getElementById(id);
      if (!statefulElement) {
        return initState
      } else {
        return JSON.parse(statefulElement.dataset.state);
      }
    },

    setState(key, value, redraw=true) {
      const statefulElement = document.getElementById(id);
      let state = JSON.parse(statefulElement.dataset.state);
      if (key) {
        state[key] = value;
      } else {
        state = value;
      }
      statefulElement.dataset.state = JSON.stringify(state);
      if (redraw) {
        actions.domStateActions.redraw();
      }
    }, 
    
    storeState(state) {
      const stateStoreElement = (props) => (e) => {
        e('input', { id: props.key, type: 'hidden', data: [`state=${JSON.stringify(state)}`, `key=${props.key}`] }, { key: props.key })
      }
      return [
        { stateStoreElement },
        { props: { key: id }}
      ]
    }
  }
};

export const domStateActions = dispatch => ({
  redraw() {
    dispatch.msgs(state => ['state', { value: state } ])
  } 
});