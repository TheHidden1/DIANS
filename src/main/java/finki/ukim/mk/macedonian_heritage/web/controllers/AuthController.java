package finki.ukim.mk.macedonian_heritage.web.controllers;


import finki.ukim.mk.macedonian_heritage.model.Users;
import finki.ukim.mk.macedonian_heritage.services.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
//@CrossOrigin(origins = "http://localhost:5174/", allowCredentials = "true")
//@CrossOrigin(origins = "http://localhost:5173/")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(HttpServletResponse response, @RequestParam String username, @RequestParam String password){
        try  {
            System.out.println("Received login request. Username: " + username + ", Password: " + password);
            Users user= authService.login(username, password);
            String token = generateSessionToken();
            Cookie sessionCookie = new Cookie("token", token);
            sessionCookie.setMaxAge(30 * 60); // 30 minutes timeout
            sessionCookie.setPath("/"); // Cookie is accessible from all
////
////            sessionCookie.setSecure(true);
//
            response.addCookie(sessionCookie);

            return ResponseEntity.ok(user);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }
    private String generateSessionToken() {
        // Generate a secure session token using SecureRandom and Base64 encoding
        byte[] randomBytes = new byte[32]; // You can adjust the size based on your security requirements
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getEncoder().encodeToString(randomBytes);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String repeatPassword,
            @RequestParam String name,
            @RequestParam String surname){
        try {
            Users user= authService.register(username, password, repeatPassword, name, surname);
            return ResponseEntity.ok(user);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
