import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import { Segment, Dimmer, Loader, Container, Header, Card, Button } from "semantic-ui-react";

import query from "../queries/getAuthor";
import AuthorUpdateForm from "./AuthorUpdateForm";
import deleteBook from "../mutations/deleteBook";

const Author = props => {
  const { id } = props.match.params;
  const [edit, toggleEdit] = useState(false);
  console.log({ id });
  return (
    <Query query={query} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <Segment>
              <Dimmer active>
                <Loader />
              </Dimmer>
            </Segment>
          );

        if (error) return <p>{error}</p>;

        const { name, age, books } = data.author;

        return (
          <Container>
            <Button onClick={props.history.goBack}>Back</Button>
            {edit ? (
              <AuthorUpdateForm toggleEdit={() => toggleEdit(!edit)} author={data.author} />
            ) : (
              <div>
                <Header as="h1">{name}</Header>
                <Header>Age: {age}</Header>
                <Button onClick={() => toggleEdit(!edit)}>Edit</Button>
              </div>
            )}
            <Card.Group centered>
              {books.map(({ id, title, genre }) => (
                <Card key={id}>
                  <Card.Content>
                    <Card.Header>{title}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Card.Description>{genre}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Mutation mutation={deleteBook}>
                      {(deleteAuthor, { data }) => (
                        <Button color="red" onClick={() => this.deleteAuthor(deleteAuthor)}>
                          Delete
                        </Button>
                      )}
                    </Mutation>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </Container>
        );
      }}
    </Query>
  );
};

export default Author;
