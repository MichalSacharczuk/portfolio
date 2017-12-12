let formValidator = new Validator('my-form');
formValidator.addValidation('input-name','req','uzupełnij pole z imieniem i nazwiskiem');
formValidator.addValidation('input-email','req','uzupełnij pole z adresem e-mail');
formValidator.addValidation('input-message','req','uzupełnij pole z treścią wiadomości');
formValidator.addValidation('input-email','email','wpisz poprawną formę adresu e-mail');