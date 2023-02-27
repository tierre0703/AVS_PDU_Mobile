export const actions = {
    SET_SETTING: 'SET_SETTING',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SETTING:
      return {
        ...state,
        setting: action.setting,
      };
    // add redux values

    default:
      return state;
  }
};
