import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Save() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>(React) Google Books Search</h1>
            <h1>Search for and Save Books of Interest</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem key={book._id}>
                  <Button className="float-right" href={book.link}>
                    View
                  </Button>
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                  <strong>
                    {book.title}
                    <br></br>
                    Written by {book.authors}
                  </strong>
                  <br></br>
                  <br></br>
                  <Row>
                    <Col size="md-2 sm-12">
                      <img src={book.image} />
                    </Col>
                    <Col size="md-10 sm-12">
                      <p>{book.description}</p>
                    </Col>
                  </Row>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Save;
