import { fromJS } from 'immutable';
// https://www.npmjs.com/package/immutable

// P defining the initial state? gridState is our immutable store?
const initialState = fromJS({
    gridState: fromJS.Map
});


export default function game(state = initialState, action) {
    switch (action.type) {

    default:

        return state;
    }
}