import '../node_modules/jquery/src/jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useHistory, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Home from './components/Home';
import CreateMeme from './components/CreateMeme';
function App() {

  return (
    <div>

      <Router>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Create Meme Onlines</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/" className="m-2">Home</Nav.Link>
              <Nav.Link href="/creatememe" className='m-2'>Cretae</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/creatememe'><CreateMeme /></Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
