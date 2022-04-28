package com.record.the_record.controller;

import com.record.the_record.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class TestController {

    @PostMapping("/login")
    public ResponseEntity<User> loginTest(@RequestBody User user) {

        user.setUserId("성태 바보");
        return ResponseEntity.ok().body(user);
    }

}
