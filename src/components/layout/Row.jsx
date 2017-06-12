import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';
import Cell from './Cell.jsx';
import { prefix } from '../../util/prefix';
import { emptyFn } from '../../util/emptyFn';
import '../../style/components/row.styl';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Row extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.Object),
        handleCellClick: React.PropTypes.func,
        handleCellDblClick: React.PropTypes.func,
        startPage:  React.PropTypes.number,
        endPage:  React.PropTypes.number,
        pageSize: React.PropTypes.number,
        enablePaging: true
    }

    getRows(row, handleCellClick, handleCellDblClick) {

        // use the keys of this row object to spit out a bunch of cells
        // access row[k] in Cell.jsx
        //  cells then becomes a list of <td>data</td> objects!
        const cells = Object.keys(row).map(
            (k) => <Cell cellData={ row[k] } key={ keyGenerator(k) } />
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

    getRowSelection(rows, start, end, pageSize) {
        const selectedRows = rows.slice(start * pageSize, end * pageSize);

        return selectedRows;
    }

    render() {

        // colummns and data are passed into Row thanks to ...RowProps:
        // const RowProps = { columns: columns, data: data };
        const { 
            columns, 
            data, 
            handleCellClick,
            handleCellDblClick,
            enablePaging,
            startPage,
            endPage,
            pageSize
        } = this.props;

        const allRows = data.map((row) => 
            this.getRows(row, handleCellClick, handleCellDblClick));
        
        const rows = enablePaging 
            ? this.getRowSelection(allRows, startPage, endPage, pageSize) : allRows;

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