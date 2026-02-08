import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useFirebase } from '../context/Firebase';

const ListingPage = () => {
  const firebase = useFirebase();

  const [name, setName] = useState('');
  const [isbnNumber, setIsbnNumber] = useState('');
  const [price, setPrice] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await firebase.handleCreateNewListing(name, isbnNumber, price);

    // show success message
    setSuccess(true);

    // clear form
    setName('');
    setIsbnNumber('');
    setPrice('');

    // auto hide message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="form-wrapper">
      <h3 className="text-center mb-4">Add New Book</h3>

      {success && (
        <Alert variant="success">
          ✅ Book added successfully!
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter book name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ISBN Number</Form.Label>
          <Form.Control
            type="text"
            value={isbnNumber}
            onChange={e => setIsbnNumber(e.target.value)}
            placeholder="Enter ISBN number"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </Form.Group>

        <Button type="submit">
          Add Book
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;
  