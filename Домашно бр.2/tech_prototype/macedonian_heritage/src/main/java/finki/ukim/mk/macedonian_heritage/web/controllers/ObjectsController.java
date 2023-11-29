package finki.ukim.mk.macedonian_heritage.web.controllers;

import finki.ukim.mk.macedonian_heritage.model.Objects;
import finki.ukim.mk.macedonian_heritage.services.ObjectsServices;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;
import java.util.Optional;

@RestController
@EnableWebMvc
@Configuration
@RequestMapping(name="All Objects", value = "/api/v1/")
public class ObjectsController {
    private final ObjectsServices objectsServices;

    public ObjectsController(ObjectsServices objectsServices) {
        this.objectsServices = objectsServices;
    }

    @GetMapping("/objects")
    public List<Objects> getAllObjects(){
        return objectsServices.findAllObjects();
    }
    @GetMapping("/objects/ID/{id}")
    private Optional<Objects> getById(@PathVariable(name = "id") long id){
        return objectsServices.findById(id);
    }
    @GetMapping("/objects/category/{category}")
    private List<Objects> getByCategory(@PathVariable(name = "category") String category){
        return objectsServices.findByCategory(category);
    }
}
