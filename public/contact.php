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
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// ---- Send ------------------------------------------------------------------
// The 5th arg sets the envelope sender (Return-Path) to a REAL mailbox on the
// domain. Without it Hostinger's MTA accepts the message (mail() returns true)
// but silently drops/spam-files it because the default envelope-from
// (www-data@server…) fails SPF. This "-f" is the fix for "mail() says ok but
// nothing arrives". The address must be an existing mailbox on the account.
$sent = mail($TO, $SUBJECT, $body, implode("\r\n", $headers), '-f' . $fromAddr);

// Server-side backup: append every enquiry to a log ABOVE the web root (never
// web-servable — it holds visitor PII) so a dropped/delayed email never means a
// lost lead. Best-effort; ignore failures if the dir isn't writable.
@file_put_contents(
    dirname(__DIR__) . '/enquiries.log',
    '[' . gmdate('c') . "] to=$TO from=$email name=$name phone=$phone type=$type sent="
        . ($sent ? '1' : '0') . "\n" . $message . "\n----\n",
    FILE_APPEND | LOCK_EX
);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    error_log('[contact.php] mail() failed for enquiry from ' . $email);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail failed']);
}

/*
 * ─── IF EMAIL STILL DOESN'T ARRIVE AFTER THIS ────────────────────────────────
 * Then Hostinger's PHP mail() is disabled/unreliable on your plan and you must
 * send via authenticated SMTP. Fastest path:
 *   1. hPanel → Emails → confirm the info@ox.productionsuae.com mailbox exists
 *      and you know its password.
 *   2. Switch this handler to PHPMailer over SMTP:
 *        Host: smtp.hostinger.com   Port: 465   Encryption: SSL
 *        Username: info@ox.productionsuae.com   Password: <mailbox password>
 *      Keep the password OUT of git — read it from an env var or an
 *      un-committed config file above the web root.
 *   3. Also check the info@ inbox's Spam folder, and add SPF/DKIM records in
 *      hPanel → Emails → DNS (Hostinger provides one-click records).
 */
