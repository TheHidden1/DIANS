package finki.ukim.mk.macedonian_heritage.web.controllers;

import finki.ukim.mk.macedonian_heritage.model.Review;
import finki.ukim.mk.macedonian_heritage.services.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(name="All Objects", value = "/api/v1/review")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> requestBody) {
        String body =  requestBody.get("body");
        Long id = Long.parseLong(requestBody.get("id"));
        String username =  requestBody.get("username");

        Review review = reviewService.createReview(body, id, username);

        if (review != null) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
