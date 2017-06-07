import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator } from '../../util/keygenerator';
import { prefix } from '../../util/prefix';
import '../../style/components/header.styl';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Header extends Component {

    // define what the properties passed into this class should look like
    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired
    }

    // P column name and val are passed into the generator to make one string nameval?
    getHeader(col) {
        return (
            <th key={keyGenerator(col.name, col.value) }>{ col.name }</th>
        );
    }

    render() {

        const { columns } = this.props;
        const headers = columns.map((col) => this.getHeader(col));
        const headerProps = {
            className: prefix(CLASS_NAMES.HEADER)
        }

        return (
            <tr {...headerProps}>
                { headers }
            </tr>
        );
    }
}

// I see this function is listed here and in the parent file, Grid.jsx.
// I imagine this is a way to make this functionality available in each file that needs it.
// So, the application state is accessible from here just as it is from Grid.jsx
// P What then, is the significance of passing const HeaderProps = { columns: columns }; into this file?
// R this.props has only columns defined in the state, here!
function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Header);