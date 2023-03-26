import React from "react";
import {
  //   Button,
  ButtonGroup,
  Card,
  CardImg,
  CardText,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap";

import Details from "../pages/books/[pids]";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Album = ({ album, shouldBeDelete }) => {
  const [show, setShow] = useState(false);

  const [currentId, setCurrentId] = useState(null);
 const [currentName, setCurrentName] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(`shold be detelet ${shouldBeDelete}`);
  const { user } = useAuth();
  const router = useRouter();

  const deleteBook = async (bookId) => {
    try {
      const response = await fetch("/api/deleteBook", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: bookId, userId: user.email }),
      });

      const data = await response.json();
      console.log(data);
      router.reload();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  console.log(`my album: ${album[0]}`);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete {currentName}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button className="mr-auto" variant="danger" onClick={() => {
            deleteBook(currentId);
          }}>
            Delete!
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="album py-5 bg-light">
        <Container>
          <Row>
            {album.map((item, key) => {
              return (
                <Col md="4" key={key}>
                  <Card className="mb-4 box-shadow">
                    <CardImg
                      top
                      width="100%"
                      src={item.cover}
                      alt={key + "please"}
                    />
                    <CardBody>
                      <CardText>{item.title}</CardText>
                      <div className="d-flex justify-content-between align-items-center">
                        <Details pid={item._id} key={item._id}></Details>

                        {shouldBeDelete ? (
                          <svg
                            key={"svg" + item._id}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3-fill"
                            viewBox="0 0 16 16"
                            onClick={() => {
                              setCurrentId(item._id);
                              setCurrentName(item.title);
                              handleShow();

                            //   deleteBook(item._id);
                            }}
                          >
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                          </svg>
                        ) : (
                          <></>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Album;
