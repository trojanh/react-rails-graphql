import React, { useState } from "react";
import { Form, Input } from "semantic-ui-react";
import { Mutation } from "react-apollo";

import updateAuthor from "../mutations/updateAuthor";

const AuthorUpdateForm = props => {
  const [author, setAuthor] = useState(props.author);
  const { name, age } = author;

  const handleChange = ({ target: { value, name } }) => setAuthor({ ...author, [name]: value });

  const handleSubmit = updateAuthor => {
    const { name, age, id } = author;

    updateAuthor({
      variables: { id, name, age: parseInt(age) },
      optimisticResponse: {
        __typename: "Mutation",
        updateAuthor: {
          __typename: "Author",
          author: {
            __typename: "Author",
            id,
            name,
            age
          }
        }
      }
    }).then(() => {
      props.toggleEdit();
    });
  };

  return (
    <Mutation mutation={updateAuthor}>
      {(updateAuthor, { data }) => (
        <Form onSubmit={() => handleSubmit(updateAuthor)}>
          <Form.Field
            label="Name"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={name}
            control={Input}
          />

          <Form.Field
            label="Age"
            placeholder="Age"
            name="age"
            onChange={handleChange}
            value={age}
            control={Input}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      )}
    </Mutation>
  );
};

export default AuthorUpdateForm;
