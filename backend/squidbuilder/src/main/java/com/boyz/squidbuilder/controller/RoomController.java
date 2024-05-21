package com.boyz.squidbuilder.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.bson.types.ObjectId;
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

import com.boyz.squidbuilder.entity.Room;
import com.boyz.squidbuilder.service.RoomService;


@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;


    @GetMapping("/get/{id}")
    public ResponseEntity<?> getRoom(@PathVariable ObjectId id){
        Room room = roomService.getRoom(id).orElse(null);
        if(room != null){
            return ResponseEntity.ok(room);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No room");
        }
    }

    @PostMapping("/create/{username}")
    public ResponseEntity<?> createRoom(@RequestBody Room room, @PathVariable String username){
        if(roomService.createRoom(room, username)){
            return ResponseEntity.status(HttpStatus.CREATED).body("Successfuly created");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something is wrong");
        }
    }

    @PostMapping("/join/{id}")
    public ResponseEntity<?> joinRoom(@PathVariable ObjectId id, @RequestParam String username){
        if(roomService.joinRoom(id, username)){
            return ResponseEntity.ok("Successfuly added");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something is wrong");
        }
    }
}
