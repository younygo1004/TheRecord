package com.record.the_record.user.service;

import com.record.the_record.email.EmailService;
import com.record.the_record.entity.*;
import com.record.the_record.entity.enums.UserRole;
import com.record.the_record.folder.repository.FolderRepository;
import com.record.the_record.security.JwtTokenProvider;
import com.record.the_record.user.dto.SearchUserDto;
import com.record.the_record.user.dto.UserDetailDto;
import com.record.the_record.user.dto.UserDto;
import com.record.the_record.user.repository.NeighborRepository;
import com.record.the_record.user.repository.UserRepository;
import com.record.the_record.user.repository.UserVerificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final NeighborRepository neighborRepository;
    private final FolderRepository folderRepository;
    private final UserVerificationRepository userverificationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    private final EmailService emailService;

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
    @Transactional
    public Long currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return user.getPk();
    }

    @Override
    @Transactional
    public User addUser(UserDto userDto) {
        User user = User.builder()
                .userId(userDto.getUserId())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .name(userDto.getName())
                .email(userDto.getEmail())
                .userRole(UserRole.valueOf("ROLE_USER")).build();

        folderRepository.save(Folder.builder()
                .user(user)
                .name("기본 폴더").build());
        return userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean checkIdDuplicate(String userId) {
        return userRepository.existsByUserId(userId);
    }

    @Override
    @Transactional
    public void modifyIntroduction(String introduce) {
        User user = userRepository.findByPk(currentUser());
        user.updateIntroduce(introduce);
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetailDto findUserInfo(Long userPk) {
        User user = userRepository.findByPk(userPk);
        User currentUser = userRepository.findByPk(currentUser());
        List<Neighbor> neighborList = neighborRepository.findAllByNeighborId_FollowingId(currentUser);
        HashSet<User> followings = new HashSet<>();
        neighborList.forEach(s -> followings.add(s.getNeighborId().getFollowerId()));
        return UserDetailDto.builder()
                .userPk(user.getPk())
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .introduce(user.getIntroduce())
                .profile(user.getProfile())
                .neighbor(followings.contains(user)).build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<SearchUserDto> findNeighborList() {
        List<Neighbor> neighborList = neighborRepository.findAllByNeighborId_FollowingId(userRepository.findByPk(currentUser()));
        List<SearchUserDto> searchUserDtoList = new ArrayList<>();
        neighborList.forEach(v -> searchUserDtoList.add(SearchUserDto.builder()
                .userPk(v.getNeighborId().getFollowerId().getPk())
                .userId(v.getNeighborId().getFollowerId().getUserId())
                .name(v.getNeighborId().getFollowerId().getName())
                .build()));
        return searchUserDtoList;
    }

    @Override
    @Transactional
    public void addNeighbor(Long userPk) {
        neighborRepository.save(Neighbor.builder()
                .neighborId(NeighborId.builder()
                        .followingId(userRepository.findByPk(currentUser()))
                        .followerId(userRepository.findByPk(userPk)).build()).build());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SearchUserDto> searchUser(String name) {
        List<User> userList = userRepository.findByNameContainsOrderByName(name);
        List<SearchUserDto> dtoList = new ArrayList<>();
        userList.forEach(v -> dtoList.add(SearchUserDto.builder()
                .userPk(v.getPk())
                .userId(v.getUserId())
                .name(v.getName()).build()));
        return dtoList;
    }

    @Override
    @Transactional
    public void sendVerificationCode() throws Exception {

        User user = userRepository.findByPk(currentUser());

        String verificationCode = Integer.toString((int)(Math.random() * 100000000));
        String userEmail = user.getEmail();

        emailService.sendEmail(userEmail, verificationCode);

        userverificationRepository.save(UserVerification.builder()
                .user(user)
                .verificationCode(passwordEncoder.encode(verificationCode))
                .build());

    }
}
