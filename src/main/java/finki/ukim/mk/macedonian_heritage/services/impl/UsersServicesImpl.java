package finki.ukim.mk.macedonian_heritage.services.impl;

import finki.ukim.mk.macedonian_heritage.model.Objects;
import finki.ukim.mk.macedonian_heritage.model.Users;
import finki.ukim.mk.macedonian_heritage.model.exceptions.IncorectOldPassword;
import finki.ukim.mk.macedonian_heritage.model.exceptions.PasswordsDoNotMatch;
import finki.ukim.mk.macedonian_heritage.repository.UsersRepository;
import finki.ukim.mk.macedonian_heritage.services.ObjectsServices;
import finki.ukim.mk.macedonian_heritage.services.UsersServices;
import org.springframework.stereotype.Service;

@Service
public class UsersServicesImpl implements UsersServices {
    private final UsersRepository usersRepository;
    private final ObjectsServices objectsServices;

    public UsersServicesImpl(UsersRepository usersRepository, ObjectsServices objectsServices) {
        this.usersRepository = usersRepository;
        this.objectsServices = objectsServices;
    }

    @Override
    public Users findByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    @Override
    public void removeFavouritePlace(String username, Long placeId) {
        Objects object = objectsServices.findById(placeId);
        Users user= usersRepository.findByUsername(username);
        if(user != null){
            user.getFavouritePlaces().remove(object);
            usersRepository.save(user);
        }
    }

    @Override
    public void changePassword(String username, String oldPassword,
                               String newPassword, String repeatPassword) {
        Users user= usersRepository.findByUsername(username);
        if(oldPassword.equals(user.getPassword())){
            if(newPassword.equals(repeatPassword)){
                user.setPassword(newPassword);
                usersRepository.save(user);
            }else {
                throw new PasswordsDoNotMatch();
            }
        }else {
            throw new IncorectOldPassword();
        }
    }
}
