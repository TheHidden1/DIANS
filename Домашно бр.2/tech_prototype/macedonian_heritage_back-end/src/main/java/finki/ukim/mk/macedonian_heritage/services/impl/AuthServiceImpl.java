package finki.ukim.mk.macedonian_heritage.services.impl;

import finki.ukim.mk.macedonian_heritage.model.Users;
import finki.ukim.mk.macedonian_heritage.model.exceptions.InvalidArgumentsException;
import finki.ukim.mk.macedonian_heritage.model.exceptions.InvalidUserCredentialsException;
import finki.ukim.mk.macedonian_heritage.model.exceptions.PasswordsDoNotMatchException;
import finki.ukim.mk.macedonian_heritage.repository.AuthRepository;
import finki.ukim.mk.macedonian_heritage.services.AuthService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthRepository authRepository;

    public AuthServiceImpl(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    @Override
    public Users login(String username, String password) {
        if (username == null || password == null || username.isEmpty() || password.isEmpty()) {
            throw new InvalidArgumentsException();
        }
        Users user=authRepository.login(username, password);
        if(user==null){
            throw new InvalidUserCredentialsException();
        }else {
            return user;
        }
    }

    @Override
    public Users register(String username, String password, String repeatPassword, String name, String surname) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            throw new InvalidArgumentsException();
        }
        if (!password.equals(repeatPassword)) {
            throw new PasswordsDoNotMatchException();
        }
        return authRepository.save(new Users(username, password, name, surname));

    }
}
