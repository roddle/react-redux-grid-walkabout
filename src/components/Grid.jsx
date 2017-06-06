import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import Header from './layout/Header.jsx';
import Row from './layout/Row.jsx';

class Grid extends Component {

    // P How is defaltProps used?
    // I This is a way to describe the model for testing
    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.Object),
        dataSource: React.PropTypes.string
    }

    render() {

        //  state object now in this.props 
        const { columns, data } = this.props;


        const HeaderProps = {
            columns: columns
        };

        const RowProps = {
            columns: columns,
            data: data
        };

        // P what is the ...?
        // R a way to automate passing all properties into Header.jsx, Row.jsx
        return (
            <div>
                <table>
                    <thead>
                        <Header { ...HeaderProps } />
                    </thead>
                    <Row { ...RowProps } />
                </table>
            </div>
        );
    }
}

function mapStateToProps() {
    // P what does this object catch?
    // R the state object
    return {};
}

export default connect(mapStateToProps)(Grid);