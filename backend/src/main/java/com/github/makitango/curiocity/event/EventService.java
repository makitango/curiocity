package com.github.makitango.curiocity.event;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event addEvent(EventDTO eventDTO) {
        Event entityEvent = Event.builder()
                .name(eventDTO.name())
                .location(eventDTO.location())
                .date(eventDTO.date())
                .time(eventDTO.time())
                .link(eventDTO.link())
                .usersWhoUpvoted(eventDTO.usersWhoUpvoted())
                .usersWhoDownvoted(eventDTO.usersWhoDownvoted())
                .build();
        return eventRepository.save(entityEvent);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}
