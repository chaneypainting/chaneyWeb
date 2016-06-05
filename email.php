<?php

    require_once('class.smtp.php');
    require_once('class.phpmailer.php');

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = $_POST["firstName"] . " " . $_POST["lastName"];
        $name = strip_tags(trim($name));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $location = strip_tags(trim($_POST["location"]));
        $service = strip_tags(trim($_POST["service"]));
        $date = date('m/d/Y h:i:s a', time());
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        $mail = new PHPMailer();

        $mail->IsSMTP();
        $mail->SMTPDebug = 2;
        $mail->SMTPAuth = true;
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 587;
        $mail->Username = getenv("SMTP_USER");
        $mail->Password = getenv("SMTP_PASS");

        $mail->SetFrom($email, 'ChaneyPainting.com');
        $mail->Subject = "Website Contact From $name";
        // $mail->AddAddress('piercechaneypainting@gmail.com', 'Pierce Chaney');
        $mail->AddAddress(getenv("SMTP_USER"));

        $message_body = <<<EOD
            Name: $name
            Email: $email
            Time: $date
            Service: $service
            Location: $location

            Message:
            $message
        EOD;

        $mail->Body = $message_body;

        // Send the email.
        if ($mail->Send()) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            // echo "Oops! Something went wrong and we couldn't send your message.";
            // DEV
            echo "mail->send failed" . $mail->ErrorInfo;
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
