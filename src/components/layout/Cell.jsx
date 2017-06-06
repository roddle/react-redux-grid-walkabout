import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator } from '../../util/keygenerator';

class Cell extends Component {

    static defaultProps = {
        data: React.PropTypes.String
    }

    // row[k] is a string, cellData
    render() {

        const { cellData } = this.props;

        // stick that data in a table division!
        return (
            <td>
                { cellData }
            </td>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Cell);