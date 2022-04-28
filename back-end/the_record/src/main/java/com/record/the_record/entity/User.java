package com.record.the_record.entity;

import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Setter
public class User {

    @Id @GeneratedValue
    private Long pk;

    @NotBlank
    private String userId;

    @NotBlank
    private String name;

    @NotNull
    @Email
    private String email;

    @NotBlank
    private String password;

    @Column(length = 2000)
    private String introduce;

    @Nullable
    private String profile;

}
