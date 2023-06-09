import { useState, useEffect, useCallback } from 'react';
import { Row, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ObservatoryModal from 'components/ObservatoryModal/ObservatoryModal';
import useCreator from 'components/Comparison/hooks/useCreator';
import useProvenance from 'components/Comparison/hooks/useProvenance';
import { Link } from 'react-router-dom';
import { reverse } from 'named-urls';
import ROUTES from 'constants/routes';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useSelector } from 'react-redux';
import UserAvatar from 'components/UserAvatar/UserAvatar';

const StyledOrganizationCard = styled.div`
    border: 0;
    .logoContainer {
        padding: 1rem;
        position: relative;
        display: block;

        &::before {
            // for aspect ratio
            content: '';
            display: block;
            padding-bottom: 150px;
        }
        img {
            position: absolute;
            max-width: 100%;
            max-height: 150px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        &:active,
        &:focus {
            outline: 0;
            border: none;
            -moz-outline-style: none;
        }
    }
`;

function ProvenanceBox() {
    const [showAssignObservatory, setShowAssignObservatory] = useState(false);
    const id = useSelector(state => state.comparison.comparisonResource.id);
    const user = useSelector(state => state.auth.user);
    const { createdBy } = useCreator();
    const { observatory, updateCallBack } = useProvenance();

    if (isEmpty(observatory) && !createdBy && (!user || (!!user && !user.isCurationAllowed))) {
        return null;
    }

    const isDoubleBlind =
        observatory?.organization?.metadata?.is_double_blind && moment().format('YYYY-MM-DD') < observatory?.organization?.metadata?.date;

    return (
        <div className="container box rounded-3 mt-4">
            <Row>
                <div className="col-8 d-flex align-items-center ">
                    <div className="pt-4 pb-4 ps-4 pe-4">
                        {observatory && (
                            <>
                                <p>
                                    Belongs to observatory:
                                    {!!user && user.isCurationAllowed && (
                                        <Button className="ms-2 p-0" size="sm" onClick={() => setShowAssignObservatory(true)} color="link">
                                            <Icon icon={faPen} /> Edit
                                        </Button>
                                    )}
                                </p>
                                <h4 className="mb-3">
                                    <Link to={reverse(ROUTES.OBSERVATORY, { id: observatory.display_id })}>{observatory.name}</Link>
                                </h4>
                            </>
                        )}
                        {createdBy?.id && !isDoubleBlind && (
                            <>
                                <div className="mb-1">
                                    <i>Added by:</i>
                                </div>
                                <UserAvatar userId={createdBy.id} showDisplayName={true} />
                            </>
                        )}
                        {isEmpty(observatory) && !!user && user.isCurationAllowed && (
                            <div className="mt-3">
                                <Button size="sm" outline onClick={() => setShowAssignObservatory(true)}>
                                    Assign to observatory
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                {observatory && observatory.organization && (
                    <div className="col-4">
                        <div className={!observatory.organization.logo ? 'm-4' : ''}>
                            <StyledOrganizationCard className="card h-100 border-0">
                                <Link className="logoContainer" to={reverse(ROUTES.ORGANIZATION, { id: observatory.organization.display_id })}>
                                    {observatory.organization.logo ? (
                                        <img
                                            className="mx-auto p-2"
                                            src={observatory.organization.logo}
                                            alt={`${observatory.organization.name} logo`}
                                        />
                                    ) : (
                                        observatory.organization.name
                                    )}
                                </Link>
                            </StyledOrganizationCard>
                        </div>
                    </div>
                )}

                <ObservatoryModal
                    callBack={updateCallBack}
                    showDialog={showAssignObservatory}
                    resourceId={id}
                    observatory={!isEmpty(observatory) ? observatory : null}
                    organization={!isEmpty(observatory) && !isEmpty(observatory.organization) ? observatory.organization : null}
                    toggle={() => setShowAssignObservatory(v => !v)}
                />
            </Row>
        </div>
    );
}

export default ProvenanceBox;
