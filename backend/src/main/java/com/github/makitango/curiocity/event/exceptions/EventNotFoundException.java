package com.github.makitango.curiocity.event.exceptions;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException(String message) {
        super(message);
    }

    public EventNotFoundException() {
        super("Event not found");
    }
}
