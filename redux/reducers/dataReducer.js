import { UPDATE_DATA } from "../actionTypes";
import { LOADING_STATE } from "../actionTypes";
import { REFRESH_STATE } from "../actionTypes";

const initialState = {
    DATA: {},
    isLoading: true,
    refresh: true
}

export default function(state = initialState, action) {
    if (UPDATE_DATA == action.type) {
        return { ...state, DATA: action.payload}
    }else if(LOADING_STATE == action.type){
        return { ...state, isLoading:action.payload}
    }else if(REFRESH_STATE == action.type){
        return { ...state, refresh:action.payload}
    }
    return state
}