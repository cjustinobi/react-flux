import React, { useState, useEffect } from 'react';
import AuthorList from './AuthorList';

import authorStore from "../stores/authorStore";
import { Link } from "react-router-dom";
import { loadAuthors, deleteAuthor } from "../actions/authorActions";

function AuthorsPage() {
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authorStore.getAuthors().length === 0) loadAuthors();
    return () => authorStore.removeChangeListener(onChange); // cleanup on unmount
  }, []);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  return (
      <>
        <h2>Authors</h2>
        <Link className="btn btn-primary" to="/author">
          Add Author
        </Link>
        <AuthorList authors={authors} deleteAuthor={deleteAuthor} />
      </>
  );
}

export default AuthorsPage
