package finki.ukim.mk.macedonian_heritage.repository;

import finki.ukim.mk.macedonian_heritage.model.Users;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, String> {
    Users findByUsername(String username);

}
