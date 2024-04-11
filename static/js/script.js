function signIn() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
   // Show processing indicator
  //  document.getElementById("processing-indicator").style.display = "block";
    var isDataEntered = username.trim() !== '' || password.trim() !== '';
    var processingIndicator = document.getElementById('processing-indicator');
    processingIndicator.style.display = isDataEntered ? 'block' : 'none';
 
  // Prepare data for POST request
  var data = {
    email: username,
    password: password
  };

  // Make a POST request using fetch API
  if (isDataEntered) {
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      // Check if response is successful
      document.getElementById("processing-indicator").style.display = "none";
      // console.log(response)
      if (response.status == 208) {
        // throw new Error('Network response was not ok');
        window.alert('Error: Email is not verified \n Please check your email');
        window.location.href = '/';
      }else if(response.status ==401){
        // throw new Error('Network response was not ok');
        console.log('Network response was not ok');
        window.alert('Error: ' + "Invalid username or password");
        window.location.href = '/';
        return response.json();
      }else if (response.status == 200) {
        console.log('Login Scuccessful');
        window.location.href = '/dashboard';
        window.alert('Login Scuccessful\nDisclaimer: \n'+ "We are not SEBI Registered.\nInformation transmitted as Generated");
    
        return response.json();
      }else {
        window.alert('Error: ' + "Invalid username or password");
        window.location.href = '/';
      }
      
      }
    );
  }else{
    window.alert('Please enter username and password');
  }

  }

function signUp() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mobile = document.getElementById('mobile').value;

    // document.getElementById("processing-indicator").style.display = "block";
    var isDataEntered = name.trim() !== '' || email.trim() !== '' || password.trim() !== ''|| mobile.trim() !== '';
    var processingIndicator = document.getElementById('processing-indicator');
    processingIndicator.style.display = isDataEntered ? 'block' : 'none';
  
    // Create a data object to send in the POST request
    const data = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
    };

  
  
    // Send a POST request to the server
    if (isDataEntered) {
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        // Check if response status is OK (status code 200)
        document.getElementById("processing-indicator").style.display = "none";
        if (response.status === 200) {
          window.alert('Congratulations, You have signed up successfully\n Email verification link sent to your email');
          window.location.href = '/';
          return response.json();
        } else {
          // If the response status is not OK, throw an error with the status text
          window.alert('Error: ' + "Email Already Present");
          throw new Error(response.statusText);
  
        }
      });
    }else{
      window.alert('Please enter valid data in all fields');
    }
}
    
 // Assume you have a function to make a POST request to the server to fetch user information
function fetchUserInfo() {
      fetch('/dashboard', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'exampleUser' }) // Replace 'exampleUser' with the actual username
      })
      .then(response => response.json())
      .then(data => {
        // Display the user information on the dashboard
        document.getElementById('welcome-message').innerText = `Welcome, ${data.name}`;
        document.getElementById('user-info').innerHTML = `
          <p>Name: ${data.name}</p>
          <p>Email: ${data.email}</p>
          <p>Mobile: ${data.mobile}</p>
        `;
      })
      .catch(error => console.error('Error:', error));
} 

    // Function to toggle password visibility

function sendResetEmail() {
    // document.getElementById("processing-indicator").style.display = "block";
    const email = document.getElementById('email').value;
    var isDataEntered = email.trim() !== ''; 
    var processingIndicator = document.getElementById('processing-indicator');
    processingIndicator.style.display = isDataEntered ? 'block' : 'none';
    // document.getElementById("processing-indicator").style.display = "none";
     
    console.log(email);
    // Create a data object to send in the POST request
    const data = {
     
      email: email,
     
    };

    // console.log(data)

    if (isDataEntered) {
      fetch('/forgetpwd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        // Check if response is successful
        document.getElementById("processing-indicator").style.display = "block";
        if (response.status!=200) {
          // throw new Error('Network response was not ok');
          console.log('Network response was not ok');
          window.alert('Error: ' + "Please provide a valid email");
          window.location.href = '/forgetpwd';
        }else{
          window.alert('Success: Email Sent \n Please check your email');
          window.location.href = '/';
          return response.json();
        }
        
      });
    }else{
      window.alert('Please Enter Email');
    }
    
  }

// Show error dialog
function showErrorDialog(message) {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Get the error message element
  var errorMessageElement = document.getElementById("errorMessage");

  // Display error message
  errorMessageElement.textContent = message;

  // When the user clicks the <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  // Display the modal
  modal.style.display = "block";
}

function refreshToken() {
  // Fetch the current ID token from cookies
  const currentIdToken = document.cookie.replace(/(?:(?:^|.*;\s*)id_token\s*=\s*([^;]*).*$)|^.*$/, "$1");

  if (currentIdToken) {
      // Make a POST request to the /refresh-token endpoint
      fetch('/refresh-token', {
          method: 'POST',
          credentials: 'same-origin', // Include cookies in the request
          headers: {
              'Content-Type': 'application/json'
          },
          // You can optionally pass the current ID token as a request body if needed
          // body: JSON.stringify({ id_token: currentIdToken })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to refresh token');
          }
          return response.json();
      })
      .then(data => {
          // Handle the refreshed token received from the server
          console.log('Token refreshed successfully:', data);
          // Update the existing token with the new token
          // For example, you can update a global variable storing the token
          // or update the token stored in local storage or session storage
      })
      .catch(error => {
          console.error('Failed to refresh token:', error);
          // Handle error response
      });
  } else {
      console.error('ID token not found in cookies');
      // Handle case where ID token is not found in cookies
  }
}
function logout() {
  fetch('/logout', {
    method: 'GET',
    redirect: 'follow',
    
  }).then((response) => {
    window.location.href = '/';
    window.alert('Logged out successfully');
  })
  
}

