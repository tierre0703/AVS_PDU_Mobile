export const actions = {
    SET_SETTING: 'SET_SETTING',
    SET_MODALSETTING: 'SET_MODALSETTING',
    SET_PDULIST: 'SET_PDULIST',
    
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
    
      case actions.SET_PDULIST:
        return {
          ...state,
          pduListSettings: action.pduListSettings,
        }

    default:
      return state;
  }
};
