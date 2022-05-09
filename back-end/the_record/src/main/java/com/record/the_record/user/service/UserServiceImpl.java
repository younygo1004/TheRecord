package com.record.the_record.user.service;

import com.record.the_record.entity.Folder;
import com.record.the_record.entity.Neighbor;
import com.record.the_record.entity.User;
import com.record.the_record.entity.enums.UserRole;
import com.record.the_record.folder.repository.FolderRepository;
import com.record.the_record.security.JwtTokenProvider;
import com.record.the_record.user.dto.UserDetailDto;
import com.record.the_record.user.dto.UserDto;
import com.record.the_record.user.repository.NeighborRepository;
import com.record.the_record.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final NeighborRepository neighborRepository;
    private final FolderRepository folderRepository;
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
    @Transactional
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
    @Transactional
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
}
