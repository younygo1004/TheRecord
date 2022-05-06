package com.record.the_record.user.service;

import com.record.the_record.entity.User;
import com.record.the_record.entity.enums.UserRole;
import com.record.the_record.security.JwtTokenProvider;
import com.record.the_record.user.dto.UserDto;
import com.record.the_record.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public String login(UserDto userDto) {
        Optional<User> user = userRepository.findByUserId(userDto.getUserId());
        if (user.isPresent()) {
            if (!passwordEncoder.matches(userDto.getPassword(), user.get().getPassword())) {
                return "nouser";
            }
            String accessToken = jwtTokenProvider.createAccessToken(user.get().getUserId(), user.get().getUserRole().name());
            String refreshToken = jwtTokenProvider.createAccessToken(user.get().getUserId(), user.get().getUserRole().name());

            return accessToken;
        } else
            return "fail";
    }

    @Override
    public User addUser(UserDto userDto) {
        return userRepository.save(User.builder()
                .userId(userDto.getUserId())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .name(userDto.getName())
                .email(userDto.getEmail())
                .userRole(UserRole.valueOf("ROLE_USER")).build());
    }
}
