package finki.ukim.mk.macedonian_heritage.web.controllers;

import finki.ukim.mk.macedonian_heritage.model.Objects;
import finki.ukim.mk.macedonian_heritage.services.ObjectsServices;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Validated
@CrossOrigin(origins="*")
@RequestMapping(name="All Objects", value = "/api/v1/")
public class ObjectsController {
    private final ObjectsServices objectsServices;

    public ObjectsController(ObjectsServices objectsServices) {
        this.objectsServices = objectsServices;
    }

    @GetMapping("/objects")
    public ResponseEntity<List<Objects>> getAllObjects(){
        return new ResponseEntity<List<Objects>>(objectsServices.findAllObjects(), HttpStatus.OK);
    }
    @GetMapping("/objects/id/{id}")
    public ResponseEntity<Optional<Objects>> getById(@PathVariable(name = "id") long id){
        return new ResponseEntity<>(objectsServices.findById(id), HttpStatus.OK);
    }
    @GetMapping("/objects/category/{category}")
    public ResponseEntity<List<Objects>> getByCategory(@PathVariable(name = "category") String category){
        return new ResponseEntity<>(objectsServices.findByCategory(category), HttpStatus.OK);
    }
}
