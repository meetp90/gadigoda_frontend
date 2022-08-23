
function phoneSignIn(number) {
    console.log(number);
    const phoneNumber = '+91' + number;
    const appVerifier = window.recaptchaVerifier;
    firebase.auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => 
        {

            console.log('SMS Sent', phoneNumber, ConfirmationResult);
            window.confirmationResult = confirmationResult;

            $("#mobile_number_layout").fadeOut("def", function () {
                $("#otp_number_layout").fadeIn("slow");
            });

        }).catch((error) => {
            console.error('SMS Sending Failed', error)
        });
    
}

function verifyCode() {
    function getCodeFromUserInput() {
        return "1234";
    }

    /** @type {firebase.auth.ConfirmationResult} */
    const confirmationResult = undefined;

    // [START auth_phone_verify_code]
    const code = getCodeFromUserInput();
    confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
    }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
    });
    // [END auth_phone_verify_code]
}

function getRecaptchaResponse() {
    const recaptchaWidgetId = "...";
    const grecaptcha = {};

    // [START auth_get_recaptcha_response]
    const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
    // [END auth_get_recaptcha_response]
}
