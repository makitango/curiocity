package com.github.makitango.curiocity.event;

import lombok.Builder;

import java.util.List;

@Builder
public record DTOEvent(String name,
                       String location,
                       int time,
                       String link,
                       String description,
                       List<String> photos,
                       List<String> usersWhoUpvoted,
                       List<String> usersWhoDownvoted) {
}
