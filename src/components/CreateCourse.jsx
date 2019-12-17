import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

export default function CreateCourse({ coursesPropsObj }) {

  const { signedInUser, signin } = coursesPropsObj;
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseEstimatedTime, setCourseEstimatedTime] = useState('');
  const [courseMaterialsNeeded, setCourseMaterialsNeeded] = useState('');

  const courseUrl = 'http://localhost:5000/api/courses'

  console.log(signedInUser);

  const submitForm = () => {

    const headerConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        title: courseTitle,
        description: courseDescription,
        estimatedTime: courseEstimatedTime,
        materialsNeeded: courseMaterialsNeeded,
        userId: signedInUser.id,
      },
      auth: {
        username: signin && signin.username || signedInUser.emailAddress,
        password: signin && signin.password || signedInUser.password
      }
    }

    try {
      return Axios.post(courseUrl, {}, headerConfig);
    }
    catch (error) {
      return console.log(error.response);
    }

  }
 
  // Commented section will be to display error messages.
  return (
    <div className="bounds course--detail">
      <div>
        {/* <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              <li>Please provide a value for "Title"</li>
              <li>Please provide a value for "Description"</li>
            </ul>
          </div>
        </div> */}
        <form onSubmit={e => {
          e.preventDefault();
          submitForm();
          console.log('submitted');
          }}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  placeholder="Course title..."
                  onChange={e => setCourseTitle(e.target.value)}
                />
                <p>{`By ${signedInUser.firstName} ${signedInUser.lastName}`}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    onChange={e => setCourseDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      className="course--time--input"
                      placeholder="Hours"
                      onChange={e => setCourseEstimatedTime(e.target.value)}
                    />
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      className=""
                      placeholder="List materials..."
                      onChange={e => setCourseMaterialsNeeded(e.target.value)}
                    ></textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              Create Course
            </button>
            <Link
              className="button button-secondary"
              to="/"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
