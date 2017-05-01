<?php

/* =====================================================
 * change this to the email you want the form to send to
 * ===================================================== */

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "hyunjonathan@gmail.com";

        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content = "Contact form\n";
        $email_content .= "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

// $email_to = "you@company.pw"; 
// $email_from = "webmaster@company.pw"; // must be different than $email_from 
// $email_subject = "Contact Form submitted";

// if(isset($_POST['email']))
// {

//     function return_error($error)
//     {
//         echo json_encode(array('success'=>0, 'message'=>$error));
//         die();
//     }

//     // check for empty required fields
//     if (!isset($_POST['name']) ||
//         !isset($_POST['email']) ||
//         !isset($_POST['message']))
//     {
//         return_error('Please fill in all required fields.');
//     }

//     // form field values
//     $name = $_POST['name']; // required
//     $email = $_POST['email']; // required
//     $message = $_POST['message']; // required

//     // form validation
//     $error_message = "";

//     // name
//     $name_exp = "/^[a-z0-9 .\-]+$/i";
//     if (!preg_match($name_exp,$name))
//     {
//         $this_error = 'Please enter a valid name.';
//         $error_message .= ($error_message == "") ? $this_error : "<br/>".$this_error;
//     }        

//     $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
//     if (!preg_match($email_exp,$email))
//     {
//         $this_error = 'Please enter a valid email address.';
//         $error_message .= ($error_message == "") ? $this_error : "<br/>".$this_error;
//     } 

//     // if there are validation errors
//     if(strlen($error_message) > 0)
//     {
//         return_error($error_message);
//     }

//     // prepare email message
//     $email_message = "Form details below.\n\n";

//     function clean_string($string)
//     {
//         $bad = array("content-type", "bcc:", "to:", "cc:", "href");
//         return str_replace($bad, "", $string);
//     }

//     $email_message .= "Name: ".clean_string($name)."\n";
//     $email_message .= "Email: ".clean_string($email)."\n";
//     $email_message .= "Message: ".clean_string($message)."\n";

//     // create email headers
//     $headers = 'From: '.$email_from."\r\n".
//     'Reply-To: '.$email."\r\n" .
//     'X-Mailer: PHP/' . phpversion();
//     if (@mail($email_to, $email_subject, $email_message, $headers))
//     {
//         echo json_encode(array('success'=>1, 'message'=>'Form submitted successfully.')); 
//     }

//     else 
//     {
//         echo json_encode(array('success'=>0, 'message'=>'An error occured. Please try again later.')); 
//         die();        
//     }
// }
// else
// {
//     echo 'Please fill in all required fields.';
//     die();
// }
?>