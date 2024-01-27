package finki.ukim.mk.macedonian_heritage.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "users")
public class Users {
    @Id
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @OneToMany(mappedBy = "user")
    private List<Review> reviewList;
    @ManyToMany
    private Set<Objects> favouritePlaces;

    public Users(String username, String password, String name, String surname) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }

    public Users() {
    }
}
