package com.github.makitango.curiocity.event;

import lombok.Builder;


@Builder
public record EventDTO(String name,
                       String location,
                       String date,
                       String time,
                       String link) {
}