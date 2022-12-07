package com.ptithcm.bakeryshopapi.payload.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.ptithcm.bakeryshopapi.entity.Comment;
import com.ptithcm.bakeryshopapi.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    @JsonIgnoreProperties(value = {"productId"})
    private Comment comment;
    @JsonIncludeProperties(value = {"fullName"})
    private User user;
}
