import PropTypes from "prop-types";

const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }

  if (success) {
    return <div className="notification-success">{message}</div>;
  } else {
    return <div className="notification-error">{message}</div>;
  }
};

Notification.propTypes = {
  message: PropTypes.string,
  success: PropTypes.bool,
};

export default Notification;
