<?php
// sendmail.php — Gemini Nexatech Contact Form Handler
// Place this file in your cPanel public_html root (same folder as index.html)

// ── Configuration ─────────────────────────────────────────────────────────────
$to      = "sales@gemininexatech.com";
$subject = "New Contact Form Submission – Gemini Nexatech";
// ─────────────────────────────────────────────────────────────────────────────

// Allow only POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "error";
    exit;
}

// Sanitize inputs
function clean($value) {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

$name          = clean($_POST["name"]          ?? "");
$business_name = clean($_POST["business_name"] ?? "");
$email         = clean($_POST["email"]         ?? "");
$phone         = clean($_POST["phone"]         ?? "");
$message       = clean($_POST["message"]       ?? "");
$nda           = clean($_POST["nda"]           ?? "No");
$updates       = clean($_POST["updates"]       ?? "No");

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo "error";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "error";
    exit;
}

// Build HTML email body
$body = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
    .card { background: #ffffff; border-radius: 10px; padding: 30px; max-width: 600px; margin: auto; }
    h2 { color: #1a4fba; margin-bottom: 4px; }
    .subtitle { color: #888; font-size: 13px; margin-bottom: 24px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #aaa; margin-bottom: 4px; }
    .value { font-size: 15px; color: #222; font-weight: 600; }
    .message-box { background: #f9f9f9; border-left: 4px solid #1a4fba; padding: 12px 16px; border-radius: 6px; color: #333; line-height: 1.6; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: bold; }
    .yes { background: #d1fae5; color: #065f46; }
    .no  { background: #fee2e2; color: #991b1b; }
    .footer { margin-top: 28px; font-size: 12px; color: #aaa; text-align: center; }
  </style>
</head>
<body>
  <div class='card'>
    <h2>📩 New Enquiry — Gemini Nexatech</h2>
    <p class='subtitle'>Submitted via the Contact Us page</p>

    <div class='field'>
      <div class='label'>Full Name</div>
      <div class='value'>$name</div>
    </div>
    <div class='field'>
      <div class='label'>Company Name</div>
      <div class='value'>$business_name</div>
    </div>
    <div class='field'>
      <div class='label'>Business Email</div>
      <div class='value'><a href='mailto:$email'>$email</a></div>
    </div>
    <div class='field'>
      <div class='label'>Contact Number</div>
      <div class='value'>$phone</div>
    </div>
    <div class='field'>
      <div class='label'>Requirements</div>
      <div class='message-box'>$message</div>
    </div>
    <div class='field'>
      <div class='label'>NDA Requested</div>
      <span class='badge " . ($nda === 'Yes' ? 'yes' : 'no') . "'>$nda</span>
    </div>
    <div class='field'>
      <div class='label'>Agreed to Receive Updates</div>
      <span class='badge " . ($updates === 'Yes' ? 'yes' : 'no') . "'>$updates</span>
    </div>

    <div class='footer'>Gemini Nexatech Website · Auto-generated email · Do not reply</div>
  </div>
</body>
</html>
";

// Email headers
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Gemini Nexatech Website <sales@gemininexatech.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo "success";
} else {
    http_response_code(500);
    echo "error";
}
?>
