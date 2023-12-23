package finki.ukim.mk.macedonian_heritage.web.controllers;

import finki.ukim.mk.macedonian_heritage.model.Review;
import finki.ukim.mk.macedonian_heritage.services.ObjectsServices;
import finki.ukim.mk.macedonian_heritage.services.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(name="All Objects", value = "/api/v1/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final ObjectsServices objectsServices;

    public ReviewController(ReviewService reviewService, ObjectsServices objectsServices) {
        this.reviewService = reviewService;
        this.objectsServices = objectsServices;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<List<Review>> createReview(@RequestBody Map<String, String> requestBody) {
        String body =  requestBody.get("body");
        Double rating= Double.parseDouble(requestBody.get("rating"));
        Long id = Long.parseLong(requestBody.get("id"));
        String username =  requestBody.get("username");

        Review review = reviewService.createReview(body, rating, id, username);
        if (review != null) {
            return new ResponseEntity<>(reviewService.findByObject(id), HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
