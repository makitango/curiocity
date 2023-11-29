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

    @Test
    @DirtiesContext
    void getAllEvents_whenEventsExist_thenListOfEventsIsReturnedSuccessfully() throws Exception {
        Event event1 = Event.builder().id("1")
                .name("Sample Event 1")
                .location("City Center")
                .date("1637550000")
                .time("1637550000")
                .link("https://example.com/event1")
                .usersWhoUpvoted(List.of("user1", "user2", "user3"))
                .usersWhoDownvoted(List.of("user4"))
                .build();
        Event event2 = Event.builder().id("2")
                .name("Sample Event 2")
                .location("Park Plaza")
                .date("1637650000")
                .time("1637650000")
                .link("https://example.com/event2")
                .usersWhoUpvoted(List.of("user1", "user3", "user5"))
                .usersWhoDownvoted(List.of("user2"))
                .build();
        eventRepository.save(event1);
        eventRepository.save(event2);

        List<Event> expected = List.of(event1, event2);
        String expectedAsJson = objectMapper.writeValueAsString(expected);

        mockMvc.perform(get(BASE_URI))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedAsJson));
    }
}