import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

class DishDetail extends Component {
    renderDish(dish) {
        if (dish !== null) {
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
        else {
            return (
                <div></div>
            );
        }
    }

    renderComments(dish) {
        if (dish !== null) {
            const options = {  month: 'short', day: 'numeric', year: 'numeric' };
            const comments = dish.comments.map((dish) => {
                return (
                    <ListGroup>
                        <ListGroupItem className="border-0"> {dish.comment}</ListGroupItem>
                        <ListGroupItem className="border-0"> 
                            {"-- "} 
                            {dish.author}
                            {" , "} 
                            {new Date(dish.date).toLocaleDateString('en-US', options)}
                        </ListGroupItem>
                    </ListGroup>
                    
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4> Comments </h4>
                    {comments}
                </div>
            )
        }
        else {
            return (
                <div></div>
            );
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selected)}
                </div>
                {this.renderComments(this.props.selected)}
            </div>
        );
    }
}

export default DishDetail;