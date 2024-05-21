package com.boyz.squidbuilder.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.boyz.squidbuilder.entity.Room;
import com.boyz.squidbuilder.entity.User;
import com.boyz.squidbuilder.repository.RoomRepository;
import com.boyz.squidbuilder.repository.UserRepository;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public Optional<Room> getRoom(ObjectId id){
        return roomRepository.findById(id);
    }

    public boolean isValidRoom(ObjectId id){
        return roomRepository.findById(id).isPresent();
    }

    public boolean createRoom(Room room, String username){
        List<User> users = new ArrayList<>();
        User user = userService.getByUsername(username).orElseThrow(() -> new RuntimeException("No user with that username"));
        users.add(user);
        List<ObjectId> rooms = user.getRooms();
        if(rooms == null){
            rooms = new ArrayList<>();
        }
        rooms.add(room.getId());
        user.setRooms(rooms);
        room.setUsers(users);
        userRepository.save(user);
        roomRepository.save(room);
        return true;
    }

    public boolean joinRoom(ObjectId id, String username){
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("no room with that id"));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("no user with that username"));
        List<User> users = room.getUsers();
        users.add(user);
        room.setUsers(users);
        roomRepository.save(room);
        return true;
    }
}
