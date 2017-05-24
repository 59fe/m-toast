'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('./index.less');
var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PropTypes = require('prop-types');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _maskM = require('m-mask');

var _maskM2 = _interopRequireDefault(_maskM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var toast_prefix = 'toast';

var toast_container = null;

var Toast = function (_React$Component) {
    _inherits(Toast, _React$Component);

    function Toast() {
        _classCallCheck(this, Toast);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Toast.show = function show(message) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (!toast_container) {
            toast_container = document.createElement('div');
            document.body.appendChild(toast_container);
        }

        if (typeof message === 'string') {
            options.message = message;
        } else {
            options = message || {};
        }

        _reactDom2.default.render(_react2.default.createElement(Toast, options), toast_container);

        return this;
    };

    Toast.prototype.componentDidMount = function componentDidMount() {
        this.position();
    };

    Toast.prototype.componentDidUpdate = function componentDidUpdate() {
        clearTimeout(Toast.tid)
        this.position();
    };

    Toast.prototype.componentWillUnmount = function componentWillUnmount() {
        if (toast_container) {
            document.body.removeChild(toast_container);
            toast_container = null;
        }
    };

    Toast.prototype.position = function position() {
        var toast_el = this.refs.toast;
        var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

        toast_el.style.marginTop = '-' + Math.round(toast_el.clientHeight / 2) + 'px';
        //toast_el.style.marginLeft = '-' + Math.round(toast_el.clientWidth / 2) + 'px';
        toast_el.style.left = (viewportWidth - toast_el.clientWidth) / 2 + 'px';

        Toast.tid = setTimeout(function () {
            if (toast_container) {
                _reactDom2.default.unmountComponentAtNode(toast_container);
            } else {
                toast_el.remove();
            }
        }, this.props.duration);
    };

    Toast.prototype.render = function render() {
        var _props = this.props;
        var markable = _props.markable;
        var message = _props.message;
        var zIndex = _props.zIndex;


        var toastClass = (0, _classnames2.default)(toast_prefix);

        var style = {};

        var children = _react2.default.createElement(
            'div',
            { ref: toast_prefix, className: toastClass, style: { zIndex: zIndex } },
            _react2.default.createElement(
                'span',
                null,
                message
            )
        );

        if (markable) {
            return _react2.default.createElement(
                _maskM2.default,
                { style: { zIndex: zIndex - 1 } },
                children
            );
        }

        return children;
    };

    return Toast;
}(_react2.default.Component);

Toast.PropTypes = {
    zIndex:   _PropTypes2.default.number,
    duration: _PropTypes2.default.number,
    markable: _PropTypes2.default.bool,
    message:  _PropTypes2.default.string
};

Toast.defaultProps = {
    zIndex: 20,
    duration: 1500,
    markable: false,
    message: 'message'
};

exports.default = Toast;
module.exports = exports['default'];
