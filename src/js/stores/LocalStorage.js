import { fromJS, Map } from 'immutable';
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return Map();
    }
    return fromJS(JSON.parse(serializedState));
  } catch (err) {
    return Map();
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};