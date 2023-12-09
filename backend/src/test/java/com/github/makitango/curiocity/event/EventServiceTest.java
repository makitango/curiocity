package com.github.makitango.curiocity.event;

import com.github.makitango.curiocity.event.models.Event;
import com.github.makitango.curiocity.event.models.EventDTO;
import com.github.makitango.curiocity.event.repositories.EventRepository;
import com.github.makitango.curiocity.event.services.EventService;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EventServiceTest {

    private final EventRepository mockEventRepository = mock(EventRepository.class);
    private final EventService eventService = new EventService(mockEventRepository);

    @Test
    void addEvent_shouldReturnAddedEvent() {
        // GIVEN
        EventDTO eventDTO = EventDTO.builder()
                .name("Battle of the Bastards")
                .location("Winterfell")
                .date("AC300")
                .time("2:30 PM")
                .link("https://gameofthrones.fandom.com/wiki/Battle_of_the_Bastards")
                .build();

        Event expectedEvent = Event.builder()
                .id("3")
                .name("Battle of the Bastards")
                .location("Winterfell")
                .date("AC300")
                .time("2:30 PM")
                .link("https://gameofthrones.fandom.com/wiki/Battle_of_the_Bastards")
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
        assertEquals("https://gameofthrones.fandom.com/wiki/Battle_of_the_Bastards", addedEvent.link());
        assertEquals(List.of("Jon Snow", "Sansa Stark"), addedEvent.usersWhoUpvoted());
        assertEquals(List.of("Ramsay Bolton"), addedEvent.usersWhoDownvoted());
    }

    @Test
    void getAllEvents_shouldReturnListOfEvents() {
        // GIVEN
        Event event1 = Event.builder()
                .id("1")
                .name("Battle of Winterfell")
                .location("Winterfell")
                .date("AC302")
                .time("9:00 PM")
                .link("https://gameofthrones.fandom.com/wiki/Battle_of_Winterfell")
                .usersWhoUpvoted(List.of("Arya Stark", "Jon Snow", "Daenerys Targaryen"))
                .usersWhoDownvoted(List.of("Night King"))
                .build();

        Event event2 = Event.builder()
                .id("2")
                .name("The Purple Wedding")
                .location("King's Landing")
                .date("AC300")
                .time("3:00 PM")
                .link("https://gameofthrones.fandom.com/wiki/Purple_Wedding")
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
    void getEventById_shouldReturnEvent() {
        // GIVEN
        String eventId = "1";
        Event expected = Event.builder()
                .id(eventId)
                .name("Battle of Winterfell")
                .location("Winterfell")
                .date("AC302")
                .time("9:00 PM")
                .link("https://gameofthrones.fandom.com/wiki/Battle_of_Winterfell")
                .usersWhoUpvoted(List.of("Arya Stark", "Jon Snow", "Daenerys Targaryen"))
                .usersWhoDownvoted(List.of("Night King"))
                .build();

        // WHEN
        when(mockEventRepository.findById(eventId)).thenReturn(Optional.of(expected));
        Event actual = eventService.getEventById(eventId);

        // THEN
        verify(mockEventRepository).findById(eventId);
        assertNotNull(actual);
        assertEquals(expected, actual);
    }

    @Test
    void updateEvent_shouldReturnUpdatedEvent() {
        // GIVEN
        String eventId = "1";
        Event existingEvent = Event.builder()
                .id(eventId)
                .name("Red Wedding")
                .location("Westeros")
                .date("BC1000")
                .time("5:00 PM")
                .link("https://gameofthrones.fandom.com/wiki/Red_Wedding")
                .usersWhoUpvoted(List.of("Robb Stark", "Catelyn Stark"))
                .usersWhoDownvoted(List.of("Walder Frey"))
                .build();

        EventDTO updatedEventDTO = EventDTO.builder()
                .name("Updated Red Wedding")
                .location("Updated Westeros")
                .date("Updated BC1000")
                .time("Updated 5:00 PM")
                .link("https://updated-link.com")
                .build();

        Event expectedUpdatedEvent = Event.builder()
                .id(eventId)
                .name("Updated Red Wedding")
                .location("Updated Westeros")
                .date("Updated BC1000")
                .time("Updated 5:00 PM")
                .link("https://updated-link.com")
                .usersWhoUpvoted(List.of("Robb Stark", "Catelyn Stark"))
                .usersWhoDownvoted(List.of("Walder Frey"))
                .build();

        // WHEN
        when(mockEventRepository.findById(eventId)).thenReturn(Optional.of(existingEvent));
        when(mockEventRepository.save(any(Event.class))).thenReturn(expectedUpdatedEvent);

        Event actualUpdatedEvent = eventService.updateEvent(eventId, updatedEventDTO);

        // THEN
        verify(mockEventRepository).findById(eventId);
        verify(mockEventRepository).save(any(Event.class));

        assertNotNull(actualUpdatedEvent);
        assertEquals(expectedUpdatedEvent, actualUpdatedEvent);
    }

    @Test
    void deleteEvent_shouldDeleteEventSuccessfully() {
        // GIVEN
        String eventId = "1";
        Event existingEvent = Event.builder()
                .id(eventId)
                .name("Red Wedding")
                .location("Westeros")
                .date("BC1000")
                .time("5:00 PM")
                .link("https://gameofthrones.fandom.com/wiki/Red_Wedding")
                .usersWhoUpvoted(List.of("Robb Stark", "Catelyn Stark"))
                .usersWhoDownvoted(List.of("Walder Frey"))
                .build();

        when(mockEventRepository.findById(eventId)).thenReturn(Optional.of(existingEvent));

        // WHEN
        eventService.deleteEvent(eventId);

        // THEN
        verify(mockEventRepository).deleteById(eventId);
    }


    @Test
    void deleteEvent_shouldThrowExceptionIfEventNotFound() {
        // GIVEN
        String nonExistingEventId = "non-existing-id";

        // WHEN
        try {
            eventService.deleteEvent(nonExistingEventId);
        } catch (RuntimeException e) {
            // THEN
            assertEquals("Event not found", e.getMessage());
        }
    }
}
