package com.github.makitango.curiocity.event;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public record Event(
        String id,
        String name,
        String location,
        int time,
        String link,
        String description,
        String[] photos,
        String[] usersWhoUpvoted,
        String[] usersWhoDownvoted
) {
}
