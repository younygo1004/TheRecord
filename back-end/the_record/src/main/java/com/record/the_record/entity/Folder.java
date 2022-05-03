package com.record.the_record.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Folder {
    @Id
    @GeneratedValue
    private Long id;

    @JoinColumn(name = "user_pk")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String name;
}
