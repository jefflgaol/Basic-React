import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

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
        </div>
    )
}

const DishDetail = (props) => {
    if (props.dish !== undefined) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <RenderComments comments={props.dish.comments}/>
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