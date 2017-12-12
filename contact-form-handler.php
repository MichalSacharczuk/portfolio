<? php
$errors = '';
$myEmail = 'michal_sachar@o2.pl';
if (empty($_POST['input-name']) || empty($_POST['input-email']) || empty($_POST['input-message'])){
	$errors .= '\n wszystkie pola są wymagane'
}

$name = $_POST('input-name');
$email = $_POST('input-email');
$message = $_POST('input-message');

if(!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,3}$/i", $email)){
	$errors .= '\n adres e-mail jest niepoprawny'
}

if(!empty($errors)){
	$subject = 'Nowa wiadomość ze strony PORTFOLIO \n';
	$body = 'Nadawca: $name \n E-mail: $email \n Treść wiadomości: \n $message \n';
	$headers = 'Od: $myEmail \n Odpowiedź do: $email';
	mail($myEmail, $subject, $body, $headers);

	header('Location: index.html');
	// print('<script>alert("Wiadomość wysłano");</script>');
	print("<script>document.querySelector('#envelope-top').classList.add('closedEnvelope');</script>");
}
?>