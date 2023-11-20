package com.github.makitango.curiocity.user;

public record User(
        String id,
        String name,
        String[] postsUpvoted,
        String[] postsDownvoted,
        String[] posts,
        String location
) {
}
