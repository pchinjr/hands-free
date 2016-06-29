# hands-free
Hands Free Hearts Full

Creating a database and management system for a baby wearing lending library

Uses Hapi framework with Mongodb.

There will be an admin account for the librarian, who can track and manage the lending library inventory. Volunteers at the meeting can sign in to administer the library. Eventually the public will be able to see the contents of the library.


User registers on a web page and inputs email and password, that data is sent in a POST request to the server
the password is run through bcrypt and a hash is generated  
the bcrypt hash is stored in the mongo database associated the email

when the user returns to login, they input their email and password through a POST request to the server
the server runs bcrypt again on the password and compares the hash stored in the database to the output of the compare
if the email and password hash match, then great success
