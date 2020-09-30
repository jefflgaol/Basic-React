import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                    <RenderComments comments={props.comments}/>
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