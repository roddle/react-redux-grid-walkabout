import { fromJS } from 'immutable';
import { SET_DATA } from '../../constants/ActionTypes';

const initialState = fromJS({
    gridData: fromJS.Map
});

export default function dataSource(state = initialState, action) {
    switch (action.type) {

    case SET_DATA:
        return state.set('gridData', Object.assign({}, state.get('pagerState'),
            {
                data: action.data,
                total: action.total
            }
        ));

    default:

        return state;
    }
}