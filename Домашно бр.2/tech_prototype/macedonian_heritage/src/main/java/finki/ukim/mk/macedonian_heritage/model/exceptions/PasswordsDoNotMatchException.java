package finki.ukim.mk.macedonian_heritage.model.exceptions;

public class PasswordsDoNotMatchException extends RuntimeException{
    public PasswordsDoNotMatchException() {
        super("Wrong password entered.");
    }

}
