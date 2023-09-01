import React from "react";
import GlobalHeader from "./GlobalHeader";
import { Space, Typography, Button } from "antd";

const AboutPage = () => {
  return (
    <>
      <GlobalHeader />
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography.Title level={3} style={{ marginBottom: 10 }}>
          About Us
        </Typography.Title>
        <div>
          <Typography.Text>
            I'm a new developer and this is my first project. I'm a father of two,
            and I know the struggle of keeping track of babysitting hours and pay.
            Therefore, I created this app to help me and other parents to keep track
            of the hours and pay of the babysitter.
          </Typography.Text>
        </div>
        <div>
          <Typography.Text>
            This app is free to use, and I hope you will find it useful. As of now,
            the app is only available for parents and not for babysitters. We are
            working on a version for babysitters as well.
          </Typography.Text>
        </div>
        <div>
          <Typography.Text>
            With this app, you can:
          </Typography.Text>
          <ul>
            <li>
              <Typography.Text>Clock in via SMS</Typography.Text>
            </li>
            <li>
              <Typography.Text>Keep track of the hours</Typography.Text>
            </li>
            <li>
              <Typography.Text>Keep track of the pay</Typography.Text>
            </li>
            <li>
              <Typography.Text>Export the data to Excel</Typography.Text>
            </li>
          </ul>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 10 }}
            href={`mailto:yisheijacobowitz@gmailcom`}>
            Contact Us
          </Button>
        </div>
      </Space>
    </>
  );
};

export default AboutPage;
