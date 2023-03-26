import React from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardImg,
    CardText,
    CardBody,
    Col,
    Container,
    Row
} from 'reactstrap';

import Details from '../pages/books/[pids]'

const Album = ({ album }) => {
    console.log(`my album: ${album[0]}`)



    return (
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
                                        src={item.page}
                                        alt={key + "please"}
                                    />
                                    <CardBody>
                                        <CardText>{item.title}</CardText>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Details pid={item._id}></Details>
                                            
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default Album;