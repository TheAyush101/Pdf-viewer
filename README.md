# Pdf-viewer
This is a PdfViewer which provides us the page count of the uploaded pdf file.

# Client
1. Login or Signup
   Signup details are stored in mongodb and fetched during login.
2. Upload pdf file
   Features displayed:
   Next page,
   Previous page,
   Page count,
   Username,
   Zoom in,
   Zoom out,
   Logout

# Server
  Files: Server.js
         Models: user.model.js
                 pdf.model.js
                 
  In Server backend is connected to the frontend.
  Mongodb database is connected to the server to store signup credentials and UserName and Page count.
  Salt hashing is also used to increase security with encrypted password (using bcrypt & jwt).
  Email is kept as unique key so that user cannot signup multiple times using same email.
  
