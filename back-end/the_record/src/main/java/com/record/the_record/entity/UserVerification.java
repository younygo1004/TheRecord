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
public class UserVerification {

    @Id
    @Column(name = "user_pk", nullable = false)
    private Long pk;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_pk")
    private User user;

    private String verificationCode;

}
