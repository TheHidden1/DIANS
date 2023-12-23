package finki.ukim.mk.macedonian_heritage.web.controllers;

import finki.ukim.mk.macedonian_heritage.model.Users;
import finki.ukim.mk.macedonian_heritage.services.ObjectsServices;
import finki.ukim.mk.macedonian_heritage.services.UsersServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(name = "User edit", value = "/api/v1/user")
public class UsersController {
    private final UsersServices usersServices;
    private final ObjectsServices objectsServices;

    public UsersController(UsersServices usersServices, ObjectsServices objectsServices) {
        this.usersServices = usersServices;
        this.objectsServices = objectsServices;
    }
    @GetMapping(value = "/username/{username}", produces = "application/JSON")
    public ResponseEntity<Users> findByUsername(@PathVariable String username){
        return new ResponseEntity<>(usersServices.findByUsername(username), HttpStatus.OK);
    }
    @PostMapping(value = "/add", produces = "application/JSON")
    public ResponseEntity<Users> addFavouritePlace(@RequestBody Map<String, Object> requestBody){
        Long placeId = ((Number) requestBody.get("placeId")).longValue();
        String username = (String) requestBody.get("username");

        return new ResponseEntity<>(usersServices.addToFavouritePlace(username, placeId), HttpStatus.OK);

    }
    @PostMapping(value = "/remove", produces = "application/JSON")
    public ResponseEntity<Users> removeFavouritePlace(@RequestParam Long placeId,
                                                      @RequestParam String username){
        usersServices.removeFavouritePlace(username, placeId);
        return new ResponseEntity<>(usersServices.findByUsername(username), HttpStatus.OK);
    }
    @PostMapping(value = "/changePassword", produces = "application/JSON")
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
