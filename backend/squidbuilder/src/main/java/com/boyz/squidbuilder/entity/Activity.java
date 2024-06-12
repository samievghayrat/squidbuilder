package com.boyz.squidbuilder.entity;

import java.time.LocalTime;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {
    @Id
    private ObjectId id;
    private LocalTime startDate;
    private LocalTime endDate;
    private List<Responsibility> responsibilities;
}
