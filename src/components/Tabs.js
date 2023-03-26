import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import Album from './Album';

function Tabs({album}) {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Col>
        <Row >
          <Nav justify variant="pills" className="album pt-3 bg-light">
            <Nav.Item style={{marginLeft:300, marginRight:25}}>
              <Nav.Link eventKey="first">My Books</Nav.Link>
            </Nav.Item>
            <Nav.Item style={{marginLeft:25, marginRight:300}}>
              <Nav.Link eventKey="second">Explore Books</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <Album album={album} />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
            <Album album={album} />
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Col>
    </Tab.Container>
  );
}

export default Tabs;