export const actions = {
    SET_SETTING: 'SET_SETTING',
    SET_MODALSETTING: 'SET_MODALSETTING',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SETTING:
      return {
        ...state,
        setting: action.setting,
      };
    // add redux values
    case actions.SET_MODALSETTING:
      return {
        ...state,
        modalSetting: action.modalSetting,
      };

    default:
      return state;
  }
};
