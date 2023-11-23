package com.github.makitango.curiocity.event;

import java.util.List;

import lombok.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;

    @PostMapping
    public Event addEvent(@RequestBody DTOEvent event) {
        Event entityEvent =
                Event.builder()
                        .name(event.name())
                        .location(event.location())
                        .time(event.time())
                        .link(event.link())
                        .usersWhoUpvoted(event.usersWhoUpvoted())
                        .usersWhoDownvoted(event.usersWhoDownvoted())
                        .build();
        return eventService.addEvent(entityEvent);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }
}

