package finki.ukim.mk.macedonian_heritage.services;

import finki.ukim.mk.macedonian_heritage.model.Users;

public interface UsersServices {
    public Users findByUsername(String username);
    public void removeFavouritePlace(String username, Long placeId);
    public void changePassword(String username, String oldPassword,
                               String newPassword, String repeatPassword);
}
