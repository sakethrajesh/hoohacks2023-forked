import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import Album from "./Album";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

function Tabs({ album }) {
  const [myBooks, setMyBooks] = useState([]);

  const [otherBooks, setOtherBooks] = useState([]);
  const { user, isLoading } = useAuth();

  console.log(user);

  useEffect(() => {
    if (user) {
      axios
        .post("/api/getUserBooks", { email: user.email })
        .then((response) => {
          setMyBooks(response.data.books);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    axios
      .get("/api/getBooks")
      .then((response) => {
        setOtherBooks(response.data.books);
        console.log(response.data.books);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Col>
        <Row>
          <Nav
            justify
            variant="pills"
            className={
              "album pt-3 bg-light " + (user ? "justify-content-center" : "")
            }
          >
            {user ? (
              <Nav.Item style={{ marginLeft: 300, marginRight: 25 }}>
                <Nav.Link eventKey="first">My Books</Nav.Link>
              </Nav.Item>
            ) : (
              <></>
            )}

            {user ? (
              <Nav.Item style={{ marginLeft: 25, marginRight: 300 }}>
                <Nav.Link eventKey="second">Explore Books</Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Nav.Link eventKey="first">Explore Books</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Row>
        <Row sm={9}>
          <Tab.Content>
            {user && myBooks.length >= 0 ? (
              <Tab.Pane eventKey="first">
                {myBooks.length == 0 ? (
                  <div className="container text-center">
                    <Alert variant="warning">
                      Create books to view ur books
                    </Alert>
                  </div>
                ) : (
                  <Album album={myBooks} />
                )}
              </Tab.Pane>
            ) : (
              <></>
            )}

            {user ? (
              <Tab.Pane eventKey="second">
                <Album album={otherBooks} />
              </Tab.Pane>
            ) : (
              <Tab.Pane eventKey="first">
                <Album album={otherBooks} />
              </Tab.Pane>
            )}
          </Tab.Content>
        </Row>
      </Col>
    </Tab.Container>
  );
}

export default Tabs;
