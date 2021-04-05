import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>
              <span className="label text-primary">Description: </span>
              <span className="value">{movie.Description}</span>
            </Card.Text>
            <Card.Text>
              <span className="label" > <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre:</Button>
          </Link></span>
              <span className="value">{movie.Genre.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label"><Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director:</Button>
          </Link> </span>
              <span className="value">{movie.Director.Name}</span>
            </Card.Text>
            <Link to={"/"}>
              {" "}
              <Button variant="dark">Back</Button>{" "}
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    // movie prop may contain Title, and IF it does, it must be a string
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Year: PropTypes.number,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Biography: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
    }),
    Featured: PropTypes.bool,
  }),
};
