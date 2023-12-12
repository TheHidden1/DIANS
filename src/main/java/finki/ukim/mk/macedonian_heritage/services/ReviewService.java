package finki.ukim.mk.macedonian_heritage.services;

import finki.ukim.mk.macedonian_heritage.model.Review;

public interface ReviewService {
    public Review createReview(String body, Long objectId, String username);
}
