package com.github.makitango.curiocity.event.models;

import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@Document(collection = "events")
public record Event(
        String id,
        String name,
        String location,
        String date,
        String time,
        String link,
        List<String> usersWhoUpvoted,
        List<String> usersWhoDownvoted
) {
}
