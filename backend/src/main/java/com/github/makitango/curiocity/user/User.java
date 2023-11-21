package com.github.makitango.curiocity.user;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public record User(
        String id,
        String name,
        String[] postsUpvoted,
        String[] postsDownvoted,
        String[] posts,
        String location
) {
}
