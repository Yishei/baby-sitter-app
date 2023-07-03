import {
  MailOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const email = 'yisheijacobowitz@gmail.com';

export const items = [
    {
        label: (
          <a href={`mailto:${email}`} rel="email">Contect Us</a>
        ),
        key: 'mail',
        icon: <MailOutlined />
      },
    {
      label: (
        <a href="/about" target="_blank" rel="noopener noreferrer">
          About Us
        </a>
      ),
      key: 'about-us',
      icon: <QuestionCircleOutlined />
    
    },
    ];