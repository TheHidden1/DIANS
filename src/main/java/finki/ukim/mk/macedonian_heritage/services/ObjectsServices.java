package finki.ukim.mk.macedonian_heritage.services;

import finki.ukim.mk.macedonian_heritage.model.Objects;

import java.util.List;
import java.util.Optional;

public interface ObjectsServices {
    List<Objects> findAllObjects();

    Objects findById(Long id);

    List<Objects> findByCategory(String category);

    Optional<Objects> findByName(String name);

}
