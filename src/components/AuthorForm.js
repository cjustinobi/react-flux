import React from 'react';
import TextInput from './Common/TextInput';
import PropTypes from 'prop-types';
import { Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

function AuthorForm(props) {
  return (
      props.author ?
          <form onSubmit={props.onSubmit}>
            <TextInput
                id="name"
                label="Name"
                onChange={props.onChange}
                name="name"
                value={props.author.name}
                error={props.errors.name}
            />

            <input type="submit" value="Save" className="btn btn-primary" />
          </form> :
          <div>
            <Route component={NotFoundPage} />
          </div>
  );
}

AuthorForm.propTypes = {
  author: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default AuthorForm;
