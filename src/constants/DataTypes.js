import Joi from 'joi';
import { MISC, ENTITIES } from 'constants/graphSettings';
import { orderBy } from 'lodash';
//https://www.w3.org/TR/xmlschema-2

const DATA_TYPES = [
    {
        name: 'Resource',
        tooltip: (
            <>
                Choose Resource to link this to a resource which can contain values on its own. <br /> To fetch an existing resource by ID type “#”
                without quotes following with the resource ID (e.g: #R12).
            </>
        ),
        type: 'object',
        _class: 'object',
        schema: Joi.string(),
        inputFormType: 'autocomplete',
        weight: 0
    },
    {
        name: 'Text',
        tooltip: 'Choose Text for values like plain text or mathematical expressions using TeX delimiters $$...$$',
        type: MISC.DEFAULT_LITERAL_DATATYPE,
        _class: ENTITIES.LITERAL,
        schema: Joi.string(),
        inputFormType: 'textarea',
        weight: 0
    },
    { name: 'Decimal', type: 'xsd:decimal', _class: ENTITIES.LITERAL, schema: Joi.number(), inputFormType: 'text', weight: 2 },
    { name: 'Integer', type: 'xsd:integer', _class: ENTITIES.LITERAL, schema: Joi.number().integer(), inputFormType: 'text', weight: 3 },
    {
        name: 'Boolean',
        tooltip: 'Choose Boolean for "true" or "false" value',
        type: 'xsd:boolean',
        _class: ENTITIES.LITERAL,
        schema: Joi.boolean(),
        inputFormType: 'boolean',
        weight: 1
    },
    { name: 'Date', type: 'xsd:date', _class: ENTITIES.LITERAL, schema: Joi.date().iso(), inputFormType: 'date', weight: 1 },
    { name: 'URL', type: 'xsd:anyURI', _class: ENTITIES.LITERAL, schema: Joi.string().uri(), inputFormType: 'text', weight: 1 }
];

export const getConfigByType = type => {
    return DATA_TYPES.find(dt => dt.type === type) || { type: MISC.DEFAULT_LITERAL_DATATYPE, validation: Joi.string(), inputFormType: 'textarea' };
};

export const getSuggestionByTypeAndValue = (type, value) => {
    const suggestions = DATA_TYPES.filter(dt => dt.type !== type)
        .filter(dt => {
            const { error } = dt.schema.validate(value);
            return error ? false : true;
        })
        .filter(dt => {
            return getConfigByType(type).weight < dt.weight;
        });

    return orderBy(suggestions, ['weight'], ['desc']);
};

export default DATA_TYPES;