import React, { useState, useEffect } from "react";
import styles from "../../css/NotificationAlert.module.css";

const NotificationAlert = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div className={`${styles.notificationAlert} ${styles[type]}`}>
            {message}
        </div>
    );
};

export default NotificationAlert;