package finki.ukim.mk.macedonian_heritage.web.controllers;


import finki.ukim.mk.macedonian_heritage.model.Users;
import finki.ukim.mk.macedonian_heritage.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Users> login(@RequestParam String username, @RequestParam String password){
        try  {
            System.out.println("Received login request. Username: " + username + ", Password: " + password);
            Users user= authService.login(username, password);
            return ResponseEntity.ok(user);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Users> register(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String repeatPassword,
            @RequestParam String name,
            @RequestParam String surname){
        try {
            Users user= authService.register(username, password, repeatPassword, name, surname);
            return ResponseEntity.ok(user);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
