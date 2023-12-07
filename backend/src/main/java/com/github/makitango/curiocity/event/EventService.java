package com.github.makitango.curiocity.event;

import com.github.makitango.curiocity.event.exceptions.EventNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event addEvent(EventDTO eventDTO) {
        Event entityEvent = Event.builder()
                .name(eventDTO.name())
                .location(eventDTO.location())
                .date(eventDTO.date())
                .time(eventDTO.time())
                .link(eventDTO.link())
                .usersWhoUpvoted(List.of())
                .usersWhoDownvoted(List.of())
                .build();
        return eventRepository.save(entityEvent);
    }

    public Event getEventById(String eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        return eventOptional.orElseThrow(EventNotFoundException::new);
    }


    public Event updateEvent(String id, EventDTO eventDTO) {

        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        Event updatedEvent = Event.builder()
                .id(existingEvent.id())
                .usersWhoUpvoted(existingEvent.usersWhoUpvoted())
                .usersWhoDownvoted(existingEvent.usersWhoDownvoted())
                .name(eventDTO.name())
                .location(eventDTO.location())
                .date(eventDTO.date())
                .time(eventDTO.time())
                .link(eventDTO.link())
                .build();
        return eventRepository.save(updatedEvent);
    }

    public void deleteEvent(String eventId) {
        eventRepository.findById(eventId).orElseThrow(EventNotFoundException::new);
        eventRepository.deleteById(eventId);
    }
}