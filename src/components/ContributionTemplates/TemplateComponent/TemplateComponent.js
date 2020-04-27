import React from 'react';
import { StatementsGroupStyle } from 'components/StatementBrowser/styled';
import PropTypes from 'prop-types';
import TemplateComponentProperty from './Property/TemplateComponentProperty';
import TemplateComponentValue from './Value/TemplateComponentValue';

function TemplateComponent(props) {
    return (
        <StatementsGroupStyle className={`noTemplate`}>
            <div className={'row no-gutters'}>
                <TemplateComponentProperty
                    handleDeleteTemplateComponent={props.handleDeleteTemplateComponent}
                    id={props.id}
                    property={props.property}
                    enableEdit={props.enableEdit}
                    handlePropertiesSelect={props.handlePropertiesSelect}
                />
                <TemplateComponentValue
                    id={props.id}
                    value={props.value}
                    minOccurs={props.minOccurs}
                    maxOccurs={props.maxOccurs}
                    enableEdit={props.enableEdit}
                    validationRules={props.validationRules}
                    handleClassOfPropertySelect={props.handleClassOfPropertySelect}
                />
            </div>
        </StatementsGroupStyle>
    );
}

TemplateComponent.propTypes = {
    id: PropTypes.number.isRequired,
    property: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
    minOccurs: PropTypes.number.isRequired,
    maxOccurs: PropTypes.number.isRequired,
    validationRules: PropTypes.object.isRequired,
    handleDeleteTemplateComponent: PropTypes.func.isRequired,
    enableEdit: PropTypes.bool.isRequired,
    handlePropertiesSelect: PropTypes.func.isRequired,
    handleClassOfPropertySelect: PropTypes.func.isRequired
};

export default TemplateComponent;
