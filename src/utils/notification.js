import { notification } from 'antd';

const openNotificationWithIcon = (type, title, des, placement, duration) => {
  notification[type]({
    message: title.length > 0 ? title : 'Thông báo',
    description: des,
    placement: placement,
    duration: duration
  });
};

export default openNotificationWithIcon;
