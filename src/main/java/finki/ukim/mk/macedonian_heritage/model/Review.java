package finki.ukim.mk.macedonian_heritage.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String body;
    private Double rating;
    @JsonIgnore
    @ManyToOne
    private Objects object;
    @JsonIgnore
    @ManyToOne
    private Users user;
    private String username;

    public Review() {
    }

    public Review(String body, Double rating, Objects object, Users user) {
        this.body = body;
        this.object = object;
        this.user = user;
        this.rating = rating;
        this.username = user.getName();
    }
}
