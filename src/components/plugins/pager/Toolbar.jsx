import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { keyGenerator, keyFromObject } from '../../../util/keygenerator';
import { prefix } from '../../../util/prefix';
import { emptyFn } from '../../../util/emptyFn';
import '../../../style/components/plugins/pager/toolbar.styl';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { 
    setPage, 
    setPageAsync 
} from '../../../actions/plugins/pager/PagerActions';
import Request from '../ajax/Request';

class PagerToolbar extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired,
        plugins: React.PropTypes.object,
        pageSize: React.PropTypes.number.isRequired,
        recordType: 'Records',
        nextButtonText: 'Next',
        lastButtonText: 'Last',
        BUTTON_TYPES: {
            NEXT: 'NEXT',
            LAST: 'LAST'
        }
    }

    handleButtonClick(type, pageIndex) {
        const { PAGER } = this.props.plugins;
        const { store, BUTTON_TYPES, pageSize } = this.props;
        let event;

        if (PAGER.pagingType === 'local') {
            store.dispatch(setPage(pageIndex, type, BUTTON_TYPES));
        }

        else if (PAGER.pagingType === 'remote' && PAGER.pagingSource) {
            store.dispatch(setPageAsync(pageIndex, pageSize, type, BUTTON_TYPES, PAGER.pagingSource));
        }

        else {
            console.warn('Please configure paging plugin pagingType to local if no pagingSource is provided');
        }
    }

    getButton(type, pageIndex) {
        const { nextButtonText, lastButtonText, BUTTON_TYPES } = this.props;

        const buttonProps = {
            onClick: this.handleButtonClick.bind(this, type, pageIndex),
            children: type === BUTTON_TYPES.NEXT ? nextButtonText : lastButtonText
        }

        return (
            <button { ...buttonProps } />
        )
    }

    getTotal(dataSource, pagerDefaults) {

        if (!dataSource || !dataSource.data) {
            return 0;
        }

        if (pagerDefaults && pagerDefaults.pagingType === 'remote') {
            return dataSource.total;
        }

        else if (pagerDefaults && pagerDefaults.pagingType === 'local') {
            return dataSource.data.length;
        }

    }

    getPager(dataSource) {

        const { 
            pageSize, 
            recordType,
            BUTTON_TYPES,
            pager,
            plugins 
        } = this.props;

        const pageIndex = pager && pager.pageIndex || 0;

        const toolbarProps = {
            className: prefix(CLASS_NAMES.PAGERTOOLBAR)
        }

        const total = this.getTotal(dataSource, plugins.PAGER);

        return (
            <tfoot>
                <tr {...toolbarProps }>
                    <td colSpan="100%">
                        <div> 
                            <span>
                                { `${pageIndex * pageSize} through ${(pageIndex + 1) * pageSize } of ${total} ${recordType} Displayed` }
                            </span>
                            <span>
                               { this.getButton(BUTTON_TYPES.NEXT, pageIndex) }
                               { this.getButton(BUTTON_TYPES.LAST, pageIndex) }
                            </span>
                        </div>
                    </td>
                </tr>
            </tfoot>
        );
    }

    render() {

        const { plugins, dataSource } = this.props;

        const pagerComponent = plugins 
                        && plugins.PAGER 
                        && plugins.PAGER.enabled ? this.getPager(dataSource) : null;

        return pagerComponent;
    }
}

function mapStateToProps(state) {
    return {
        pager: state.pager.get('pagerState'),
        dataSource: state.dataSource.get('gridData')
    };
}

export default connect(mapStateToProps)(PagerToolbar);