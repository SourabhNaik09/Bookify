import React,{useEffect,useState} from 'react';
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/Cards';
import CardGroup from 'react-bootstrap/CardGroup'

const HomePage = () => {
    const {listAllBooks} = useFirebase();
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        listAllBooks().then(snapshot => {
            setBooks(snapshot.docs);
            setLoading(false);
        });
    },[]);
    if(loading) return <h1>Loading...</h1>
    return (
  <div className="container mt-5">
    <div className="book-grid">
      {books.map(book => (
        <BookCard
          link={`/book/view/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  </div>
);

};
export default HomePage
