package com.record.the_record.entity;

import com.record.the_record.entity.enums.TrueAndFalse;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue
    private Long pk;

    @NotBlank
    private String userId;

    @NotBlank
    private String name;

    @NotNull
    @Email
    private String email;

    @NotBlank
    @Size(min = 8)
    private String password;

    @Column(length = 2000)
    private String introduce;

    @Nullable
    private String profile;

    @Enumerated(EnumType.STRING)
    private TrueAndFalse roomIsOpen;

}
