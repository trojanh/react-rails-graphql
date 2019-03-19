import React, { useState } from "react";
import { Form, Input } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import addAuthor from "../mutations/addAuthors";
import query from "../queries/getAuthors";

const AuthorForm = () => {
  const [author, setAuthor] = useState({ name: "", age: "" });
  const { name, age } = author;

  const handleChange = ({ target: { value, name } }) => setAuthor({ ...author, [name]: value });

  const handleSubmit = addAuthor => {
    const { name, age } = author;
    console.log(author);

    addAuthor({
      variables: { name, age: parseInt(age) },
      refetchQueries: [{ query }]
    });
    setAuthor({ name: "", age: "" });
  };

  return (
    <Mutation mutation={addAuthor}>
      {(addAuthor, { data }) => (
        <Form onSubmit={() => handleSubmit(addAuthor)}>
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

export default AuthorForm;
