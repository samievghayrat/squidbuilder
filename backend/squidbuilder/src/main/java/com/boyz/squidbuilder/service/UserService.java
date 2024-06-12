package com.boyz.squidbuilder.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boyz.squidbuilder.entity.User;
import com.boyz.squidbuilder.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user){
        return userRepository.save(user);
    }
    
    public boolean isValidUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getPassword().equals(password);
        }
        return false;
    }

    public boolean isUserExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public Optional<User> getByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public List<String> getRooms(String username){
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("No user with that username"));
        return user.getRooms();
    }
}
