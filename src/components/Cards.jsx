import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const BookCard = (props) => {
  const navigate = useNavigate();

  return (
    <Card className="book-card">
      <div className="text-center fs-1 mt-3">📘</div>

      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title {props.name} and this book is sold by{" "}
          {props.userName} and is being sold for {props.price}.
        </Card.Text>
        <Button onClick={() => navigate(props.link)}>
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
