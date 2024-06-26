# Courses-webapp
(React developer hiring assignment)

This is a webapp that shows the courses to the user and users have access to three pages - Dashboard, CoursesList and Course-details page. 

Here is the deployed project: https://courses-website-jade.vercel.app/

Demo video: Click [here](https://www.loom.com/share/a73cbf8080524896a71439a7d4f3b64b?sid=d1b0049d-de37-4be7-83d8-b0b3f32386d4)

### Flow of application
- After getting signed up, users will be directed to their Dashboard. On the Dashboard, they can see all the courses to which they have enrolled and with that they can also mark the course as completed and it will also update the backend and then render the UI to show that course as completed to them. 
- Through navbar they can navigate to CourseList page which will show the list of all the courses that are present. If user wishes to enroll to any course they can press the enroll button that would add that particular user as the enrolledUsers and would update the backend as well. After this the user will see that course on their dashboard as well. 
- By clicking on the details button on the course they would be directed to the details page of that respective course and there they can see all the details of the course like instructor name, syllabus pre-requisite etc.


### Tech-stack and features
This project is built using React.js for frontend, tailwind CSS for styling and Firebase to add backend.
#### Features include
1. Search functionality for the courses.
2. Updating the backend based on the user interaction and showing it on frontend.
3. 🎁Bonus task : Like Courses in realtime (it was my first time implementing firebase realtime database into a web app, initially was tough but I learned a lot and final result is nice experience for users as they can see the no. of likes on any courses getting increased in real time often lead to better decision making.)
4. User authentication 
5. Responsive on desktop and mobile screen

### Setting up the project
For setting this project to your local machine, just fork this repository and use ```git clone <URL>``` command to clone this project and then open it in VS Code. Then, be in the root directory and run ```npm install``` command to install all the dependencies. Once all the dependencies are installed finally run ```npm run dev``` command to start the project and then the project will be available on the localhost. 
