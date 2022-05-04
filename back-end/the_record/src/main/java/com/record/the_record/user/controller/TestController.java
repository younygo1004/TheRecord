package com.record.the_record.user.controller;

import com.record.the_record.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class TestController {

    @PostMapping("/login")
    public ResponseEntity<String> loginTest(@RequestBody User user) {
        return ResponseEntity.ok().body("성태 바보");
    }

}
