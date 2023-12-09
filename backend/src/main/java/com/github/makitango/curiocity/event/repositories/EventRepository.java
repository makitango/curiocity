package com.github.makitango.curiocity.event.repositories;

import com.github.makitango.curiocity.event.models.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
}
