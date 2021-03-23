import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registratrion-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
  Jumbotron,
} from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movie: null,
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios
      .get('https://javisolismyflix.herokuapp.com/')
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  /* */
  onRegister(register) {
    this.setState({
      register,
    });
  }

  /* When back button click selectedMovie will set on it's initial state*/
  setInititalState() {
    this.setState({
      selectedMovie: null,
    });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    /* Register */
    if (!register)
      return (
        <RegisterView onRegister={(register) => this.onRegister(register)} />
      );

    // Before the movies have been loaded
    if (!movies) return <div className='main-view' />;

    return (
      <React.Fragment>
        <div className='main-view'>
          <header>
            <Navbar
              collapseOnSelect
              expand='lg'
              bg='dark'
              variant='dark'
              fixed='top'
            >
              <Navbar.Brand href='#home'>
                <img
                  src={logo}
                  className='d-inline-block align-top'
                  alt='React Bootstrap logo'
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav.Link href='#movies'>Movies</Nav.Link>
                  <Nav.Link href='#genre'>Genre</Nav.Link>
                  <Nav.Link href='#director'>Director</Nav.Link>
                  <Nav.Link href='#login'>Logout</Nav.Link>
                </Nav>
                <Form inline>
                  <InputGroup>
                    <FormControl
                      placeholder='Enter keyword here'
                      aria-label='Enter keyword here'
                      aria-describedby='basic-addon2'
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id='basic-addon2'>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <div className='main-body text-center'>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onClick={() => this.setInititalState()}
              />
            ) : (
              <Container className='p-5'>
                <Row>
                  {movies.map((movie) => (
                    <Col xs={12} md={3} key={movie._id} className='p-2'>
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        onClick={(movie) => this.onMovieClick(movie)}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </div>
          <div className='test'></div>
          <Jumbotron fluid className='fixed-bottom text-center'>
            <h1>MyFlix Movie</h1>
            <p>Collection of all time favorite movies.</p>
          </Jumbotron>
          <footer className='fixed-bottom bg-dark text-white text-center'>
            <p className='pt-3'>
              Coyright &#169; 2020 myFlix. All rights reserved
            </p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}
