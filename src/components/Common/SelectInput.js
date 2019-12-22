import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import authorStore from "../../stores/authorStore";
import {loadAuthors} from "../../actions/authorActions";

function SelectInput(props) {
  let wrapperClass = 'form-group';
  if (props.error.length > 0) {
    wrapperClass += ' has-error';
  }

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
      <div className={wrapperClass}>
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
              id="author"
              name="authorId"
              onChange={props.onChange}
              className="form-control"
          >
            <option>Select Author</option>
            {authors.map(author => {
              return <option value={author.id} key={author.id}>{author.name}</option>
            })}
          </select>
        </div>
        {props.error && <div className="alert alert-danger">{props.error}</div>}
      </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

SelectInput.defaultProps = {
  error: ''
};

export default SelectInput;
