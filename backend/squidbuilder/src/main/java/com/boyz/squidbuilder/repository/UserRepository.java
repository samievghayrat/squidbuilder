package com.boyz.squidbuilder.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.boyz.squidbuilder.entity.User;

import java.util.List;
import java.util.Optional;



@Repository
public interface UserRepository extends MongoRepository<User, ObjectId>{
    Optional<User> findByUsername(String username);
}
