import React, {useEffect, useState} from 'react';
import TextInput from './Common/TextInput';
import PropTypes from 'prop-types';
import { Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import authorStore from "../stores/authorStore";
import {loadAuthors} from "../actions/authorActions";
import SelectInput from "./Common/SelectInput";

function CourseForm(props) {
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authorStore.getAuthors.length === 0) loadAuthors();
    return () => authorStore.removeChangeListener(onChange); // cleanup on unmount
  }, []);
  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  return (
      props.course ?
      <form onSubmit={props.onSubmit}>
        <TextInput
            id="title"
            label="Title"
            onChange={props.onChange}
            name="title"
            value={props.course.title}
            error={props.errors.title}
        />

        <div className="form-group">
          <div className="field">
            <SelectInput
                id="author"
                name="authorId"
                onChange={props.onChange}
                value={props.course.authorId || ""}
                className="form-control"
            >
              <option>Select Author</option>
              {authors.map(author => {
                return <option value={author.id} key={author.id}>{author.name}</option>
              })}
            </SelectInput>
          </div>
          {props.errors.authorId && (
              <div className="alert alert-danger">{props.errors.authorId}</div>
          )}
        </div>

        <TextInput
            id="category"
            label="Category"
            name="category"
            onChange={props.onChange}
            value={props.course.category}
            error={props.errors.category}
        />

        <input type="submit" value="Save" className="btn btn-primary" />
      </form> :
      <div>
        <Route component={NotFoundPage} />
      </div>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default CourseForm;
