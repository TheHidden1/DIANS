package finki.ukim.mk.macedonian_heritage.services.impl;

import finki.ukim.mk.macedonian_heritage.model.Objects;
import finki.ukim.mk.macedonian_heritage.model.Review;
import finki.ukim.mk.macedonian_heritage.model.Users;
import finki.ukim.mk.macedonian_heritage.repository.AuthRepository;
import finki.ukim.mk.macedonian_heritage.repository.ReviewRepository;
import finki.ukim.mk.macedonian_heritage.services.ObjectsServices;
import finki.ukim.mk.macedonian_heritage.services.ReviewService;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {
    public final ReviewRepository reviewRepository;
    public final ObjectsServices objectsServices;
    public final AuthRepository authRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ObjectsServices objectsServices, AuthRepository authRepository) {
        this.reviewRepository = reviewRepository;
        this.objectsServices = objectsServices;
        this.authRepository = authRepository;
    }

    @Override
    public Review createReview(String body, Double rating, Long objectId, String username) {
        Objects object = objectsServices.findById(objectId);
        Users user = authRepository.findByUsername(username);
        Review review = new Review(body, rating, object, user);
        object.getReviewList().add(review);
        object.setRating(RatingObject(rating, objectId));
        return reviewRepository.save(review);
    }

    private double RatingObject(Double rating, Long objectId) {
        Objects object = objectsServices.findById(objectId);
        if (object.getRating()==null || object.getRating() == 0) {
            return rating;
        } else {
            double sum=0.0;
            System.out.println(object.getReviewList().size());
            for(Review r : object.getReviewList()){
                sum+=r.getRating();
            }
            return Math.round((sum/object.getReviewList().size())*10.0)/10.0;
        }
    }
}
