package finki.ukim.mk.macedonian_heritage.repository;

import finki.ukim.mk.macedonian_heritage.model.Objects;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ObjectsRepository extends JpaRepository<Objects, Integer> {

    List<Objects> findAll();

    @Query("select o from Objects o where o.category = :category")
    List<Objects> findbyCategory(String category);


    Objects findById(Long id);

    Objects findByName(String name);
}
