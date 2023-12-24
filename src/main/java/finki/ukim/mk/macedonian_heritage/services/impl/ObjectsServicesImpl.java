package finki.ukim.mk.macedonian_heritage.services.impl;

import finki.ukim.mk.macedonian_heritage.model.Objects;
import finki.ukim.mk.macedonian_heritage.repository.ObjectsRepository;
import finki.ukim.mk.macedonian_heritage.services.ObjectsServices;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ObjectsServicesImpl implements ObjectsServices {
    private final ObjectsRepository objectsRepository;

    public ObjectsServicesImpl(ObjectsRepository objectsRepository) {
        this.objectsRepository = objectsRepository;
    }
    @Override
    public List<Objects> findAllObjects() {
        return objectsRepository.findAll().stream()
                .filter(i->!i.getName().contains("?")).toList();
    }

    @Override
    public Objects findById(Long id) {
        return objectsRepository.findById(id);
    }

    //categories : attraction, artwork, viewpoint, museum
    @Override
    public List<Objects> findByCategory(String category) {
        return objectsRepository.findbyCategory(category);
    }

    @Override
    public Optional<Objects> findByName(String name) {
        return Optional.of(objectsRepository.findByName(name));
    }

}
