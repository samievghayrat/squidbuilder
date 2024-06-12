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

import com.boyz.squidbuilder.entity.Activity;
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
        
        List<String> users = new ArrayList<>();
        User user = userService.getByUsername(username).orElseThrow(() -> new RuntimeException("No user with that username"));
        users.add(user.getUsername());
        List<String> rooms = user.getRooms();
        if(rooms == null){
            rooms = new ArrayList<>();
        }
        roomRepository.save(room);
        rooms.add(room.getId().toHexString());
        user.setRooms(rooms);
        room.setMembers(users);
        userRepository.save(user);
        roomRepository.save(room);
        return true;
    }

    public boolean joinRoom(ObjectId id, String username){
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("no room with that id"));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("no user with that username"));
        List<String> users = room.getMembers();
        if(!users.contains(user.getUsername())){
            users.add(user.getUsername());
            room.setMembers(users);
            roomRepository.save(room);
        }
        return true;
    }

    public String addActivity(ObjectId id, Activity activity){
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("no room with that id"));
        List<Activity> activities = room.getActivities();
        if(activities == null){
            activities = new ArrayList<>();
        }
        activities.add(activity);
        room.setActivities(activities);
        roomRepository.save(room);
        return "Successfully added";
    }

    public String addResponsibility(ObjectId id, int key, Activity activity) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("no room wiht that id"));
        List<Activity> activities = room.getActivities();
        activities.set(key, activity);
        room.setActivities(activities);
        roomRepository.save(room);
        return "Changed Successfully";
    }
}
