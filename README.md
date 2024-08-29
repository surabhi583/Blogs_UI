# [Angular 18 Example App]

> ### Angular codebase containing Article Blogs example (CRUD, auth, advanced patterns, etc)
### Making requests to the backend API

The source code for the backend server in .NET CORE 8.0 can be found in the https://github.com/surabhi583/Blogs_API

# Getting started

Make sure you have the [Angular CLI](https://github.com/angular/angular-cli#installation) installed globally.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building the project

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Functionality overview

The example application is a Technical article blogging site called "SVM Projects". It uses a custom API for all requests, including authentication. 
**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU\* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
  - Uses JWT (store the token in localStorage)
  - Authentication can be easily switched to session/cookie based
- Users page (URL: /#/users,  /#/users/:email to edit the user details)
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/profile/:username )
  - Show basic user info
  - List of articles populated from author's created articles or author's favorited articles

<br />


