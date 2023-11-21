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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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
    void retrievingAllMoviesWhenMoviesExist_ReturnList() throws Exception {
        Event event1 = Event.builder()
                .id("1")
                .name("Sample Event 1")
                .location("City Center")
                .time(1637550000)
                .link("http://example.com/event1")
                .description("This is a sample event description for Event 1.")
                .photos(List.of("http://example.com/photo1_1.jpg", "http://example.com/photo1_2.jpg"))
                .usersWhoUpvoted(List.of("user1", "user2", "user3"))
                .usersWhoDownvoted(List.of("user4"))
                .build();
        Event event2 = Event.builder()
                .id("2")
                .name("Sample Event 2")
                .location("Park Plaza")
                .time(1637650000)
                .link("http://example.com/event2")
                .description("This is a sample event description for Event 2.")
                .photos(List.of("http://example.com/photo2_1.jpg", "http://example.com/photo2_2.jpg"))
                .usersWhoUpvoted(List.of("user1", "user3", "user5"))
                .usersWhoDownvoted(List.of("user2"))
                .build();
        List<Event> expected = List.of(event1, event2);

        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(event1)))
                .andExpect(status().isOk());

        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(event2)))
                .andExpect(status().isOk());

        MvcResult result = mockMvc.perform(get(BASE_URI))
                .andExpect(status().isOk())
                .andReturn();

        String actual = result.getResponse().getContentAsString();
        assertEquals(objectMapper.writeValueAsString(expected), actual);
    }
}