import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AuthorList(props) {

  return (
      <table className="table">
        <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {props.authors.map(author => {
          return (
              <tr key={author.id}>
                <td>
                  <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        props.deleteAuthor(author.id);
                      }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={"/author/" + author.id}>{author.name}</Link>
                </td>
              </tr>
          );
        })}
        </tbody>
      </table>
  );
}

AuthorList.propTypes = {
  deleteAuthor: PropTypes.func.isRequired,
  authors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
  ).isRequired
};

export default AuthorList;
