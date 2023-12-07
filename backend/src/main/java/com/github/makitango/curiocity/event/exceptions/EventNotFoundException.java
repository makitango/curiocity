package com.github.makitango.curiocity.event.exceptions;

public class EventNotFoundException extends RuntimeException {

    public static final String DEFAULT_MESSAGE = "Event not found";

    public EventNotFoundException(String message) {
        super(message);
    }

    public EventNotFoundException() {
        super(DEFAULT_MESSAGE);
    }
}
