package com.record.the_record.user.service;

import com.record.the_record.entity.User;
import com.record.the_record.user.dto.UserDetailDto;
import com.record.the_record.user.dto.UserDto;

public interface UserService {
    String login(UserDto userDto);
    User addUser(UserDto userDto);
    Long currentUser();
    boolean checkIdDuplicate(String userId);
    void modifyIntroduction(String introduce);
    UserDetailDto findUserInfo(Long userPk);
}
