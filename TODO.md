# TODO: Fix ViewBookDetails Page

## Tasks
- [x] Add GET route `/get-book-by-id/:id` in `Backend/routes/book.js` to fetch a single book by ID.
- [x] Update `frontend/src/Components/viewbook/ViewBookDetails.jsx` to make Add to Favorites and Add to Cart buttons functional.
  - [x] Add onClick handlers for buttons.
  - [x] Retrieve user ID from localStorage.
  - [x] Implement API calls for favorites and cart with proper headers.
  - [x] Handle success/error responses.
- [x] Fix hydration error by removing nested Links in Bookcard and Allbook components.
- [x] Restart backend server after changes.
- [x] Test the ViewBookDetails page by clicking a book card (ensure user is logged in).
