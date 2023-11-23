package com.github.makitango.curiocity.event;

import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class EventServiceTest {

    private final EventRepository mockEventRepository = mock(EventRepository.class);
    private final EventService eventService = new EventService(mockEventRepository);

    @Test
    void getAllEvents_shouldReturnListOfEvents() {
        // GIVEN
        Event event1 = Event.builder()
                .id("1")
                .name("Sample Event 1")
                .location("City Center")
                .time(1637550000)
                .link("https://example.com/event1")
                .usersWhoUpvoted(List.of("user1", "user2", "user3"))
                .usersWhoDownvoted(List.of("user4"))
                .build();
        Event event2 = Event.builder()
                .id("2")
                .name("Sample Event 2")
                .location("Park Plaza")
                .time(1637650000)
                .link("https://example.com/event2")
                .usersWhoUpvoted(List.of("user1", "user3", "user5"))
                .usersWhoDownvoted(List.of("user2"))
                .build();
        List<Event> expected = List.of(event1, event2);
        // WHEN
        when(mockEventRepository.findAll()).thenReturn(expected);
        List<Event> actual = eventService.getAllEvents();
        // THEN
        verify(mockEventRepository).findAll();
        assertEquals(expected, actual);
    }
}
