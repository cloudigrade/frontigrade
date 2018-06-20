import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Button } from 'patternfly-react';
import helpers from '../../common/helpers';

class CopyField extends React.Component {
  static copyClipboard(text) {
    const clearSelection = () => {
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      } else if (window.document.selection) {
        window.document.selection.empty();
      }
    };

    let successful;

    clearSelection();

    try {
      const newTextarea = document.createElement('textarea');
      newTextarea.innerHTML = text;
      newTextarea.style.position = 'absolute';
      newTextarea.style.top = '-1000px';
      newTextarea.style.left = '-1000px';
      newTextarea.style.overflow = 'hidden';
      newTextarea.style.width = '1px';
      newTextarea.style.height = '1px';

      const range = document.createRange();
      document.body.appendChild(newTextarea);

      range.selectNode(newTextarea);

      document.getSelection().addRange(range);

      successful = document.execCommand('copy');

      document.body.removeChild(newTextarea);
      clearSelection();
    } catch (e) {
      successful = false;
      console.warn('Copy to clipboard failed.', e.message);
    }

    return successful;
  }

  state = {
    copied: false,
    expanded: false,
    timer: null
  };

  onCopy = event => {
    const { value } = this.props;
    const success = CopyField.copyClipboard(value);

    event.target.blur();
    clearTimeout(this.state.timer);

    this.setState(
      {
        copied: success
      },
      () => this.resetStateTimer()
    );
  };

  onExpand = event => {
    event.target.blur();

    this.setState({
      expanded: !this.state.expanded
    });
  };

  resetStateTimer() {
    const timer = setTimeout(
      () =>
        this.setState({
          copied: false
        }),
      1500
    );

    this.setState({ timer });
  }

  render() {
    const { copied, expanded } = this.state;
    const {
      id,
      label,
      labelDescription,
      multiline,
      toggleDescription,
      expandDescription,
      value,
      ...props
    } = this.props;
    const setId = id || helpers.generateId();

    return (
      <Form.FormGroup className="cloudmeter-copy" controlId={setId} aria-live="polite" {...props}>
        <Form.InputGroup>
          {multiline && (
            <Form.InputGroup.Button>
              <Button onClick={this.onExpand} className="cloudmeter-copy-display-button" aria-label={toggleDescription}>
                {!expanded && <Icon type="fa" name="angle-right" />}
                {expanded && <Icon type="fa" name="angle-down" />}
              </Button>
            </Form.InputGroup.Button>
          )}
          <Form.FormControl type="text" value={value} className="cloudmeter-copy-input" disabled />
          <Form.InputGroup.Button>
            <Button onClick={this.onCopy} aria-label={labelDescription}>
              {(!copied && label) ||
                (copied && (
                  <React.Fragment>
                    <Icon type="fa" name="check" /> Copied
                  </React.Fragment>
                ))}
            </Button>
          </Form.InputGroup.Button>
        </Form.InputGroup>
        {expanded && (
          <textarea className="cloudmeter-copy-display" rows={5} aria-label={expandDescription} disabled>
            {value}
          </textarea>
        )}
      </Form.FormGroup>
    );
  }
}

CopyField.propTypes = {
  id: PropTypes.string,
  expandDescription: PropTypes.string,
  label: PropTypes.string,
  labelDescription: PropTypes.string,
  multiline: PropTypes.bool,
  toggleDescription: PropTypes.string,
  value: PropTypes.string.isRequired
};

CopyField.defaultProps = {
  id: null,
  expandDescription: null,
  label: 'Copy',
  labelDescription: null,
  multiline: false,
  toggleDescription: null
};

export { CopyField as default, CopyField };
