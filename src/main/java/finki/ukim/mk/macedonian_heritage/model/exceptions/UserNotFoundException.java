package finki.ukim.mk.macedonian_heritage.model.exceptions;

public class UserNotFoundException extends  RuntimeException{
    public UserNotFoundException(){
        super("User not found, you need to register!");
    }
}
