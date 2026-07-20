<?php
/**
 * Contact enquiry handler for Over Exposure Productions.
 * Receives a POST from the site's contact form and emails it to the inbox.
 * Lives in /public so Vite copies it verbatim into dist/ and it deploys to
 * the web root, where Hostinger's PHP runtime serves it at /contact.php.
 */

// ---- Where enquiries are delivered -----------------------------------------
$TO      = 'info@ox.productionsuae.com';        // your Hostinger mailbox
$SUBJECT = 'New website enquiry — ox.productionsuae.com';

// ---- Only accept POST ------------------------------------------------------
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// ---- Honeypot: bots fill the hidden "company" field — silently accept & drop
if (!empty(trim($_POST['company'] ?? ''))) {
    echo json_encode(['ok' => true]);   // pretend success; send nothing
    exit;
}

// ---- Collect & sanitise ----------------------------------------------------
$clean = fn($v) => trim(preg_replace('/[\r\n]+/', ' ', (string) $v)); // strip header-injection
$name    = $clean($_POST['name'] ?? '');
$email   = $clean($_POST['email'] ?? '');
$phone   = $clean($_POST['phone'] ?? '');
$type    = $clean($_POST['projectType'] ?? '');
$message = trim((string) ($_POST['message'] ?? ''));

// ---- Validate --------------------------------------------------------------
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($message) < 10) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid submission']);
    exit;
}

// ---- Compose ---------------------------------------------------------------
$body = "New enquiry from the website\n"
      . "----------------------------------------\n"
      . "Name:         " . ($name ?: '—') . "\n"
      . "Email:        " . $email . "\n"
      . "Phone:        " . ($phone ?: '—') . "\n"
      . "Project type: " . ($type ?: '—') . "\n"
      . "----------------------------------------\n\n"
      . $message . "\n";

// From must be an address ON your domain for good deliverability (SPF/DKIM).
$fromAddr = 'info@ox.productionsuae.com';
$headers  = [];
$headers[] = 'From: Over Exposure Website <' . $fromAddr . '>';
$headers[] = 'Reply-To: ' . ($name ? $name . ' <' . $email . '>' : $email);
$headers[] = 'Content-Type: text/plain; charset=utf-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// ---- Send ------------------------------------------------------------------
$sent = mail($TO, $SUBJECT, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail failed']);
}
