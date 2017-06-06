import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';
import Cell from './Cell.jsx';

class Row extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.Object)
    }

    getRows(row) {

        // use the keys of this row object to spit out a bunch of cells
        // access row[k] in Cell.jsx
        //  cells then becomes a list of <td>data</td> objects!
        const cells = Object.keys(row).map(
            (k) => <Cell cellData={ row[k] } key= { keyGenerator(k) } />
        );

        // each row needs a unique key for react to be able to keep track of everything
        const rowProps = {
            key: keyFromObject(row)
        };

        // place it in the row header, all cells go with this key
        return (
            <tr { ...rowProps }>
                { cells }
            </tr>
        );
    }

    render() {

        // colummns and data are passed into Row thanks to ...RowProps:
        // const RowProps = { columns: columns, data: data };
        const { columns, data } = this.props;
        // 
        const rows = data.map((row) => this.getRows(row));

        return (
            <tbody>
                { rows }
            </tbody>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Row);