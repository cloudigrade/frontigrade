import React from 'react';
import PropTypes from 'prop-types';
import { Icon, OverlayTrigger, Popover, Tooltip as PFTooltip } from 'patternfly-react';
import helpers from '../../common/helpers';

const Tooltip = ({ children, tooltip, id, placement, popover, trigger, delayShow, ...props }) => {
  const setId = id || helpers.generateId();

  const tooltipPopover = popover ? (
    <Popover id={setId} {...props}>
      {popover}
    </Popover>
  ) : (
    <PFTooltip id={setId} {...props}>
      {tooltip || 'example tooltip'}
    </PFTooltip>
  );

  return (
    <OverlayTrigger overlay={tooltipPopover} placement={placement} trigger={trigger} delayShow={delayShow}>
      <span>{children || <Icon type="pf" name="info" />}</span>
    </OverlayTrigger>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
  popover: PropTypes.node,
  tooltip: PropTypes.node,
  id: PropTypes.string,
  placement: PropTypes.string,
  trigger: PropTypes.array,
  delayShow: PropTypes.number
};

Tooltip.defaultProps = {
  children: null,
  popover: null,
  tooltip: null,
  id: null,
  placement: 'top',
  trigger: ['hover'],
  delayShow: 500
};

export { Tooltip as default, Tooltip };
