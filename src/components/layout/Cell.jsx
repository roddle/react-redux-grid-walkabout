import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator } from '../../util/keygenerator';
import { prefix } from '../../util/prefix';
import { emptyFn } from '../../util/emptyFn';
import '../../style/components/cell.styl';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Cell extends Component {

    static defaultProps = {
        data: React.PropTypes.String
    }

    // row[k] is a string, cellData
    render() {

        const { cellData } = this.props;

        const cellProps = {
            className: prefix(CLASS_NAMES.CELL)
        };

        // stick that data in a table division!
        return (
            <td {...cellProps}>
                { cellData }
            </td>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Cell);