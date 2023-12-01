package com.github.makitango.curiocity.event;

import org.springframework.stereotype.Service;

import java.util.List;

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

    public Event getEventById(String id) {
        return eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
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
}