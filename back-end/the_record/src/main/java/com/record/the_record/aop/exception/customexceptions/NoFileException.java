package com.record.the_record.aop.exception.customexceptions;

public class NoFileException extends RuntimeException{

    public NoFileException() {
        super("업로드할 파일이 존재하지 않습니다.");
    }

    public NoFileException(String message) {
        super(message);
    }

}
