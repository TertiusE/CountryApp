import { UPDATE_DATA } from "../actionTypes";
import { LOADING_STATE } from "../actionTypes";
import { REFRESH_STATE } from "../actionTypes";
import { UPDATE_HISTORY } from "../actionTypes";

const initialState = {
    DATA: [],
    HISTORY: [],
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
    }else if (UPDATE_HISTORY == action.type) {
        var newArray = state.HISTORY
        newArray.push(action.payload)
        return { ...state, HISTORY:newArray}
    }
    return state
}