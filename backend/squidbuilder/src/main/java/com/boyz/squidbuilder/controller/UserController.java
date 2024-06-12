package com.boyz.squidbuilder.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boyz.squidbuilder.entity.LoginRequest;
import com.boyz.squidbuilder.entity.User;
import com.boyz.squidbuilder.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> addUser(@RequestBody User user){
        String username = user.getUsername();

        if (userService.isUserExists(username)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        userService.register(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        if (userService.isValidUser(username, password)) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    // To get A user For Testing purpose
    // @GetMapping("/{username}")
    // public ResponseEntity<Optional<User>> getUser(@PathVariable String username){
    //     return new ResponseEntity<Optional<User>>(userService.getByUsername(username), HttpStatus.OK);
    // }

    @GetMapping("/{username}/rooms")
    public ResponseEntity<?> roomsOfUser(@RequestParam String username){
        return ResponseEntity.ok(userService.getRooms(username));
    }
}
