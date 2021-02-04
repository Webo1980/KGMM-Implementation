import React, { memo, useRef } from 'react';
import { faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import PropertyValue from 'components/Comparison/PropertyValue';
import FilterWrapper from 'components/Comparison/FilterWrapper';
import ROUTES from 'constants/routes';
import { functions, isEqual, omit } from 'lodash';
import { reverse } from 'named-urls';
import { Link } from 'react-router-dom';
import { ScrollSyncPane } from 'react-scroll-sync';
import ReactTable from 'react-table';
import withFixedColumnsScrollEvent from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css'; // important: this line must be placed after react-table css import
import { Contribution, Delete, ItemHeader, ItemHeaderInner, Properties, PropertiesInner } from './styled';
import TableCell from './TableCell';
import PropTypes from 'prop-types';

const ReactTableFixedColumns = withFixedColumnsScrollEvent(ReactTable);

const compareProps = (prevProps, nextProps) => {
    // remove functions from equality check (mainly targeting "removeContribution"), otherwise it is always false
    return isEqual(omit(prevProps, functions(prevProps)), omit(nextProps, functions(nextProps)));
};

const ComparisonTable = props => {
    const scrollContainerHead = useRef(null);
    const customProps = { id: 'comparisonTable' };
    const smallerFontSize = props.viewDensity === 'compact';

    let cellPadding = 10;
    if (props.viewDensity === 'normal') {
        cellPadding = 5;
    } else if (props.viewDensity === 'compact') {
        cellPadding = 1;
    }
    const getValuesNr = values => {
        return new Set(
            []
                .concat(...values)
                .map(item => item.label)
                .filter(truthy => truthy)
        ).size;
    };

    return (
        <ReactTableFixedColumns
            TheadComponent={component => {
                return (
                    <ScrollSyncPane group="one">
                        <div
                            ref={scrollContainerHead}
                            className="disable-scrollbars"
                            style={{ overflow: 'auto', top: '71px', position: 'sticky', zIndex: '3' }}
                        >
                            <div className={`comparison-thead ${component.className}`} style={component.style}>
                                {component.children}
                            </div>
                        </div>
                    </ScrollSyncPane>
                );
            }}
            TbodyComponent={component => {
                return (
                    <ScrollSyncPane group="one">
                        <div ref={props.scrollContainerBody} style={{ overflow: 'auto' }}>
                            <div className={`rt-tbody ${component.className}`} style={component.style}>
                                {component.children}
                            </div>
                        </div>
                    </ScrollSyncPane>
                );
            }}
            getProps={() => customProps}
            resizable={false}
            sortable={false}
            pageSize={
                !props.transpose
                    ? props.properties.filter(property => property.active).length
                    : props.contributions.filter(contribution => contribution.active).length
            }
            data={[
                ...(!props.transpose
                    ? props.properties
                          .filter(property => property.active && props.data[property.id])
                          .map((property, index) => {
                              return {
                                  property: property,
                                  values: props.contributions.map((contribution, index2) => {
                                      const data = props.data[property.id][index2];
                                      return data;
                                  })
                              };
                          })
                    : props.contributions.map((contribution, index) => {
                          return {
                              property: contribution,
                              values: props.properties
                                  .filter(property => property.active)
                                  .map((property, index2) => {
                                      const data = props.data[property.id][index];
                                      return data;
                                  })
                          };
                      }))
            ]}
            columns={[
                {
                    Header: (
                        <Properties>
                            <PropertiesInner transpose={props.transpose} className="first">
                                Properties
                            </PropertiesInner>
                        </Properties>
                    ),
                    accessor: 'property',
                    fixed: 'left',
                    Cell: cell =>
                        !props.transpose ? (
                            <Properties className="columnProperty">
                                <PropertiesInner className="d-flex flex-row align-items-start justify-content-between" cellPadding={cellPadding}>
                                    <PropertyValue similar={cell.value.similar} label={cell.value.label} id={cell.value.id} />
                                    <FilterWrapper
                                        data={{
                                            rules: props.getRuleByProperty(cell.value.id),
                                            stringifyType: props.stringifyType
                                        }}
                                    >
                                        <Icon
                                            icon={faFilter}
                                            className={getValuesNr(cell.original.values) > 1 ? 'd-block' : 'd-none'}
                                            style={{ cursor: 'pointer' }}
                                            color={props.getRuleByProperty(cell.value.id).length > 0 ? '#e86161' : ''}
                                            onClick={() => {
                                                props.toggleFilterDialog(cell.value.id);
                                            }}
                                        />
                                    </FilterWrapper>
                                </PropertiesInner>
                            </Properties>
                        ) : (
                            <Properties className="columnContribution">
                                <PropertiesInner transpose={props.transpose}>
                                    <Link
                                        to={reverse(ROUTES.VIEW_PAPER, {
                                            resourceId: cell.value.paperId,
                                            contributionId: cell.value.id
                                        })}
                                    >
                                        {cell.value.title ? cell.value.title : <em>No title</em>}
                                    </Link>
                                    <br />
                                    <Contribution>
                                        {cell.value.contributionLabel} {cell.value.year && `- ${cell.value.year}`}
                                    </Contribution>
                                </PropertiesInner>

                                {props.contributions.filter(contribution => contribution.active).length > 2 && (
                                    <Delete onClick={() => props.removeContribution(cell.value.id)}>
                                        <Icon icon={faTimes} />
                                    </Delete>
                                )}
                            </Properties>
                        ),
                    width: 250
                },
                ...(!props.transpose && props.contributions
                    ? props.contributions
                          .map((contribution, index) => {
                              if (contribution.active) {
                                  return {
                                      id: contribution.id, // <-here
                                      Header: () => (
                                          <ItemHeader key={`contribution${contribution.id}`}>
                                              <ItemHeaderInner>
                                                  <Link
                                                      to={reverse(ROUTES.VIEW_PAPER, {
                                                          resourceId: contribution.paperId,
                                                          contributionId: contribution.id
                                                      })}
                                                  >
                                                      {contribution.title ? contribution.title : <em>No title</em>}
                                                  </Link>
                                                  <br />
                                                  <Contribution>
                                                      {contribution.year && `${contribution.year} - `}
                                                      {contribution.contributionLabel}
                                                  </Contribution>
                                              </ItemHeaderInner>

                                              {props.contributions.filter(contribution => contribution.active).length > 2 && (
                                                  <Delete onClick={() => props.removeContribution(contribution.id)}>
                                                      <Icon icon={faTimes} />
                                                  </Delete>
                                              )}
                                          </ItemHeader>
                                      ),
                                      accessor: d => {
                                          //return d.values[index].length > 0 ? d.values[index][0].label : '';
                                          return d.values[index];
                                      },
                                      Cell: cell => <TableCell data={cell.value} viewDensity={props.viewDensity} />, // Custom cell components!
                                      width: 250
                                  };
                              } else {
                                  return null;
                              }
                          })
                          .filter(Boolean)
                    : props.properties
                          .filter(property => property.active && props.data[property.id])
                          .map((property, index) => {
                              return {
                                  id: property.id, // <-here
                                  Header: () => (
                                      <ItemHeader key={`property${property.id}`}>
                                          <ItemHeaderInner
                                              className="d-flex flex-row align-items-center justify-content-between"
                                              transpose={props.transpose}
                                          >
                                              <PropertyValue similar={property.similar} label={property.label} id={property.id} />
                                              <FilterWrapper
                                                  data={{
                                                      rules: props.getRuleByProperty(property.id),
                                                      stringifyType: props.stringifyType
                                                  }}
                                              >
                                                  <Icon
                                                      icon={faFilter}
                                                      className={getValuesNr(props.data[property.id]) > 1 ? 'd-block' : 'd-none'}
                                                      style={{ cursor: 'pointer' }}
                                                      color={props.getRuleByProperty(property.id)}
                                                      onClick={() => {
                                                          props.toggleFilterDialog(property.id);
                                                      }}
                                                  />
                                              </FilterWrapper>
                                          </ItemHeaderInner>
                                      </ItemHeader>
                                  ),
                                  accessor: d => {
                                      //return d.values[index].length > 0 ? d.values[index][0].label : '';
                                      return d.values[index];
                                  },
                                  Cell: cell => <TableCell data={cell.value} viewDensity={props.viewDensity} />, // Custom cell components!
                                  width: 250
                              };
                          }))
            ]}
            style={{
                height: 'max-content', // This will force the table body to overflow and scroll, since there is not enough room
                fontSize: smallerFontSize ? '0.95rem' : '1rem'
            }}
            showPagination={false}
        />
    );
};

ComparisonTable.propTypes = {
    contributions: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    properties: PropTypes.array.isRequired,
    removeContribution: PropTypes.func.isRequired,
    transpose: PropTypes.bool.isRequired,
    viewDensity: PropTypes.oneOf(['spacious', 'normal', 'compact']),
    toggleFilterDialog: PropTypes.func.isRequired,
    stringifyType: PropTypes.func.isRequired,
    getRuleByProperty: PropTypes.func.isRequired,
    scrollContainerBody: PropTypes.object.isRequired
};

export default memo(ComparisonTable, compareProps);
