package finki.ukim.mk.macedonian_heritage.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import static java.lang.Integer.parseInt;
import static java.lang.Long.parseLong;

@Entity
@Data
@Table(name="OBJECTS")
public class Objects {
    @Id
    @Column(name="id")
    private Long id;
    @Column(name="lat")
    private String lat;
    @Column(name="lng")
    private String lng;
    @Column(name = "name")
    private String name;
    @Column(name="tourism")
    private String category;
    @OneToMany(mappedBy = "object")
    private List<Review> reviewList;

}
