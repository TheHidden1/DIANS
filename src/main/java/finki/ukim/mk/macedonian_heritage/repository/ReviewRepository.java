package finki.ukim.mk.macedonian_heritage.repository;

import finki.ukim.mk.macedonian_heritage.model.Objects;
import finki.ukim.mk.macedonian_heritage.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review save(Review review);

    List<Review> findByObject(Objects object);
}
