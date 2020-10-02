import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Row, Col, Label, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select 
                                    model=".rating"
                                    id="rating"
                                    name="rating"
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                    ></Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control">
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            </React.Fragment>
        );
    }
}

// function renderDish({dish}) {
const RenderDish = ({dish}) => {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

const RenderComments = ({comments}) => {
    const options = {  month: 'short', day: 'numeric', year: 'numeric' };
    const value = comments.map((comment) => {
        return (
            <ListGroup>
                <ListGroupItem className="border-0"> {comment.comment}</ListGroupItem>
                <ListGroupItem className="border-0"> 
                    {"-- "} 
                    {comment.author}
                    {" , "} 
                    {new Date(comment.date).toLocaleDateString('en-US', options)}
                </ListGroupItem>
            </ListGroup>
        );
    });

    return (
        <div className="col-12 col-md-5 m-1">
            <h4> Comments </h4>
            {value}
            <CommentFrom />
        </div>
    )
}

const DishDetail = (props) => {
    if (props.dish !== undefined) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            
        );
    }
    else {
        return (
            <div></div>
        );
    }
    
}

export default DishDetail;