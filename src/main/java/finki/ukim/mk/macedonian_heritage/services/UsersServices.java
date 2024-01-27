package finki.ukim.mk.macedonian_heritage.services;

import finki.ukim.mk.macedonian_heritage.model.Users;

public interface UsersServices {
    Users findByUsername(String username);

    Users addToFavouritePlace(String username, Long placeId);

    void removeFavouritePlace(String username, Long placeId);

    void changePassword(String username, String oldPassword,
                        String newPassword, String repeatPassword);
}
