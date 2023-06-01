
# Pin-Verification-frontend

This repository contains the frontend code for the Pin Verification application. The application allows users to enter a PIN and verify its correctness.

## Features

- Enter a PIN and verify its correctness.
- User-friendly interface.
- Real-time validation of PIN input.
- Clear and concise error messages.

## Installation

To run the Pin Verification frontend locally, follow these steps:

1. Clone the repository by running the following command in your terminal:

   ```bash
   git clone https://github.com/BishalDali/Pin-Verification-frontend.git
   ```
2. Navigate to the project directory:

   ```bash
   cd Pin-Verification-frontend
   ```
3. Install the dependencies:

   ```bash
   npm install
   ```
4. Start the development server:

   ```bash
   npm start
   ```

## Features

* Allows users to enter a PIN code for verification.
* Validates that all PIN fields are filled before verification.
* Handles paste functionality, sanitizing and populating the PIN fields accordingly.
* Provides visual feedback for client-side validation errors.
* Sends a request to the server to validate the entered PIN code.
* Displays appropriate messages for server-side validation errors.
* Notifies the user of successful verification.
* Implements loading state while waiting for server response.
* Resets the PIN fields after verification.
* Uses a spinner component to indicate loading state.
* Ensures input fields only accept numeric values.
* Restricts the length of the PIN to 6 digits.
* Responsive layout, centered on the screen.

## Technologies Used

* React: A JavaScript library for building user interfaces.
* HTML: The standard markup language for creating web pages.
* Tailwind CSS: A utility-first CSS framework for rapidly building custom user interfaces.
