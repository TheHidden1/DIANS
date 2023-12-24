package finki.ukim.mk.macedonian_heritage.model.exceptions;

public class IncorectOldPassword extends RuntimeException{
    public IncorectOldPassword() {
        super("Invalid old password, try again!");
    }
}
