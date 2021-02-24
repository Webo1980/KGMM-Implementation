import React, { Component } from 'react';
import { Alert, Button } from 'reactstrap';
import SelfVisDataModel from 'libs/selfVisModel/SelfVisDataModel';
import { createValueSelectors, createLabelSelectors, isMounted, getSelectorsState, createLabelEditor, createValueEditor } from './HelperFunctions';
import PropTypes from 'prop-types';

class CustomizationBarChart extends Component {
    constructor(props) {
        super(props);
        this.selfVisModel = new SelfVisDataModel(); // this access the instance of the data (its a singleton)
        this.errorCodeItem = {
            0: 'BAR_CHART_NO_STRING_TYPES_FOR_LABEL',
            1: 'BAR_CHART_NO_NUMBER_TYPES_FOR_VALUE'
        };
        this.errorCodeMessages = {
            BAR_CHART_NO_STRING_TYPES_FOR_LABEL: 'BarChart error: It appears there is no column mapped as string for labels',
            BAR_CHART_NO_NUMBER_TYPES_FOR_VALUE: 'BarChart error: It appears there is no column mapped as number for values'
        };
        this.yAxisSelectorMaxCount = -1;

        this.cachedXAxisSelector = undefined;
        this.cachedYAxisSelector = undefined;
    }

    state = {
        errorDataNotSupported: false,
        errorMessage: undefined,
        xAxisSelector: undefined,
        xAxisSelectorOpen: false,
        yAxisSelector: [],
        yAxisInterValSelectors: {},
        yAxisSelectorOpen: [],
        yAxisSelectorCount: 1
    };

    componentDidMount() {
        isMounted(this);
    }

    componentDidUpdate = () => {
        if (this.props.propagateUpdates) {
            this.props.propagateUpdates(getSelectorsState(this));

            const customizationState = {
                ...this.state,
                errorDataNotSupported: false,
                errorMessage: undefined,
                errorValue: -1
            };
            if (customizationState.xAxisLabel === undefined) {
                if (this.state.cachedXAxisSelector) {
                    customizationState.xAxisLabel = this.state.cachedXAxisSelector.xAxisSelector ? this.state.cachedXAxisSelector.xAxisSelector : '';
                } else {
                    customizationState.xAxisLabel = customizationState.xAxisSelector;
                }
            }
            if (customizationState.yAxisLabel === undefined) {
                if (this.state.cachedYAxisSelector) {
                    customizationState.yAxisLabel = this.state.cachedXAxisSelector.yAxisSelector
                        ? this.state.cachedXAxisSelector.xAxisSelector[0]
                        : '';
                } else {
                    customizationState.yAxisLabel = customizationState.yAxisSelector[0];
                }
            }
            this.selfVisModel.saveCustomizationState(customizationState);
        }
    };

    createValueSelectors = () => {
        return createValueSelectors(this);
    };

    createLabelSelectors = () => {
        return createLabelSelectors(this);
    };

    createLabelEditor = () => {
        return createLabelEditor(this);
    };
    createValueEditor = () => {
        return createValueEditor(this);
    };

    renderErrorMessages = () => {
        const msg = this.errorCodeMessages[this.errorCodeItem[this.state.errorValue]];
        return <Alert color="danger">{msg}</Alert>;
    };

    setErrorCode = val => {
        this.setState({ errorDataNotSupported: true, errorValue: val });
    };
    render() {
        // mappings;
        return (
            <div>
                {!this.state.errorDataNotSupported && (
                    <>
                        Y-axis{this.createLabelSelectors()}
                        <div className="mt-2">Label{this.createLabelEditor()}</div>
                        <hr />
                        X-axis Label<div className="mt-2">{this.createValueEditor()}</div>
                        {this.createValueSelectors()}
                    </>
                )}
                {this.yAxisSelectorMaxCount !== -1 && this.state.yAxisSelectorCount < this.yAxisSelectorMaxCount && (
                    <Button
                        color="primary"
                        size="sm"
                        className="mt-1"
                        onClick={() => {
                            this.setState({ yAxisSelectorCount: this.state.yAxisSelectorCount + 1 });
                        }}
                    >
                        Add X-axis value
                    </Button>
                )}
                {this.state.errorDataNotSupported && this.renderErrorMessages()}
            </div>
        );
    }
}
CustomizationBarChart.propTypes = {
    propagateUpdates: PropTypes.func,
    restoreCustomizationState: PropTypes.bool
};
export default CustomizationBarChart;
