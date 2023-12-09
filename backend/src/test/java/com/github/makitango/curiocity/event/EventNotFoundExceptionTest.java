package com.github.makitango.curiocity.event;

import com.github.makitango.curiocity.event.exceptions.EventNotFoundException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class EventNotFoundExceptionTest {

    @Test
    void testParameterizedConstructor() {
        // GIVEN
        String customMessage = "Custom error message";

        // WHEN
        EventNotFoundException exception = new EventNotFoundException(customMessage);

        // THEN
        assertEquals(customMessage, exception.getMessage());
    }

    @Test
    void testDefaultConstructor() {
        // WHEN
        EventNotFoundException exception = new EventNotFoundException();

        // THEN
        assertEquals("Event not found" , exception.getMessage());
    }
}