package com.github.makitango.curiocity.event;

import lombok.Builder;

import java.util.List;

@Builder
public record EventDTO(String name,
                       String location,
                       String date,
                       String time,
                       String link,
                       List<String> usersWhoUpvoted,
                       List<String> usersWhoDownvoted) {
}
