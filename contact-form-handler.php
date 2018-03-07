<?php

require __DIR__ . '/vendor/autoload.php';

function sendEmail($config){
	$mail = new PHPMailer();
	try {
		$mail->CharSet = 'UTF-8';
		//Server settings
		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = 'poczta.o2.pl';  						// Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = 'michal_sachar@o2.pl';                 // SMTP username
		$mail->Password = '***';                           // SMTP password
		$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 587;  

		//Recipients
		$mail->setFrom('michal_sachar@o2.pl', 'Michał Sacharczuk');
		$mail->addAddress('michal_sachar@o2.pl', 'Michał Sacharczuk');     // Add a recipient
		$mail->addReplyTo($config->from_email, $config->from_name);

		//Content
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = 'Nowa wiadomość ze strony PORTFOLIO';
		$mail->Body    = 'Nadawca: ' . $config->from_name .
						' &lt;' . $config->from_email . '&gt; napisał:<br><br>' . $config->message;

		$html = new \Html2Text\Html2Text($mail->Body);
		$mail->AltBody = $html->getText();

		$mail->send();

	} catch (Exception $e) {

		echo 0;

	}
}


if($_SERVER['REQUEST_METHOD'] === 'POST'){
	$config = (object) [
		'from_email' => $_POST['input-email'],
		'from_name' => $_POST['input-name'],
		'message' => $_POST['input-message']
	];

	sendEmail($config);

	echo 1;

}

?>	