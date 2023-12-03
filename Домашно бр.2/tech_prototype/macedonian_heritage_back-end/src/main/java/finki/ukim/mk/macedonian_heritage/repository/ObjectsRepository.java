package finki.ukim.mk.macedonian_heritage.repository;

import finki.ukim.mk.macedonian_heritage.model.Objects;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ObjectsRepository extends JpaRepository<Objects, Integer> {

    @Query("select a from Objects a")
    List<Objects> findAll();

    @Query("select o from Objects o where o.category = :category")
    List<Objects> findbyCategory(String category);

    @Query("select  o from Objects o where o.id= :id")
    Objects findById(Long id);
}
