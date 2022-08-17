import { Handle, Position } from 'react-flow-renderer';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getResourceLink } from 'utils';

function CustomNode({ data }) {
    return (
        <>
            <Handle type="target" position={Position.Top} />
            {data.id !== data.label ? (
                <>
                    <Link to={getResourceLink(data.classes?.[0], data.id)}>{data.label}</Link>
                </>
            ) : (
                <>{data.label}</>
            )}

            <Handle type="source" position={Position.Bottom} />
        </>
    );
}

CustomNode.propTypes = {
    data: PropTypes.object,
};
export default CustomNode;
