package finki.ukim.mk.macedonian_heritage.services.impl;

import finki.ukim.mk.macedonian_heritage.model.Users;
import finki.ukim.mk.macedonian_heritage.repository.UsersRepository;
import finki.ukim.mk.macedonian_heritage.services.UsersService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UsersServiceImpl implements UsersService {
    private final UsersRepository usersRepository;

    public UsersServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public List<Users> findAllUsers() {
        return usersRepository.findAll();
    }
}
