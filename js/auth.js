// sign_up.js
const scriptURL = "https://script.google.com/macros/s/AKfycbwHYbuWJl9pKeTbLmVd0nsrmTkUP85GZAZZBcYfD4VsU5ZDWLOP6u85FfxRs3NR2VL8/exec";

document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.getElementById('signUpForm');

    signUpForm.addEventListener('submit', async function(event) {

        event.preventDefault();

        let loader = document.querySelector("#loader");

        const name = signUpForm.name.value.trim();
        const email = signUpForm.email.value.trim();
        const password = signUpForm.password.value.trim();
        const confirmPassword = signUpForm.confirm_password.value.trim();
        const phone = signUpForm.phone.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;  // Adjust the regex for your phone format
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!name) {
            alert('Please enter your name.');
            event.preventDefault();
            return;
        } else if (!email) {
            alert('Please enter your email.');
            event.preventDefault();
            return;
        } else if (!emailPattern.test(email)) {
            alert('Please enter a valid email.');
            event.preventDefault();
            return;
        } else if (!phone) {
            alert('Please enter your phone number.');
            event.preventDefault();
            return;
        }else if (!phonePattern.test(phone)) {
            alert('Please enter a valid phone number.');
            event.preventDefault();
            return;
        } 
        else if (!password) {
            alert('Please enter your password.');
            event.preventDefault();
            return;
        } else if (!confirmPassword) {
            alert('Please confirm your password.');
            event.preventDefault();
            return;
        } else if (password !== confirmPassword) {
            alert('Passwords do not match.');
            event.preventDefault();
            return;
        }else if (!passwordPattern.test(password)) {
            alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            event.preventDefault();
            return;
        } 


        loader.style.display = 'block'; // Show load

        // ----------------------checking user already exists or not ------------------------


                try {
                    const response = await fetch(scriptURL);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    let isValidUser = false;

                    // Loop through the data to find a matching user
                    for (let i = 1; i < data.length; i++) { // Skip header row
                        if (data[i][1] === email) {
                            isValidUser = true;
                            break;
                        }
                    }

                    if (isValidUser) {
                        alert('User already exists with similar email');
                    } else {
                        let d = new FormData(signUpForm);
    
                        fetch(scriptURL, {
                            method : "POST",
                            mode : 'cors',
                            body : d
                        }).then(response => response.json())
                        .then(data => console.log(data))
                        .catch(error => console.error('Error:', error));
                        
                        localStorage.setItem("emailImageGenerator", email);
                        // redirecting to landing page
                        window.location.href = 'imageGenerator.html';

                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                    alert('An error occurred while trying to sign in. Please try again later.');
                }


        // ----------------------END ------------------------







        
        // --------------------   Saving data to local storage  *** BEGIN *****





        // let obj = {
        //     name : name,
        //     email : email,
        //     password : password,
        //     confirmPassword : confirmPassword
        // }

        // localStorage.setItem(name, JSON.stringify(obj));
 

    //     const storedUserData = localStorage.getItem(name);
    
    // if (storedUserData) {
    //     const userData = JSON.parse(storedUserData);
    //     console.log('User Data:', userData);
    //     console.log('Name:', userData.name);
        
    // } else {
    //     console.log('No user data found in local storage.');
    // }




    // ------------------------ END of saving data to local storage
    
    









     // ------------------ Saving data to googleSheet



// let d = new FormData(signUpForm);
 
//      fetch(scriptURL, {
//          method : "POST",
//          mode : 'cors',
//          body : d
//      }).then(response => response.json())
//      .then(data => console.log(data))
//      .catch(error => console.error('Error:', error));
 
    
//     });

    //-------------------   End of saving data to local storage
   
    loader.style.display = 'none'; // Hide loader



});
});


// -----------------------Animation of signup page---------



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signUpForm');
    
    // Add a delay before the form opens
    setTimeout(() => {
        form.classList.add('open');
    }, 500); // 500ms delay
});


//------------------------------- sign-in  code----------------

