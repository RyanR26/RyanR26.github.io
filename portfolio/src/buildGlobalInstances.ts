export const buildGlobalInstances = (
  type: 'state' | 'action' | 'subscription', 
  constructorFunction: Function, 
  instances: number
): any => {

  let state = {};
  const actions: object[] = []
  const subscriptions: object[] = [];

  for (let i=1; i<=instances; i++) {
    if (type == 'state') {
      state = Object.assign({}, state, constructorFunction(i))
    }
    else if(type == 'action') {
      actions.push(constructorFunction(i))
    }
    else if(type == 'subscription') {
      subscriptions.push(constructorFunction(i))
    }
  }

  if (type === 'state') {
    return state;
  } 
  else if (type === 'action') {
    return actions;
  }
  else if (type === 'subscription') {
    return subscriptions;
  }
}