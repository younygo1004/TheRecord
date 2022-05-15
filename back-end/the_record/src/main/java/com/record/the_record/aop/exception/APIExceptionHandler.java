package com.record.the_record.aop.exception;

import com.record.the_record.aop.exception.customexceptions.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class APIExceptionHandler {

    @ExceptionHandler(value = EmailExistException.class)
    public ResponseEntity<APIException> handlerEmailExistException(EmailExistException e) {
        return ResponseEntity.badRequest().body(new APIException(e));
    }

    @ExceptionHandler(value = EmailSendException.class)
    public ResponseEntity<APIException> handlerEmailSendException(EmailSendException e) {
        return ResponseEntity.badRequest().body(new APIException(e));
    }

    @ExceptionHandler(value = PasswordMismatchException.class)
    public ResponseEntity<APIException> handlerPasswordMismatchException(PasswordMismatchException e) {
        return ResponseEntity.badRequest().body(new APIException(e));
    }

    @ExceptionHandler(value = VerificationCodeMismatchException.class)
    public ResponseEntity<APIException> handlerVerificationCodeMismatchException(VerificationCodeMismatchException e) {
        return ResponseEntity.badRequest().body(new APIException(e));
    }

    @ExceptionHandler(value = VerificationCodeNotExistException.class)
    public ResponseEntity<APIException> handlerVerificationCodeNotExistException(VerificationCodeNotExistException e) {
        return ResponseEntity.badRequest().body(new APIException(e));
    }

    @ExceptionHandler(value = NoUserException.class)
    public ResponseEntity<APIException> handlerNoUserException(NoUserException e) {
        return ResponseEntity.badRequest().body(new APIException(e));
    }

    @ExceptionHandler(value = TitleValidateException.class)
    public ResponseEntity<APIException> handlerTitleValidateException(TitleValidateException e) {
        return ResponseEntity.badRequest().body(new APIException(e));
    }

    @ExceptionHandler(value = NoFileException.class)
    public ResponseEntity<APIException> handlerNoFileException(NoFileException e) {
        return ResponseEntity.badRequest().body(new APIException(e));
    }

}
