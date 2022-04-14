import { createContext } from "react";
import { createStore } from "redux";

let reduxListState = {
    test: "redux list state",
    list: [],
}

let reduxListReducer = (state = reduxListState, {type, payload}) => {
    switch (type) {
        case "SET_TEST":
            return {
                ...state,
                test: payload
            }
        case "SET_LIST": 
            return {
                ...state,
                ...payload
            }
        case "EDIT_INFO":

            let newList = [...state.list];
            newList.forEach( (e, i) => {
                if(payload.id === e.id) {
                    newList[i] = payload;
                    return
                }
            })

            return {
                ...state,
                list: newList
            }
        case "DELETE_INFO":
            let newList2 = [];
            // console.log({listBeforeRedux: state.list.length})
            state.list.forEach( (e) => {
                if(e.id !== payload) {
                    newList2.push(e)
                }
            })
            // console.log({listAfterRedux: newList2.length})
            return {
                ...state,
                list: newList2
            }
        case "ADD_INFO": 

            return {
                ...state,
                list: [...state.list, payload]
            }
       
        default: return state;
    }
}

let reduxListContext = createContext();
let reduxListStore = createStore(reduxListReducer);

let mapReduxListStateToProps = state => {
    return {reduxListStates: state}
}
let mapReduxListDispatchToProps = dispatch => {
    return {
        reduxListSetter: {
            setTest: data => { dispatch({type:"SET_TEST", payload: data})},
            setList: data => {dispatch({type: "SET_LIST", payload: data})},
            editInfo: data => {dispatch({type: "EDIT_INFO", payload: data})},
            addInfo: data => {dispatch({type: "ADD_INFO", payload: data})},
            deleteInfo: data => {dispatch({type: "DELETE_INFO", payload: data})},
            
        }
    }
}

export {
    reduxListState, 
    reduxListStore, 
    reduxListContext, 
    mapReduxListDispatchToProps, 
    mapReduxListStateToProps
}

