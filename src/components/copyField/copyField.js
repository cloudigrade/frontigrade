import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, InputGroup, Button, OverlayTrigger, Tooltip as PFTooltip } from 'patternfly-react';
import helpers from '../../common/helpers';

class CopyField extends React.Component {
  state = {
    copied: false,
    expanded: false,
    timer: null
  };

  onCopy = event => {
    const { timer } = this.state;
    const { value } = this.props;
    const success = helpers.copyClipboard(value);

    event.target.blur();
    clearTimeout(timer);

    this.setState(
      {
        copied: success
      },
      () => this.resetStateTimer()
    );
  };

  onExpand = event => {
    const { expanded } = this.state;
    event.target.blur();

    this.setState({
      expanded: !expanded
    });
  };

  onSelect = event => {
    event.target.select();
  };

  resetStateTimer() {
    const { resetTimer } = this.props;

    const timer = setTimeout(
      () =>
        this.setState({
          copied: false
        }),
      resetTimer
    );

    this.setState({ timer });
  }

  renderButton() {
    const { copied } = this.state;
    const { label, labelClicked, labelDescription, labelClickedDescription, tooltipPlacement } = this.props;

    if (labelDescription && labelClickedDescription && label && labelClicked) {
      const setToolTipId = helpers.generateId();

      return (
        <React.Fragment>
          {copied && (
            <OverlayTrigger
              overlay={<PFTooltip id={setToolTipId}>{labelClickedDescription}</PFTooltip>}
              placement={tooltipPlacement}
            >
              <Button onClick={this.onCopy} aria-label={labelClickedDescription}>
                {labelClicked}
              </Button>
            </OverlayTrigger>
          )}
          {!copied && (
            <OverlayTrigger
              overlay={<PFTooltip id={setToolTipId}>{labelDescription}</PFTooltip>}
              placement={tooltipPlacement}
            >
              <Button onClick={this.onCopy} aria-label={labelDescription}>
                {label}
              </Button>
            </OverlayTrigger>
          )}
        </React.Fragment>
      );
    }

    if (label && labelClicked) {
      return (
        <Button onClick={this.onCopy} aria-label={labelDescription}>
          {copied && label}
          {!copied && labelClicked}
        </Button>
      );
    }

    return (
      <Button onClick={this.onCopy} aria-label={labelDescription}>
        {copied && (
          <React.Fragment>
            <Icon type="fa" name="check" /> Copied
          </React.Fragment>
        )}
        {!copied && 'Copy'}
      </Button>
    );
  }

  render() {
    const { expanded } = this.state;
    const { id, multiline, expandDescription, value } = this.props;

    const setId = id || helpers.generateId();

    return (
      <Form.FormGroup className="cloudmeter-copy" controlId={setId} aria-live="polite">
        <InputGroup>
          {multiline && (
            <InputGroup.Button>
              <Button onClick={this.onExpand} className="cloudmeter-copy-display-button" aria-hidden tabIndex={-1}>
                {!expanded && <Icon type="fa" name="angle-right" />}
                {expanded && <Icon type="fa" name="angle-down" />}
              </Button>
            </InputGroup.Button>
          )}
          <Form.FormControl
            type="text"
            value={value}
            className={`cloudmeter-copy-input ${expanded && 'expanded'}`}
            readOnly
            aria-label={expandDescription}
            onClick={this.onSelect}
          />
          <InputGroup.Button>{this.renderButton()}</InputGroup.Button>
        </InputGroup>
        {expanded && (
          <textarea
            className="cloudmeter-copy-display"
            rows={5}
            aria-label={expandDescription}
            disabled
            value={value}
            aria-hidden
          />
        )}
      </Form.FormGroup>
    );
  }
}

CopyField.propTypes = {
  id: PropTypes.string,
  expandDescription: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelClicked: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelDescription: PropTypes.string,
  labelClickedDescription: PropTypes.string,
  multiline: PropTypes.bool,
  resetTimer: PropTypes.number,
  tooltipPlacement: PropTypes.string,
  value: PropTypes.string.isRequired
};

CopyField.defaultProps = {
  id: null,
  expandDescription: null,
  label: <Icon type="fa" name="paste" />,
  labelClicked: <Icon type="fa" name="check" />,
  labelDescription: 'Copy to Clipboard',
  labelClickedDescription: 'Copied',
  multiline: false,
  resetTimer: 8000,
  tooltipPlacement: 'top'
};

export { CopyField as default, CopyField };
