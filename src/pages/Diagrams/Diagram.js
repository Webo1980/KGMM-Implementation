import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Controls, addEdge, MarkerType } from 'react-flow-renderer';
import { Container, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useContextMenu } from 'react-contexify';
import ContextMenu from 'components/DiagramEditor/ContextMenu';
import { DIAGRAM_CONTEXT_MENU_ID } from 'constants/misc';
import EditNode from 'components/DiagramEditor/EditNode';
import EditEdge from 'components/DiagramEditor/EditEdge';
import EditGroup from 'components/DiagramEditor/EditGroup';
import SaveDiagram from 'components/DiagramEditor/SaveDiagram';
import CustomNode from 'components/DiagramEditor/CustomNode';
import CustomGroup from 'components/DiagramEditor/CustomGroup';
import TitleBar from 'components/TitleBar/TitleBar';
import RequireAuthentication from 'components/RequireAuthentication/RequireAuthentication';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { reverse } from 'named-urls';
import ROUTES from 'constants/routes.js';
import { guid } from 'utils';
import { getResourceData } from 'services/similarity/index';
import Confirm from 'components/Confirmation/Confirmation';
import styled from 'styled-components';

const StyledReactFlow = styled(ReactFlow)`
    path.react-flow__edge-path {
        stroke-width: 4;
        stroke: ${props => props.theme.secondary};
        &:hover {
            stroke: ${props => props.theme.primary};
        }
    }
    .react-flow__edge.selected .react-flow__edge-path {
        stroke: ${props => props.theme.primary};
    }

    .react-flow__node-group {
        padding: 0;
    }
`;

function Diagram() {
    const location = useLocation();
    const { id } = useParams();
    const { show } = useContextMenu({
        id: DIAGRAM_CONTEXT_MENU_ID,
    });

    const [currentMenu, setCurrentMenu] = useState(null);
    const [currentNode, setCurrentNode] = useState(null);
    const [currentEdge, setCurrentEdge] = useState(null);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [diagram, setDiagram] = useState();

    const diagramRef = useRef(null);
    const [isEditNodeModalOpen, setIsEditNodeModalOpen] = useState(false);
    const [isEditEdgeModalOpen, setIsEditEdgeModalOpen] = useState(false);
    const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false);

    const [isSaveDiagramModalOpen, setIsSaveDiagramModalOpen] = useState(false);
    const [position, setPosition] = useState(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const onNodesChange = useCallback(changes => setNodes(nds => applyNodeChanges(changes, nds)), [setNodes]);
    const onEdgesChange = useCallback(changes => setEdges(eds => applyEdgeChanges(changes, eds)), [setEdges]);
    const onConnect = useCallback(connection => {
        setCurrentEdge(connection);
        setIsEditEdgeModalOpen(true);
    }, []);

    useEffect(() => {
        if (id) {
            getResourceData(id).then(res => {
                setDiagram(res.data);
                setNodes(res.data.nodes);
                setEdges(res.data.edges);
            });
        }
    }, [id]);

    const handlePaneContextMenu = event => {
        event.preventDefault();
        setCurrentMenu('pane');
        show(event, {
            props: {
                key: 'pane',
                event,
            },
        });
    };

    const handleNodeContextMenu = (event, node) => {
        event.preventDefault();
        setCurrentMenu(node.type ?? 'node');
        console.log(node.type);
        show(event, {
            props: {
                key: 'node',
                event,
                node,
            },
        });
    };

    const handleEdgeContextMenu = (event, edge) => {
        event.preventDefault();
        setCurrentMenu('edge');
        show(event, {
            props: {
                key: 'edge',
                event,
                edge,
            },
        });
    };

    const onSelectionContextMenu = useCallback(
        (event, nodes) => {
            console.log('onSelectionContextMenu', event, nodes);
            if (nodes.length > 1) {
                console.log(event);

                event.preventDefault();
                setCurrentMenu('selection');
                show(event, {
                    props: {
                        key: 'selection',
                        event,
                        nodes,
                    },
                });
            }
        },
        [show],
    );

    const handleAddGroup = useCallback(event => {
        console.log('handleAddGroup', event);
        /*
        const bounds = diagramRef.current.getBoundingClientRect();
        // Compute mouse coords relative to canvas
        const clientX = event.props.event.clientX - bounds.left;
        const clientY = event.props.event.clientY - bounds.top;
        setPosition({ x: clientX, y: clientY });
        setCurrentNode(null);
        */
        setCurrentGroup({ event: event.props.event, nodes: event.props.nodes });
        setIsEditGroupModalOpen(v => !v);
    }, []);

    const addGroup = useCallback(
        value => {
            const group = {
                id: guid(),
                type: 'group',
                data: { label: value },
                position: { x: currentGroup.event.target.offsetLeft - 20, y: currentGroup.event.target.offsetTop - 40 },
                style: {
                    width: currentGroup.event.target.clientWidth + 40,
                    height: currentGroup.event.target.clientHeight + 60,
                },
            };

            setNodes(prevNodes => [
                group,
                ...prevNodes.map(node => {
                    const child = node;
                    if (currentGroup.nodes.map(sn => sn.id).includes(node.id)) {
                        // it's important that you create a new object here
                        // in order to notify react flow about the change
                        child.parentNode = group.id;
                        child.extent = 'parent';
                        child.position = {
                            x: node.position.x - currentGroup.event.target.offsetLeft + 20,
                            y: node.position.y - currentGroup.event.target.offsetTop + 40,
                        };
                    }

                    return child;
                }),
            ]);
            setIsEditGroupModalOpen(false);
        },
        [currentGroup],
    );

    const handleAddNode = useCallback(event => {
        const bounds = diagramRef.current.getBoundingClientRect();
        // Compute mouse coords relative to canvas
        const clientX = event.props.event.clientX - bounds.left;
        const clientY = event.props.event.clientY - bounds.top;
        setPosition({ x: clientX, y: clientY });
        setCurrentNode(null);
        setIsEditNodeModalOpen(v => !v);
    }, []);

    const handleEditNode = useCallback(event => {
        setCurrentNode(event.props.node);
        setIsEditNodeModalOpen(v => !v);
    }, []);

    const handleEditGroup = useCallback(event => {
        setCurrentGroup(event.props.node);
        setIsEditGroupModalOpen(v => !v);
    }, []);

    const handleEditEdge = useCallback(event => {
        setCurrentEdge(event.props.edge);
        setIsEditEdgeModalOpen(v => !v);
    }, []);

    const handleDeleteNode = useCallback(async event => {
        const confirm = await Confirm({
            title: 'Are you sure?',
            message: (
                <>
                    Are you sure you want to delete this {event.props.node.type === 'node' ? 'node' : 'group'}?
                    <br />
                    <small>
                        <i>- {event.props.node.data.label}</i>
                    </small>
                </>
            ),
        });

        if (confirm) {
            // remove and un-plug childs
            setNodes(nds =>
                nds
                    .filter(n => n.id !== event.props.node.id)
                    .map(n => {
                        if (n.parentNode === event.props.node.id) {
                            n.parentNode = undefined;
                            n.extent = undefined;
                            n.position = { x: n.position.x + event.props.node.position.x, y: n.position.y + event.props.node.position.y };
                        }
                        return n;
                    }),
            );
        }
    }, []);

    const handleDeleteEdge = useCallback(
        async event => {
            const confirm = await Confirm({
                title: 'Are you sure?',
                message: (
                    <>
                        Are you sure you want to delete this edge?
                        <br />
                        between:
                        <br />
                        <small>
                            <i>- {nodes.find(n => n.id === event.props.edge.source)?.data.label}</i>
                        </small>
                        <br />
                        and:
                        <br />
                        <small>
                            <i>- {nodes.find(n => n.id === event.props.edge.target)?.data.label}</i>
                        </small>
                    </>
                ),
            });

            if (confirm) {
                setEdges(nds => nds.filter(n => n.id !== event.props.edge.id));
            }
        },
        [nodes],
    );

    const addNode = useCallback(
        value => {
            const node = {
                id: guid(),
                data: { label: value.value, ...value },
                position,
            };
            setNodes(prevNodes => [...prevNodes, node]);
            setIsEditNodeModalOpen(false);
        },
        [position],
    );

    const handleAddEdge = useCallback(
        value => {
            const edge = {
                ...currentEdge,
                ...(value ? { label: value.value, data: { label: value.value, ...value } } : {}),
                labelStyle: { fontSize: '14px' },
            };
            setEdges(eds => addEdge(edge, eds));
            setIsEditEdgeModalOpen(false);
        },
        [currentEdge],
    );

    const saveNode = useCallback(
        value => {
            setNodes(prevNodes =>
                prevNodes.map(node => {
                    if (node.id === currentNode.id) {
                        // it's important that you create a new object here
                        // in order to notify react flow about the change
                        node.data = {
                            ...value,
                        };
                    }

                    return node;
                }),
            );
            setIsEditNodeModalOpen(false);
        },
        [currentNode?.id],
    );

    const saveGroup = useCallback(
        value => {
            setNodes(prevNodes =>
                prevNodes.map(node => {
                    if (node.id === currentGroup.id) {
                        // it's important that you create a new object here
                        // in order to notify react flow about the change
                        node.data = {
                            label: value,
                        };
                    }

                    return node;
                }),
            );
            setIsEditGroupModalOpen(false);
        },
        [currentGroup?.id],
    );

    const saveEdge = useCallback(
        value => {
            setEdges(prevEdges =>
                prevEdges.map(edge => {
                    if (edge.id === currentEdge.id) {
                        // it's important that you create a new object here
                        // in order to notify react flow about the change
                        edge.data = {
                            ...value,
                        };
                        edge.label = value.label;
                    }
                    return edge;
                }),
            );
            setIsEditEdgeModalOpen(false);
        },
        [currentEdge?.id],
    );

    const handleSave = useCallback(() => {
        setIsSaveDiagramModalOpen(v => !v);
    }, []);

    const nodeTypes = useMemo(() => ({ default: CustomNode, group: CustomGroup }), []);

    return (
        <>
            <TitleBar
                buttonGroup={
                    <>
                        <RequireAuthentication
                            component={Button}
                            size="sm"
                            color="secondary"
                            className="float-end"
                            onClick={() => (id ? setEditMode(v => !v) : handleSave())}
                        >
                            {id ? (
                                <>
                                    <Icon icon={faPen} /> Edit
                                </>
                            ) : (
                                <>
                                    <Icon icon={faSave} /> Save
                                </>
                            )}
                        </RequireAuthentication>
                        {id && (
                            <ButtonDropdown isOpen={menuOpen} toggle={() => setMenuOpen(v => !v)}>
                                <DropdownToggle size="sm" color="secondary" className="px-3 rounded-end" style={{ marginLeft: 2 }}>
                                    <Icon icon={faEllipsisV} />
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem tag={NavLink} end to={reverse(ROUTES.RESOURCE, { id })}>
                                        View resource
                                    </DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        )}
                    </>
                }
            >
                Diagram
            </TitleBar>
            <Container className="p-2 box rounded" style={{ width: '100%', height: '500px' }}>
                <StyledReactFlow
                    onPaneContextMenu={handlePaneContextMenu}
                    onNodeContextMenu={handleNodeContextMenu}
                    onEdgeContextMenu={handleEdgeContextMenu}
                    onSelectionContextMenu={onSelectionContextMenu}
                    nodes={nodes}
                    edges={edges.map(edge => ({ ...edge, markerEnd: { type: MarkerType.Arrow } }))}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={inst => setReactFlowInstance(inst)}
                    ref={diagramRef}
                    connectionLineStyle={{ strokeWidth: 5 }}
                    nodeTypes={nodeTypes}
                >
                    <ContextMenu
                        currentMenu={currentMenu}
                        actions={[
                            { label: 'Add node', effect: handleAddNode, menu: ['pane'] },
                            { label: 'Edit node', effect: handleEditNode, menu: ['node'] },
                            { label: 'Delete node', effect: handleDeleteNode, menu: ['node'] },
                            { label: 'Edit edge', effect: handleEditEdge, menu: ['edge'] },
                            { label: 'Delete edge', effect: handleDeleteEdge, menu: ['edge'] },
                            { label: 'Create group', effect: handleAddGroup, menu: ['selection'] },
                            { label: 'Edit group', effect: handleEditGroup, menu: ['group'] },
                            { label: 'Delete group', effect: handleDeleteNode, menu: ['group'] },
                        ]}
                    />
                    <Controls />
                </StyledReactFlow>
                <EditNode
                    node={currentNode}
                    addNode={addNode}
                    saveNode={saveNode}
                    isEditNodeModalOpen={isEditNodeModalOpen}
                    setIsEditNodeModalOpen={() => setIsEditNodeModalOpen(v => !v)}
                />

                <EditGroup
                    currentGroup={currentGroup}
                    addGroup={addGroup}
                    saveGroup={saveGroup}
                    isEditGroupModalOpen={isEditGroupModalOpen}
                    setIsEditGroupModalOpen={() => setIsEditGroupModalOpen(v => !v)}
                />
                <EditEdge
                    edge={currentEdge}
                    addEdge={handleAddEdge}
                    saveEdge={saveEdge}
                    isEditEdgeModalOpen={isEditEdgeModalOpen}
                    setIsEditEdgeModalOpen={() => setIsEditEdgeModalOpen(v => !v)}
                />
                <SaveDiagram
                    diagram={reactFlowInstance?.toObject() ?? {}}
                    isSaveDiagramModalOpen={isSaveDiagramModalOpen}
                    setIsSaveDiagramModalOpen={() => setIsSaveDiagramModalOpen(v => !v)}
                />
            </Container>
        </>
    );
}

export default Diagram;
