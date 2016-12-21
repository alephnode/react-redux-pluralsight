import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const records = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/records/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/records/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/records/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/records/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/records/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (record) => {
  return replaceAll(record.title, ' ', '-');
};

class RecordApi {
  static getAllRecords() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], records));
      }, delay);
    });
  }

  static saveCourse(record) {
    record = Object.assign({}, record); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength =  1;
        if (record.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (record.id) {
          const existingCourseIndex = records.findIndex(a => a.id == record.id);
          records.splice(existingCourseIndex, 1, record);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new records in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          record.id = generateId(record);
          record.watchHref = `http://www.pluralsight.com/records/${record.id}`;
          records.push(record);
        }

        resolve(record);
      }, delay);
    });
  }

  static deleteCourse(recordId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCourseToDelete = records.findIndex(record => {
          record.recordId == recordId;
        });
        records.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default RecordApi;
