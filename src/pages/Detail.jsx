import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.getBookById(params.id).then((value) => {
      setData(value.data());
      setLoading(false);
    });
  }, [firebase, params.id]);

  const placeOrder = async () => {
    await firebase.placeOrder(params.id, qty);

    // show success message
    setSuccess(true);

    // remove book data from view
    setData(null);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="book-detail">
      {success && (
        <Alert variant="success">
          ✅ Order placed successfully!
        </Alert>
      )}

      {!success && data && (
        <>
          <h1>{data.name}</h1>

          <h3>Details</h3>
          <p>Price: Rs.{data.price}</p>
          <p>ISBN: {data.isbn}</p>

          <h3>Owner Details</h3>
          <p>Name: {data.userName}</p>
          <p>Email: {data.userEmail}</p>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={qty}
              min="1"
              onChange={e => setQty(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" onClick={placeOrder}>
            Buy Now
          </Button>
        </>
      )}
    </div>
  );
};

export default BookDetailPage;
