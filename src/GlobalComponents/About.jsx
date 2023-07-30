import React, { useState } from "react";
import { Layout, Card, Row, Col, Button, Image, Collapse } from "antd";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Layout>
      <Layout.Content>
        <Card
          title="About Us"
          style={{ marginBottom: 16 }}
          expandable={true}
          expanded={isExpanded}
          onExpandChange={setIsExpanded}
        >
          <Row>
            <div>
              <Col span={8}>
                <Image
                  src="/babysitterapp-Logo.png"
                  alt="Company logo"
                  width="120"
                  height="150"
                />
              </Col>
            </div>

            <Col span={16}>
              <p>
                We are a team of developers who are passionate about creating
                React JS projects. We believe that React JS is the future of web
                development, and we are committed to helping businesses and
                individuals build amazing things with it.
              </p>
              <Collapse>
                <p>
                We have a wealth of experience in React JS, and we are always up
                to date on the latest trends and technologies. We are also
                experts in other areas of web development, such as HTML, CSS,
                and JavaScript.
              </p>
              <p>
                We are committed to providing our clients with the best possible
                service. We are always available to answer questions and provide
                support. We also offer a variety of services, such as
                development, design, and maintenance.
              </p>
              <p>Here are some of our recent projects:</p>
              <ul>
                <li>A React JS web application for a small business</li>
                <li>A React JS mobile app for a large enterprise</li>
                <li>A React JS web application for a government agency</li>
              </ul>
              </Collapse>
              
            </Col>
          </Row>
          <Button type="primary" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </Card>
      </Layout.Content>
    </Layout>
  );
};

export default About;
