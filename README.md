## Summary
1. Microfrontend Architecture
Modularized frontend components for independent development and deployment.

2. State Management
Redux is used for centralized state management.

3. Error Handling & Interceptors
Global Error Handlers implemented to catch and log runtime errors.

HTTP Interceptors for request/response manipulation (e.g., adding headers, error handling).

4. Code Reusability with Mixins
Mixins utilized to inject common methods and logic into multiple components.

Limitations & Known Issues
1. Authentication & Security
This is an anonymous application, so login pages and authentication mechanisms (e.g., JWT) are not implemented.

2. Missing Pagination
Due to time constraints, pagination for large datasets has not been implemented.

3. Edge Case Handling
Some negative test cases (e.g., API failures, invalid inputs) remain unverified.

Future Enhancements
Implement lazy-loaded pagination for better performance.

Add authentication flows if the application evolves into a user-based system.

Improve test coverage with additional error-boundary and negative test cases.

## Cloning the Repository

To clone this repository, run the following command in your terminal:

```bash
git clone https://github.com/SatheeshShanmugam/ng-job-application-tracker-ui.git
```

This will create a local copy of the repository on your machine. Navigate into the project directory to start working:

```bash
cd ng-job-application-tracker
```

# NgJobApplicationTracker

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.



## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.




