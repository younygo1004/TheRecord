package com.record.the_record.user.controller;

import com.record.the_record.user.dto.CertificateDto;
import com.record.the_record.user.dto.SearchUserDto;
import com.record.the_record.user.dto.UserDetailDto;
import com.record.the_record.user.dto.UserDto;
import com.record.the_record.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
        userService.addUser(userDto);
        return ResponseEntity.ok().body("success");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginTest(@RequestBody UserDto userDto) {
        return ResponseEntity.ok().body(userService.login(userDto));
    }

    @GetMapping("/id-check/{user-id}")
    public ResponseEntity<Boolean> idCheck(@PathVariable("user-id") String userId) {
        return ResponseEntity.ok().body(userService.checkIdDuplicate(userId));
    }

    @PutMapping("/introduction")
    public ResponseEntity<String> introductionAdd(@RequestBody UserDto userDto) {
        userService.modifyIntroduction(userDto.getIntroduce());
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/{user-pk}/info")
    public ResponseEntity<UserDetailDto> userInfoDetail(@PathVariable("user-pk") Long userPk) {
        return ResponseEntity.ok().body(userService.findUserInfo(userPk));
    }

    @GetMapping("/neighbor")
    public ResponseEntity<List<SearchUserDto>> neighborList() {
        return ResponseEntity.ok().body(userService.findNeighborList());
    }

    @PostMapping("/neighbor")
    public ResponseEntity<String> neighborAdd(@RequestBody UserDto userDto) {
        userService.addNeighbor(userDto.getUserPk());
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<SearchUserDto>> userSearch(@PathVariable("name") String name) {
        return ResponseEntity.ok().body(userService.searchUser(name));
    }

    @PostMapping("/email/number")
    public ResponseEntity<String> verificationCodeSend(){
        try {
            userService.sendVerificationCode();
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("이미 인증번호를 전송했습니다.");
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body("fail");
        }
        return ResponseEntity.ok().body("success");
    }

    @PostMapping("/email-check")
    public ResponseEntity<String> verificationCodeCheck(@RequestBody CertificateDto certificateDto) {

        try {
            userService.checkVerificationCode(certificateDto.getCertificateNum());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("fail");
        }

        return ResponseEntity.ok().body("success");
    }

}
