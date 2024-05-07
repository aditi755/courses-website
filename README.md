# Courses-webapp
(React developer hiring assignment)

This is a webapp that shows the courses to the user and users have access to three pages - Dashboard, CoursesList and Course-details page. 

Here is the deployed project: https://courses-website-jade.vercel.app/
### Flow of application
- After getting signed up, users will be directed to their Dashboard. On the Dashboard, they can see all the courses to which they have enrolled and with that they can also mark the course as completed and it will also update the backend and then render the UI to show that course as completed to them. 
- Through navbar they can navigate to CourseList page which will show the list of all the courses that are present. If user wishes to enroll to any course they can press the enroll button that would add that particular user as the enrolledUsers and would update the backend as well. After this the user will see that course on their dashboard as well. 
- By clicking on the details button on the course they would be directed to the details page of that respective course and there they can see all the details of the course like instructor name, syllabus pre-requisite etc.


### Tech-stack and features
This project is built using React.js for frontend, tailwind CSS for styling and Firebase to add backend.
#### Features include
1. Search functionality for the courses.
2. Updating the backend based on the user interaction and showing it on frontend.
3. User authentication 
4. Responsiveness on desktop and mobile screen

### Setting up the project
For seeting this project to your local machine, just fork this repository and use ```git clone <URL>``` command to clone this project and then open it in VS Code. Then, be in the root directory and run ```npm i``` command to install all the dependencies. Once all the dependencies are installed finally run ```npm run dev``` command to start the project and then the project will be available on the localhost. 
