package com.record.the_record.aop.exception.customexceptions;

public class EmailExistException extends RuntimeException {

    public EmailExistException() {
        super("이미 인증번호를 전송했습니다. 메일을 확인해주세요.");
    }

    public EmailExistException(String message) {
        super(message);
    }
}
