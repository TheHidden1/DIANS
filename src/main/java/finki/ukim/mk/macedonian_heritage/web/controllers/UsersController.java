package finki.ukim.mk.macedonian_heritage.web.controllers;

import finki.ukim.mk.macedonian_heritage.model.Users;
import finki.ukim.mk.macedonian_heritage.services.UsersServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(name = "User edit", value = "/api/v1/user")
public class UsersController {
    private final UsersServices usersServices;

    public UsersController(UsersServices usersServices) {
        this.usersServices = usersServices;
    }
    @GetMapping("/username/{username}")
    public ResponseEntity<Users> findByUsername(@PathVariable String username){
        return new ResponseEntity<>(usersServices.findByUsername(username), HttpStatus.OK);
    }
    @PostMapping("/remove/{placeId}")
    public ResponseEntity<Users> removeFavouritePlace(@PathVariable Long placeId,
                                                      @RequestParam String username){
        usersServices.removeFavouritePlace(username, placeId);
        return new ResponseEntity<>(usersServices.findByUsername(username), HttpStatus.OK);
    }
    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestParam String username,
                                                @RequestParam String oldPassword,
                                                @RequestParam String newPassword,
                                                @RequestParam String repeatPassword){

        try{
            System.out.printf("Received change password for %s %s", username, oldPassword);
            usersServices.changePassword(username, oldPassword,newPassword, repeatPassword);
            Users user= usersServices.findByUsername(username);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

}
