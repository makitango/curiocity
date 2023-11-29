package com.github.makitango.curiocity.event;

import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EventServiceTest {

    private final EventRepository mockEventRepository = mock(EventRepository.class);
    private final EventService eventService = new EventService(mockEventRepository);

    @Test
    void getAllEvents_shouldReturnListOfEvents() {
        // GIVEN
        Event event1 = Event.builder()
                .id("1")
                .name("Battle of Winterfell")
                .location("Winterfell")
                .date("AC302")
                .time("9:00 PM")
                .link("https://example.com/battleofwinterfell")
                .usersWhoUpvoted(List.of("Arya Stark", "Jon Snow", "Daenerys Targaryen"))
                .usersWhoDownvoted(List.of("Night King"))
                .build();

        Event event2 = Event.builder()
                .id("2")
                .name("The Purple Wedding")
                .location("King's Landing")
                .date("AC300")
                .time("3:00 PM")
                .link("https://example.com/purplewedding")
                .usersWhoUpvoted(List.of("Sansa Stark", "Margaery Tyrell"))
                .usersWhoDownvoted(List.of("Joffrey Baratheon"))
                .build();

        List<Event> expected = List.of(event1, event2);

        // WHEN
        when(mockEventRepository.findAll()).thenReturn(expected);
        List<Event> actual = eventService.getAllEvents();

        // THEN
        verify(mockEventRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addEvent_shouldReturnAddedEvent() {
        // GIVEN
        EventDTO eventDTO = EventDTO.builder()
                .name("Battle of the Bastards")
                .location("Winterfell")
                .date("AC300")
                .time("2:30 PM")
                .link("https://example.com/battleofthebastards")
                .usersWhoUpvoted(List.of("Jon Snow", "Sansa Stark"))
                .usersWhoDownvoted(List.of("Ramsay Bolton"))
                .build();

        Event expectedEvent = Event.builder()
                .id("3")
                .name("Battle of the Bastards")
                .location("Winterfell")
                .date("AC300")
                .time("2:30 PM")
                .link("https://example.com/battleofthebastards")
                .usersWhoUpvoted(List.of("Jon Snow", "Sansa Stark"))
                .usersWhoDownvoted(List.of("Ramsay Bolton"))
                .build();

        // WHEN
        when(mockEventRepository.save(any(Event.class))).thenReturn(expectedEvent);
        Event addedEvent = eventService.addEvent(eventDTO);

        // THEN
        verify(mockEventRepository).save(any(Event.class));
        assertNotNull(addedEvent);
        assertEquals("Battle of the Bastards", addedEvent.name());
        assertEquals("Winterfell", addedEvent.location());
        assertEquals("AC300", addedEvent.date());
        assertEquals("2:30 PM", addedEvent.time());
        assertEquals("https://example.com/battleofthebastards", addedEvent.link());
        assertEquals(List.of("Jon Snow", "Sansa Stark"), addedEvent.usersWhoUpvoted());
        assertEquals(List.of("Ramsay Bolton"), addedEvent.usersWhoDownvoted());
    }
}
