package com.record.the_record.user.service;

import com.record.the_record.entity.User;
import com.record.the_record.user.dto.SearchUserDto;
import com.record.the_record.user.dto.UserDetailDto;
import com.record.the_record.user.dto.UserDto;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;

public interface UserService {
    String login(UserDto userDto);
    User addUser(UserDto userDto);
    Long currentUser();
    boolean checkIdDuplicate(String userId);
    void modifyIntroduction(String introduce);
    UserDetailDto findUserInfo(Long userPk);
    List<SearchUserDto> findNeighborList();
    void addNeighbor(Long userPk);
    List<SearchUserDto> searchUser(String name);
    void sendVerificationCode();
    void checkVerificationCode(String certificateNum);
}
