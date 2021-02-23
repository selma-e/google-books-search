import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [googleBooks, setGoogleBooks] = useState({});
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    // loadBooks();
  }, []);

  // Loads all books and sets them to books
  // function loadBooks() {
  //   API.getBooks()
  //     .then((res) => setBooks(res.data))
  //     .catch((err) => console.log(err));
  // }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    API.googleBook(formObject.title)
      .then((res) => {
        console.log(res.data.items);
        setGoogleBooks(res.data.items);
      })
      .catch((err) => console.log(err));
  }

  function viewGoogleBook() {
    console.log("You're in the view button");
  }

  function saveBook(id, title, authors, description, image, infoLink) {
    API.saveBook({
      key: id,
      title: title,
      authors: authors,
      description: description,
      image: image,
      link: infoLink,
    })
      .then((res) => console.log("Book Saved!"))
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>(React) Google Books Search</h1>
            <h1>Search for and Save Books of Interest</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Enter Book Title"
            />
            <FormBtn disabled={!formObject.title} onClick={handleFormSubmit}>
              Submit
            </FormBtn>
          </form>
        </Col>
      </Row>
      <Row>
        <Col size="md-12 sm-12">
          {googleBooks.length ? (
            <List>
              {googleBooks.map((book) => {
                let id = "";
                id = book.id;
                let title = "";
                if (book.volumeInfo.title === undefined) {
                  title = "No Title";
                } else {
                  title = book.volumeInfo.title;
                }
                let authors = [];
                if (book.volumeInfo.authors === undefined) {
                  authors = ["No Author"];
                } else {
                  authors = book.volumeInfo.authors;
                }
                let description = "";
                if (book.volumeInfo.description) {
                  description = book.volumeInfo.description;
                } else {
                  description = "No description";
                }
                let image = "";
                if (book.volumeInfo.imageLinks === undefined) {
                  image = "https://placehold.it/128x128";
                } else {
                  image = book.volumeInfo.imageLinks.thumbnail;
                }
                let infoLink = "";
                if (book.volumeInfo.infoLink) {
                  infoLink = book.volumeInfo.infoLink;
                } else {
                  infoLink = "";
                }
                return (
                  <ListItem key={id}>
                    <Button className="float-right" href={infoLink}>
                      View
                    </Button>
                    <Button
                      className="float-right mr-2"
                      onClick={() =>
                        saveBook(
                          id,
                          title,
                          authors,
                          description,
                          image,
                          infoLink
                        )
                      }
                    >
                      Save
                    </Button>
                    <strong>
                      {title}
                      <br></br>
                      Written by {authors}
                    </strong>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col size="md-2 sm-12">
                        <img src={image} />
                      </Col>
                      <Col size="md-10 sm-12">
                        <p>{description}</p>
                      </Col>
                    </Row>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
