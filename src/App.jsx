import {Routes,Route} from 'react-router-dom';
//Components
import MvNavbar from './components/Navbar';
//Pages
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListingPage from './pages/List';
import HomePage from './pages/Home';
import BookDetailPage from './pages/Detail';
import OrdersPage from './pages/ViewOrder';
import ViewOrderDetails from './pages/ViewOrderDetail';  
//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'


function App() {
  return (
    <div>
    <MvNavbar/>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/list" element={<ListingPage/>}/>
    <Route path="/book/view/:id" element={<BookDetailPage/>}/>
    <Route path="/orders" element={<OrdersPage/>}/>
    <Route path="/book/orders/:bookId" element={<ViewOrderDetails/>}/>
    </Routes>
    </div>
  )
}

export default App
