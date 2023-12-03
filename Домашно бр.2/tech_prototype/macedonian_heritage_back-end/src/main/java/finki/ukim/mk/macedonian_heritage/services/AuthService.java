package finki.ukim.mk.macedonian_heritage.services;

import finki.ukim.mk.macedonian_heritage.model.Users;

public interface AuthService {
    Users login(String username, String password);

    Users register(String username, String password, String repeatPassword, String name, String surname);

}
