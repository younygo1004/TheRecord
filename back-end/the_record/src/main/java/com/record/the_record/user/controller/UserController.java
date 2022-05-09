package com.record.the_record.user.controller;

import com.record.the_record.user.dto.UserDetailDto;
import com.record.the_record.user.dto.UserDto;
import com.record.the_record.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/id-check/{user_id}")
    public ResponseEntity<Boolean> idCheck(@PathVariable("user_id") String userId) {
        return ResponseEntity.ok().body(userService.checkIdDuplicate(userId));
    }

    @PutMapping("/introduction")
    public ResponseEntity<String> introductionAdd(@RequestBody UserDto userDto) {
        userService.modifyIntroduction(userDto.getIntroduce());
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/{user_pk}/info")
    public ResponseEntity<UserDetailDto> userInfoDetail(@PathVariable Long userPk) {
        return ResponseEntity.ok().body(userService.findUserInfo(userPk));
    }
}
