import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Button } from 'patternfly-react';
import helpers from '../../common/helpers';

class CopyField extends React.Component {
  static copyClipboard(text, html = false) {
    let successful;

    try {
      window.getSelection().removeAllRanges();

      let newTextarea;

      if (html) {
        newTextarea = document.createElement('textarea');
        newTextarea.innerHTML = text;
      } else {
        newTextarea = document.createElement('span');
        newTextarea.appendChild(document.createTextNode(text));
      }

      newTextarea.style.position = 'absolute';
      newTextarea.style.top = '-1000px';
      newTextarea.style.left = '-1000px';
      newTextarea.style.overflow = 'hidden';
      newTextarea.style.width = '1px';
      newTextarea.style.height = '1px';

      const range = document.createRange();
      window.document.body.appendChild(newTextarea);

      range.selectNode(newTextarea);

      window.getSelection().addRange(range);

      successful = window.document.execCommand('copy');

      window.document.body.removeChild(newTextarea);
      window.getSelection().removeAllRanges();
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
    const { value, isHtml } = this.props;
    const success = CopyField.copyClipboard(value, isHtml);

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

  render() {
    const { copied, expanded } = this.state;
    const { id, label, labelDescription, multiline, expandDescription, value } = this.props;
    const setId = id || helpers.generateId();

    return (
      <Form.FormGroup className="cloudmeter-copy" controlId={setId} aria-live="polite">
        <Form.InputGroup>
          {multiline && (
            <Form.InputGroup.Button>
              <Button onClick={this.onExpand} className="cloudmeter-copy-display-button" aria-hidden tabIndex={-1}>
                {!expanded && <Icon type="fa" name="angle-right" />}
                {expanded && <Icon type="fa" name="angle-down" />}
              </Button>
            </Form.InputGroup.Button>
          )}
          <Form.FormControl
            type="text"
            value={value}
            className={`cloudmeter-copy-input ${expanded && 'expanded'}`}
            readOnly
            aria-label={expandDescription}
            onClick={this.onSelect}
          />
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
  isHtml: PropTypes.bool,
  label: PropTypes.string,
  labelDescription: PropTypes.string,
  multiline: PropTypes.bool,
  resetTimer: PropTypes.number,
  value: PropTypes.string.isRequired
};

CopyField.defaultProps = {
  id: null,
  expandDescription: null,
  isHtml: false,
  label: 'Copy',
  labelDescription: null,
  multiline: false,
  resetTimer: 8000
};

export { CopyField as default, CopyField };
