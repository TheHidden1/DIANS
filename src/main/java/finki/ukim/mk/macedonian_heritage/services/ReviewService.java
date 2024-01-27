package finki.ukim.mk.macedonian_heritage.services;

import finki.ukim.mk.macedonian_heritage.model.Review;

import java.util.List;

public interface ReviewService {
    Review createReview(String body, Double rating, Long objectId, String username);

    List<Review> findByObject(Long objectId);
}
