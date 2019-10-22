/*****ALL PAGES ********/

//Declaring variables and creating query selectors: 
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.links');
const navList = document.querySelectorAll('.links li');
const headerSec = document.querySelector('.header-section');
const navModal = document.querySelector('.navModal');


//Function to animate navigation
const navAnimate = (e) => {

    //Toggle the nav button
    navLinks.classList.toggle('nav-active');

    // //Animate links
    navList.forEach((list, index) => {
        if (list.style.animation) {
            list.style.animation = '';
        } else {
            list.style.animation = `linksFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    //Burger Animate 
    burger.classList.toggle('burgerClicked');
    
    //dark background when burger clicked
    if (navModal) {
        navModal.style.display = "block";
    }
    //removes modal when burger closed
    if (!burger.classList.contains('burgerClicked')) {
        navModal.style.display = "none";
    }
    console.log(burger.classList);    
    console.log(screen.width);
}
//event listener for burger button
burger.addEventListener('click', navAnimate);



//Function to change background of navbar when scrolled: 
//declaring navBar variable: 
const navBar = document.querySelector('nav');

if (navBar) {
    const navScrolled = () => {

        const scrolled = scrollY;

        if (scrolled > 100) {
            navBar.classList.add('navScrolled');
        } else {
            navBar.classList.remove('navScrolled');
        }

    }
    //Event listening to scroll
    document.addEventListener('scroll', navScrolled);
}

/*****GALLERY PAGE ********/

/****  GALLERY MODAL ****/

//declaring variables
const galleryImages = document.querySelectorAll('.small-image');

if (galleryImages) {

    //Left to right buttons:
    const leftBtn = document.querySelector('.leftBtn');
    const rightBtn = document.querySelector('.rightBtn');

    //MODAL
    let modal = document.querySelector('.modal');

    if (modal) {
        let bigImage = document.querySelector('.modal-content > img');

        //adding event listeners and functions: 
        galleryImages.forEach((image) => {
            image.addEventListener('click', openModal);
        });

        //Close button: 
        let closeBtn = document.querySelector('.closeBtn');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        //Closes when clicked outside:
        window.addEventListener('click', clickedOutside);

        //Open modal:
        function openModal(e) {

            modal.style.display = "block";
            bigImage.src = this.src;
            bigImage.classList.add("openedImg");

            //hiding left button if it's the first gallery image
            if (this.src === galleryImages.item(0).src) {
                leftBtn.style.visibility = "hidden";
            } else {
                leftBtn.style.visibility = "visible";
            }
            //hiding right button if it's the last gallery image
            if (this.src === galleryImages.item(galleryMax - 1).src) {
                rightBtn.style.visibility = "hidden";
            } else {
                rightBtn.style.visibility = "visible";
            }

        }

        //BUTTONS:
        if (leftBtn) {
            leftBtn.addEventListener('click', slideLeft);
        }

        
        //going to previous image if left button clicked:
        function slideLeft(e) {
            leftBtn.style.visibility = "visible";
            rightBtn.style.visibility = "visible";

            for (let i = 0; i < galleryImages.length; i++) {

                if (bigImage.src === galleryImages.item(i).src && bigImage.src !== galleryImages.item(0).src) {
                    bigImage.src = galleryImages.item(--i).src;
                    console.log(bigImage);
                } else if (bigImage.src === galleryImages.item(0).src) {
                    leftBtn.style.visibility = "hidden";
                    break;
                }
            }

            // if (bigImage.style.animation) {
            //     bigImage.style.animation = "";
            // } else {
            //     bigImage.style.animation = `fadeIn 0.5s ease`;
            // }
        }

        if (rightBtn) {
            rightBtn.addEventListener('click', slideRight);
        }

        const galleryMax = galleryImages.length;

        //going to next image if right button clicked:
        function slideRight(e) {
            leftBtn.style.visibility = "visible";
            rightBtn.style.visibility = "visible";

            for (let i = 0; i < galleryMax; i++) {
                if (bigImage.src === galleryImages.item(i).src) {
                    bigImage.src = galleryImages.item(++i).src;
                    console.log(bigImage.src);
                }
                if (bigImage.src === galleryImages.item(galleryMax - 1).src) {
                    rightBtn.style.visibility = "hidden";
                    break;
                }
            }
        }
    }

    //Close modal: 
    function closeModal() {
        modal.style.display = "none";
    }

    //Closes when clicked outside function:
    function clickedOutside(e) {
        if (e.target === modal || e.target === document.querySelector('.modal-content')) {
            modal.style.display = "none";
        }
    }
}



/********CONTACT PAGE - FORM VALIDATION ********/
const contactForm = document.querySelector('.contactForm');
if (contactForm) {

    let errorMessage = document.querySelectorAll('.error-message');
    let contactName = document.querySelector('.contactName');
    let contactEmail = document.querySelector('.contactEmail');
    let contactPhone = document.querySelector('.contactPhone');
    let contactMessage = document.querySelector('.contactMessage');
    let submitBtn = document.querySelector('.submit-btn');
    let nameError = document.querySelector('.name-error');
    let emailError = document.querySelector('.email-error');
    let phoneError = document.querySelector('.phone-error');
    //Regular Expression for phone number (ignoring white space) and email:
    let phoneRegex = /^[1-9]\d{2}\s*\d{3}\s*\d{4}$/;
    let emailRegex = /([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    //Adding Click event listener to submit button:
    if (submitBtn) {
        submitBtn.addEventListener('click', validate);
    }
    //validation function
    function validate() {

        // if (contactName.value === "" || contactEmail.value === "" ||
        //     contactPhone.value === "") {

        //     errorMessage.forEach((message) => {
        //         message.style.display = "block";
        //         message.innerHTML = `Field cannot be empty. Try again.`;
        //         message.style.color= "red";
        //     });
        
        //NAME VALIDATION:
        if (contactName.value === "" || contactName.value == null) {
            nameError.style.display = "block";
            nameError.innerHTML = `Field cannot be empty. Please try again.`;
            contactName.style.border = "2px solid #FF0000";
        } else if (contactName.value.length < 1 && isNaN(contactName.value)) {
            nameError.style.display = "block";
            nameError.innerHTML = `Enter a valid name. Please try again.`;
            contactName.value = "";
            contactName.style.border = "2px solid #FF0000";
        } else if (!isNaN((contactName.value))) {
            nameError.style.display = "block";
            nameError.innerHTML = `No numbers. Please try again.`;
            contactName.value = "";
            contactName.style.border = "2px solid #FF0000";
        } else {
            nameError.style.display = "none";
            contactName.style.border = "2px solid #32CD32";
        }

        //EMAIL VALIDATION:
        if (contactEmail.value === "" || contactEmail.value == null) {
            emailError.style.display = "block";
            emailError.innerHTML = `Field cannot be empty. Please try again.`;
            contactEmail.style.border = "2px solid #FF0000";
        } else if (!emailRegex.test(contactEmail.value)) {
            emailError.style.display = "block";
            emailError.innerHTML = `Enter a valid email address. Please try again.`;
            // contactEmail.value = "";
            contactEmail.style.border = "2px solid #FF0000";
        } else {
            contactEmail.style.border = "2px solid #32CD32";
            emailError.style.display = "none";

        }

        //PHONE VALIDATION
        if (contactPhone.value === "" || contactPhone.value == null) {
            phoneError.style.display = "block";
            phoneError.innerHTML = `Field cannot be empty. Please try again.`;
            contactPhone.style.border = "2px solid #FF0000";
            // isNaN(contactPhone.value) || contactPhone.value.length < 10
        } else if (!phoneRegex.test(contactPhone.value)) {
            phoneError.style.display = "block";
            phoneError.innerHTML = `Enter a valid phone number. Please try again.`;
            contactPhone.style.border = "2px solid #FF0000";
        } else {
            contactPhone.style.border = "2px solid #32CD32";
            phoneError.style.display = "none";
        }

        //FINAL VALIDATION: 

        if (nameError.style.display === "none" && emailError.style.display === "none" &&
            phoneError.style.display === "none" && document.querySelector('.data-netlify') !== null) {
            contactForm.submit();
            
        }

    }
    console.log(document.querySelector('.data-netlify'));

}
