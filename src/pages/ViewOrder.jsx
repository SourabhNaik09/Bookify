import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/Cards';

const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [hasOrders, setHasOrders] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOrders = async () => {
      if (!firebase.isLoggedIn) return;

      const snapshot = await firebase.fetchMyBooks(firebase.user.uid);
      const myBooks = snapshot.docs;

      let orderFound = false;

      for (let book of myBooks) {
        const ordersSnapshot = await firebase.getOrders(book.id);
        if (ordersSnapshot.docs.length > 0) {
          orderFound = true;
          break;
        }
      }

      setBooks(myBooks);
      setHasOrders(orderFound);
      setLoading(false);
    };

    checkOrders();
  }, [firebase]);

  if (!firebase.isLoggedIn) {
    return (
      <div className="container mt-5 text-center">
        <h2>Please login to view your orders</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  if (!hasOrders) {
    return (
      <div className="container mt-5 text-center">
        <h3>📦 Currently there are no orders</h3>
        <p className="text-muted">
          Orders placed on your books will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="book-grid">
        {books.map(book => (
          <BookCard
            key={book.id}
            link={`/book/orders/${book.id}`}
            {...book.data()}
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
