package com.record.the_record.email;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailService {

    void sendEmail(String userEmail, String msg) throws MessagingException, UnsupportedEncodingException;

}
