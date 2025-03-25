<?php
header('Content-Type: application/json');

// Function to sanitize input
function clean_input($data) {
    return htmlspecialchars(trim($data));
}

// Capture and sanitize form inputs
$name = clean_input($_POST['name'] ?? '');
$email = clean_input($_POST['email'] ?? '');
$phone = clean_input($_POST['phone'] ?? '');
$website = clean_input($_POST['website'] ?? '');
$message = clean_input($_POST['message'] ?? '');

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Name, Email, and Message are required.']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit;
}

// Validate website (if provided)
if (!empty($website) && !filter_var($website, FILTER_VALIDATE_URL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid website URL.']);
    exit;
}

// Email configuration
$to = "youremail@example.com"; // Replace with your email
$subject = "New Contact Form Submission";
$headers = "From: noreply@example.com\r\n"; // Set a valid domain email
$headers .= "Reply-To: $email\r\n";

// Email body
$email_message = "
You have received a new contact form submission:

Name: $name
Email: $email
Phone: $phone
Website: $website
Message: $message
";

try {
    // Send email
    if (mail($to, $subject, $email_message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send the email. Please try again later.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'An error occurred. Please try again later.']);
}
?>
