import { UPDATE_DATA } from "../actionTypes"
import { UPDATE_HISTORY } from "../actionTypes"
import { LOADING_STATE } from "../actionTypes"
import { REFRESH_STATE } from "../actionTypes"

export const UpdateData = (i) => {
    return {
    type: UPDATE_DATA,
    payload:  i
    }
}

export const setLoading = (i) => {
    return {
    type: LOADING_STATE,
    payload:  i
    }
}
export const setRefresh = (i) => {
    return {
    type: REFRESH_STATE,
    payload:  i
    }
}

export const UpdateHistory = (i) => {
    return {
    type: UPDATE_HISTORY,
    payload:  i
    }
}