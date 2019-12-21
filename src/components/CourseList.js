import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import authorStore from "../stores/authorStore";
import {loadAuthors} from "../actions/authorActions";

function CourseList(props) {
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authorStore.getAuthors.length === 0) loadAuthors();
    return () => authorStore.removeChangeListener(onChange); // cleanup on unmount
  }, []);
  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  function getAuthorName(authorId) {
    return authors.find(author => author.id === authorId).name
  }

  return (
      <table className="table">
        <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author ID</th>
          <th>Category</th>
        </tr>
        </thead>
        <tbody>
        {props.courses.map(course => {
          return (
              <tr key={course.id}>
                <td>
                  <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        props.deleteCourse(course.id);
                      }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td>
                <td>{getAuthorName(course.authorId)}</td>
                <td>{course.category}</td>
              </tr>
          );
        })}
        </tbody>
      </table>
  );
}

CourseList.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        authorId: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired
      })
  ).isRequired
};

export default CourseList;
