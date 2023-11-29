package com.github.makitango.curiocity.event;

import org.junit.jupiter.api.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class EventControllerTest {

    private final static String BASE_URI = "/api/events";

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void getAllEvents_whenEventsExist_thenListOfEventsIsReturnedSuccessfully() throws Exception {
        EventDTO event1 = EventDTO.builder()
                .name("Sample Event 1")
                .location("City Center")
                .date("1637550000")
                .time("1637550000")
                .link("https://example.com/event1")
                .usersWhoUpvoted(List.of("user1", "user2", "user3"))
                .usersWhoDownvoted(List.of("user4"))
                .build();
        EventDTO event2 = EventDTO.builder()
                .name("Sample Event 2")
                .location("Park Plaza")
                .date("1637650000")
                .time("1637650000")
                .link("https://example.com/event2")
                .usersWhoUpvoted(List.of("user1", "user3", "user5"))
                .usersWhoDownvoted(List.of("user2"))
                .build();

        MvcResult resultEvent1 = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(event1)))
                .andExpect(status().isOk())
                .andReturn();
        Event expectedEvent1 = objectMapper.readValue(resultEvent1.getResponse().getContentAsString(), Event.class);

        MvcResult resultEvent2 = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(event2)))
                .andExpect(status().isOk())
                .andReturn();
        Event expectedEvent2 = objectMapper.readValue(resultEvent2.getResponse().getContentAsString(), Event.class);

        List<Event> expected = List.of(event1, event2);
        String expectedAsJson = objectMapper.writeValueAsString(expected)

        mockMvc.perform(get(BASE_URI))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedAsJson));

 
    }
}