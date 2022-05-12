package com.record.the_record.aop.exception;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
public class APIException {
    private final String message;
    private final LocalDateTime errorOccurrenceTime;

    public APIException(RuntimeException e) {
        this.message = e.getMessage();
        this.errorOccurrenceTime = LocalDateTime.now();
    }

}
