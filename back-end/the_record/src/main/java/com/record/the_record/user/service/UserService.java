package com.record.the_record.user.service;

import com.record.the_record.entity.User;
import com.record.the_record.user.dto.UserDto;

public interface UserService {
    String login(UserDto userDto);
    User addUser(UserDto userDto);
}
