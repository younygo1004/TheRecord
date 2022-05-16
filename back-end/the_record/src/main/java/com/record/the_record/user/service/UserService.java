package com.record.the_record.user.service;

import com.record.the_record.entity.User;
import com.record.the_record.user.dto.CertificateDto;
import com.record.the_record.user.dto.SearchUserDto;
import com.record.the_record.user.dto.UserDetailDto;
import com.record.the_record.user.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    // 로그인
    String login(UserDto userDto);
    // 회원가입
    void addUser(UserDto userDto);
    // 현재 유저 PK
    Long currentUser();
    // 아이디 중복 확인
    boolean checkIdDuplicate(String userId);
    // 자기소개 수정
    void modifyIntroduction(String introduce);
    // 프로필 사진 변경
    void modifyProfile(MultipartFile multipartFile) throws Exception;
    // 회원 정보 조회
    UserDetailDto findUserInfo(Long userPk);
    // 일촌 목록 조회
    List<SearchUserDto> findNeighborList();
    // 일촌 맺기
    void addNeighbor(Long userPk);
    // 유저 검색
    List<SearchUserDto> searchUser(String name);
    void sendVerificationCode(String email);
    void checkVerificationCode(CertificateDto certificateDto);
    void reissuePassword(CertificateDto certificateDto);
    String getRandomString();
}
