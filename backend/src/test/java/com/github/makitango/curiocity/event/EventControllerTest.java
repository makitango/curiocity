package com.github.makitango.curiocity.event;

import org.junit.jupiter.api.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.springframework.http.MediaType;

@SpringBootTest
@AutoConfigureMockMvc
class EventControllerTest {

    private final static String BASE_URI = "/api/events";
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

// EventControllerTest.java

    @Test
    @DirtiesContext
    void getAllEvents_whenEventsExist_thenListOfEventsIsReturnedSuccessfully() throws Exception {
        // GIVEN
        Event event1 = Event.builder().id("1")
                .name("Red Wedding")
                .location("Westeros")
                .date("BC1000")
                .time("5:00 PM")
                .link("https://example.com/redwedding")
                .usersWhoUpvoted(List.of("Robb Stark", "Catelyn Stark"))
                .usersWhoDownvoted(List.of("Walder Frey"))
                .build();

        Event event2 = Event.builder().id("2")
                .name("Battle of the Bastards")
                .location("Winterfell")
                .date("AC300")
                .time("2:30 PM")
                .link("https://example.com/battleofthebastards")
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
    void addEvent_whenEventIsValid_thenEventIsAddedSuccessfully() throws Exception {
        // GIVEN
        EventDTO newEventDTO = EventDTO.builder()
                .name("Battle of Blackwater")
                .location("King's Landing")
                .date("AC299")
                .time("8:00 PM")
                .link("https://example.com/battleofblackwater")
                .usersWhoUpvoted(List.of("Tyrion Lannister", "Davos Seaworth"))
                .usersWhoDownvoted(List.of("Stannis Baratheon"))
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
        assertEquals("King's Landing", addedEvent.location());
        assertEquals("Battle of Blackwater", addedEvent.name());
        assertEquals("AC299", addedEvent.date());
        assertEquals("8:00 PM", addedEvent.time());
        assertEquals("https://example.com/battleofblackwater", addedEvent.link());
        assertEquals(List.of("Tyrion Lannister", "Davos Seaworth"), addedEvent.usersWhoUpvoted());
        assertEquals(List.of("Stannis Baratheon"), addedEvent.usersWhoDownvoted());
    }
}