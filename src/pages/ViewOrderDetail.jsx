import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const ViewOrderDetails = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.getOrders(params.bookId).then(snapshot => {
      setOrders(snapshot.docs);
      setLoading(false);
    });
  }, [firebase, params.bookId]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>📦 Currently there are no orders</h3>
        <p className="text-muted">
          When someone places an order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Orders</h1>

      {orders.map(order => {
        const data = order.data();
        return (
          <div key={order.id} className="order-card">
            <h5>Order By: {data.username}</h5>
            <h6>Quantity: {data.qty}</h6>
            <p>Email: {data.userEmail}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewOrderDetails;
