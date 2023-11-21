package com.github.makitango.curiocity.event;

import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Builder
@Document(collection = "events")
public record Event(
        String id,
        String name,
        String location,
        int time,
        String link,
        String description,
        List<String> photos,
        List<String> usersWhoUpvoted,
        List<String> usersWhoDownvoted
) {
}
