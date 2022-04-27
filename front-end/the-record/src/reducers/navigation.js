import * as type from '../actions/navigation';

const navState = {
  navPage: 'nav-home',
};

const navigation = (state = navState, action = {}) => {
  switch (action.type) {
    case type.ADD_NAVPAGE:
      return {
        ...state,
        navPage: action.data,
      };

    default:
      return state;
  }
};

export default navigation;
