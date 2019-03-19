import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";

import deleteAuthorAPI from "../mutations/deleteAuthor";
import query from "../queries/getAuthors";

const AuthorCard = props => {
  const removeAuthor = deleteAuthorAPI => {
    deleteAuthorAPI({ variables: { id: props.author.id }, refetchQueries: [{ query }] });
  };
  const { name, id } = props.author;
  return (
    <Card>
      <Card.Content>
        <Card.Header as={Link} to={`/authors/${id}`}>
          {name}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Mutation mutation={deleteAuthorAPI}>
          {(deleteAuthorAPI, { data }) => (
            <Button color="red" onClick={() => removeAuthor(deleteAuthorAPI)}>
              Delete
            </Button>
          )}
        </Mutation>
      </Card.Content>
    </Card>
  );
};

export default AuthorCard;
