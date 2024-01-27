package finki.ukim.mk.macedonian_heritage.repository;

import finki.ukim.mk.macedonian_heritage.model.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AuthRepository extends JpaRepository<Users, String> {

    @Query("SELECT u FROM Users u WHERE u.username = :username AND u.password= :password")
    Users login(String username, String password);

    Users findByUsername(String username);
}
