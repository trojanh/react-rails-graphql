import React from "react";
import { Query } from "react-apollo";
import query from "../queries/getAuthors";
import AuthorCard from "./AuthorCard";

import { Loader, Segment, Dimmer, Card, Container, Header } from "semantic-ui-react";
import AuthorForm from "./AuthorForm";

const Authors = () => {
  return (
    <Query query={query} errorPolicy="all">
      {info => {
        const { loading, error, data } = info;
        if (loading)
          return (
            <Segment>
              <Dimmer active>
                <Loader />
              </Dimmer>
            </Segment>
          );
        if (error) return <p>Error</p>;
        return (
          <Container>
            <Header>Create Author</Header>
            <AuthorForm />
            <br />
            <Card.Group centered>
              {data.authors &&
                data.authors.map(author => <AuthorCard key={author.id} author={author} />)}
            </Card.Group>
          </Container>
        );
      }}
    </Query>
  );
};
export default Authors;
