<?php

require __DIR__ . '\vendor\autoload.php';
// require __DIR__ . '\vendor\phpmailer\phpmailer\PHPMailerAutoload.php';

function sendEmail($config){
	$mail = new PHPMailer();
	try {
		$mail->CharSet = 'UTF-8';
		//Server settings
		// $mail->SMTPDebug = 2;                                 // Enable verbose debug output
		// $mail->SMTPDebug = 3;                                 // Enable verbose debug output
		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = 'mailtrap.io';  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = '87ad9968ae1160';                 // SMTP username
		$mail->Password = '4a31abf3ba91f5';                           // SMTP password
		$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 25;                                    // TCP port to connect to

		//Recipients
		$mail->setFrom('michal_sachar@o2.pl', 'Michał Sacharczuk');
		$mail->addAddress('michal_sachar@o2.pl', 'Michał Sacharczuk');     // Add a recipient
		// $mail->addAddress('ellen@example.com');               // Name is optional
		$mail->addReplyTo($config->from_email, $config->from_name);
		// $mail->addCC('cc@example.com');
		// $mail->addBCC('bcc@example.com');

		//Attachments
		// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
		// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

		//Content
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = 'Nowa wiadomość ze strony PORTFOLIO';
		$mail->Body    = 'Nadawca: ' . $config->from_name .
						' &lt;' . $config->from_email . '&gt; napisał:<br><br>' . $config->message;

		$html = new \Html2Text\Html2Text($mail->Body);
		$mail->AltBody = $html->getText();

		$mail->send();

		?>
		<script>
			sessionStorage.mailSuccess = true;
		</script>
		<?php

		// echo 'Message has been sent';
	} catch (Exception $e) {

		?>
		<script>
			sessionStorage.mailSuccess = false;
		</script>
		<?php

		// echo 'Message could not be sent.';
		// echo 'Mailer Error: ' . $mail->ErrorInfo;
	}
}


if($_SERVER['REQUEST_METHOD'] === 'POST'){
	$config = (object) [
		'from_email' => $_POST['input-email'],
		'from_name' => $_POST['input-name'],
		'message' => $_POST['input-message']
	];

	sendEmail($config);
	// header('Location: index.html');

	?>
	<script>
		sessionStorage.mailSent = true;
		window.location = 'index.html';
	</script>
	<?php

}

?>	