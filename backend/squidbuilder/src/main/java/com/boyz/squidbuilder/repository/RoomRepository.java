package com.boyz.squidbuilder.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.boyz.squidbuilder.entity.Room;

@Repository
public interface RoomRepository extends MongoRepository<Room, ObjectId>{

}
