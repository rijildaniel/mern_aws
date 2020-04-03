

import { ADD_TO_CART, ADD_PRICE } from "../actions/actions";
import { combineReducers } from "redux";
import {routerReducer} from 'react-router-redux'


// export function addItemReducer(state, action) {
//     console.log(`addItemReducer ${JSON.stringify(state)} `);

//     switch (action.type) {
//         case ADD_TO_CART:
//             return {
//                 item: action.item
//             };
//         default:
//             return state; 
//     }
// }


// export function listItemReducer(state = [], action) {
//     console.log(`listItemReducer ${JSON.stringify(state)} `);
//     switch (action.type) {
//         case ADD_TO_CART:
//             return [...state, addItemReducer(undefined, action)]

//         default:
//             return state; 
//     }
// }

export function handlePriceReducer(state, action) {
    console.log(`addPriceReducer ${JSON.stringify(state)} `);

    switch (action.type) {
        case ADD_PRICE:
            return action.value;

        default:
            return state; 
    }
}

export function priceReducer(state = 0, action) {
    console.log(`priceReducer ${JSON.stringify(state)} `);
    switch (action.type) {
        case ADD_PRICE:
            return state + handlePriceReducer(undefined, action);

        default:
            return state; 
    }
}


const studentreducer = combineReducers({priceReducer, routing: routerReducer });

// export the reducer
export default studentreducer;