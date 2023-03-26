import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';


// Use the fetchBook function when you want to fetch a book by its _id


function MyVerticallyCenteredModal({ show, onHide, bookId }) {
    const [book, setBook] = useState(null);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    useEffect(() => {
        axios.post('/api/getBook', { bookId })
            .then(response => {
                setBook(response.data.book);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {book ? book.title : "loading"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='container'>

                    <Carousel activeIndex={index} onSelect={handleSelect} fade>
                        {book && book.pages.length > 0 && (
                            book.pages.map((item, index) => (
                                <Carousel.Item>
                                    <img className="img-fluid" src={item} alt={index} key={index + item} />

                                </Carousel.Item>

                            ))
                        )}


                    </Carousel>




                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='container text-center'>
                    <p className='mr-auto'>{book ? book.associatedSentences[index] : "loading"}</p>

                </div>

            </Modal.Footer>
        </Modal>
    );
}

const Details = ({pid}) => {
    const [modalShow, setModalShow] = useState(false);
    

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                bookId={pid}
            />
        </>
    );
}

export default Details;