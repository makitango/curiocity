package com.github.makitango.curiocity.event;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.github.makitango.curiocity.event.exceptions.EventNotFoundException;
import org.springframework.http.MediaType;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import static org.hamcrest.Matchers.contains;

@SpringBootTest
@AutoConfigureMockMvc
class EventControllerTest {

    private static final String BASE_URI = "/api/events";
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void addEvent_whenEventIsValid_thenEventIsAddedSuccessfully() throws Exception {
        // GIVEN
        EventDTO newEventDTO = EventDTO.builder()
                .name("Battle of Blackwater")
                .location("King's Landing")
                .date("AC299")
                .time("8:00 PM")
                .link("https://gameofthrones.fandom.com/wiki/Battle_of_the_Blackwater")
                .build();

        // WHEN
        MvcResult result = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newEventDTO)))
                .andExpect(status().isOk())
                .andReturn();

        Event addedEvent = objectMapper.readValue(result.getResponse().getContentAsString(), Event.class);

        // THEN
        assertNotNull(addedEvent);
        assertEquals(newEventDTO.name(), addedEvent.name());
        assertEquals(newEventDTO.location(), addedEvent.location());
        assertEquals(newEventDTO.date(), addedEvent.date());
        assertEquals(newEventDTO.time(), addedEvent.time());
        assertEquals(newEventDTO.link(), addedEvent.link());
    }

    @Test
    @DirtiesContext
    void getAllEvents_whenEventsExist_thenListOfEventsIsReturnedSuccessfully() throws Exception {
        // GIVEN
        Event event1 = Event.builder().id("1")
                .name("Red Wedding")
                .location("Westeros")
                .date("BC1000")
                .time("5:00 PM")
                .link("https://gameofthrones.fandom.com/wiki/Red_Wedding")
                .usersWhoUpvoted(List.of("Robb Stark", "Catelyn Stark"))
                .usersWhoDownvoted(List.of("Walder Frey"))
                .build();

        Event event2 = Event.builder().id("2")
                .name("Battle of the Bastards")
                .location("Winterfell")
                .date("AC300")
                .time("2:30 PM")
                .link("https://gameofthrones.fandom.com/wiki/Battle_of_the_Bastards")
                .usersWhoUpvoted(List.of("Jon Snow", "Sansa Stark"))
                .usersWhoDownvoted(List.of("Ramsay Bolton"))
                .build();

        eventRepository.save(event1);
        eventRepository.save(event2);

        // WHEN
        List<Event> expected = List.of(event1, event2);
        String expectedAsJson = objectMapper.writeValueAsString(expected);

        // THEN
        mockMvc.perform(get(BASE_URI))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedAsJson));
    }

    @Test
    @DirtiesContext
    void getEventById_whenEventExists_thenEventIsReturnedSuccessfully() throws Exception {
        // GIVEN
        Event existingEvent = Event.builder().id("1")
                .name("Red Wedding")
                .location("Westeros")
                .date("BC1000")
                .time("5:00 PM")
                .link("https://gameofthrones.fandom.com/wiki/Red_Wedding")
                .usersWhoUpvoted(List.of("Robb Stark", "Catelyn Stark"))
                .usersWhoDownvoted(List.of("Walder Frey"))
                .build();

        eventRepository.save(existingEvent);

        // WHEN
        mockMvc.perform(get(BASE_URI + "/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Red Wedding"))
                .andExpect(jsonPath("$.location").value("Westeros"))
                .andExpect(jsonPath("$.date").value("BC1000"))
                .andExpect(jsonPath("$.time").value("5:00 PM"))
                .andExpect(jsonPath("$.link").value("https://gameofthrones.fandom.com/wiki/Red_Wedding"))
                .andExpect(jsonPath("$.usersWhoUpvoted", contains("Robb Stark", "Catelyn Stark")))
                .andExpect(jsonPath("$.usersWhoDownvoted", contains("Walder Frey")));
    }


    @Test
    @DirtiesContext
    void updateEvent_whenEventExists_thenEventIsUpdatedSuccessfully() throws Exception {
        // GIVEN
        Event existingEvent = Event.builder().id("1")
                .name("Red Wedding")
                .location("Westeros")
                .date("BC1000")
                .time("5:00 PM")
                .link("https://gameofthrones.fandom.com/wiki/Red_Wedding")
                .usersWhoUpvoted(List.of("Robb Stark", "Catelyn Stark"))
                .usersWhoDownvoted(List.of("Walder Frey"))
                .build();
        eventRepository.save(existingEvent);

        EventDTO updatedEventDTO = EventDTO.builder()
                .name("Updated Red Wedding")
                .location("Updated Westeros")
                .date("Updated BC1000")
                .time("Updated 5:00 PM")
                .link("https://updated-link.com")
                .build();

        // WHEN
        mockMvc.perform(put(BASE_URI + "/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedEventDTO)))
                .andExpect(status().isOk());

        // THEN
        mockMvc.perform(get(BASE_URI + "/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Updated Red Wedding"))
                .andExpect(jsonPath("$.location").value("Updated Westeros"))
                .andExpect(jsonPath("$.date").value("Updated BC1000"))
                .andExpect(jsonPath("$.time").value("Updated 5:00 PM"))
                .andExpect(jsonPath("$.link").value("https://updated-link.com"))
                .andExpect(jsonPath("$.usersWhoUpvoted", contains("Robb Stark", "Catelyn Stark")))
                .andExpect(jsonPath("$.usersWhoDownvoted", contains("Walder Frey")));
    }

    @Test
    @DirtiesContext
    void deleteEvent_whenEventExists_thenEventIsDeletedSuccessfully() throws Exception {
        // GIVEN
        Event existingEvent = Event.builder()
                .id("1")
                .name("Red Wedding")
                .location("Westeros")
                .date("BC1000")
                .time("5:00 PM")
                .link("https://gameofthrones.fandom.com/wiki/Red_Wedding")
                .usersWhoUpvoted(List.of("Robb Stark", "Catelyn Stark"))
                .usersWhoDownvoted(List.of("Walder Frey"))
                .build();

        eventRepository.save(existingEvent);

        // WHEN / THEN
        mockMvc.perform(delete(BASE_URI + "/1"))
                .andExpect(status().isOk());

        mockMvc.perform(get(BASE_URI + "/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteEvent_whenEventDoesNotExist_thenNotFoundStatusReturned() throws Exception {
        // GIVEN
        String nonExistingEventId = "non-existing-id";

        // WHEN / THEN
        mockMvc.perform(delete(BASE_URI + "/" + nonExistingEventId))
                .andExpect(status().isNotFound());
    }

}